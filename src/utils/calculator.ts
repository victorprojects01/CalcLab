import { AccessoryItem, CalculationResult, PrinterConfig, PrintConfig, PricingConfig } from '../types';

/**
 * Converte string para número suportando separador decimal por vírgula (pt-BR) ou ponto.
 * Retorna null se vazio ou inválido, e rejeita números negativos.
 */
export function parseLocalNumber(value: string | number | undefined | null): number | null {
  if (value === undefined || value === null) return null;
  if (typeof value === 'number') {
    return isNaN(value) || value < 0 ? null : value;
  }
  const clean = value.trim();
  if (clean === '') return null;

  // Substitui vírgula decimal por ponto, removendo pontos de milhar se houver (ex: 1.000,50 -> 1000.50)
  let normalized = clean;
  if (clean.includes(',') && clean.includes('.')) {
    // Se ambos existem, assume que o ponto é milhar e a vírgula é decimal (padrão pt-BR)
    normalized = clean.replace(/\./g, '').replace(',', '.');
  } else if (clean.includes(',')) {
    normalized = clean.replace(',', '.');
  }

  const parsed = Number(normalized);
  if (isNaN(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
}

/**
 * Formata valor monetário no padrão Real Brasileiro (R$ 0,00)
 */
export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return 'R$ --,--';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formata números com precisão definida
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Motor de cálculo das etapas 1 a 4.
 * Valida se todos os dados obrigatórios foram fornecidos e calcula custos, frete, lucro e preço de venda final.
 */
export function calculatePrintCost(
  printer: PrinterConfig,
  print: PrintConfig,
  accessories: AccessoryItem[],
  pricing?: PricingConfig
): CalculationResult {
  const missingFields: string[] = [];

  // 1. Minha Impressora
  const powerW = parseLocalNumber(printer.averagePowerWatts);
  if (powerW === null) {
    missingFields.push('Potência média da impressora (W)');
  }

  const printerPrice = parseLocalNumber(printer.printerPurchasePrice);
  if (printerPrice === null) {
    missingFields.push('Preço de compra da impressora (R$)');
  }

  const lifespanH = parseLocalNumber(printer.lifespanHours);
  if (lifespanH === null || lifespanH <= 0) {
    missingFields.push('Vida útil estimada (deve ser maior que zero)');
  }

  const energyTariff = parseLocalNumber(printer.energyTariffPerKwh);
  if (energyTariff === null) {
    missingFields.push('Tarifa de energia (R$/kWh)');
  }

  // 2. Filamento e Impressão
  const spoolPrice = parseLocalNumber(print.spoolPrice);
  if (spoolPrice === null) {
    missingFields.push('Preço do rolo de filamento (R$)');
  }

  const spoolWeightGrams = parseLocalNumber(print.spoolNetWeightGrams);
  if (spoolWeightGrams === null || spoolWeightGrams <= 0) {
    missingFields.push('Peso líquido do rolo (deve ser maior que zero)');
  }

  const usedGrams = parseLocalNumber(print.usedFilamentGrams);
  if (usedGrams === null) {
    missingFields.push('Gramas totais utilizadas na impressão');
  }

  const rawHours = parseLocalNumber(print.durationHours);
  const rawMins = parseLocalNumber(print.durationMinutes);
  
  if (rawHours === null && rawMins === null) {
    missingFields.push('Tempo de impressão (horas e minutos)');
  }

  const hours = rawHours !== null ? rawHours : 0;
  const mins = rawMins !== null ? rawMins : 0;
  const totalHours = hours + (mins / 60);

  if (totalHours <= 0) {
    missingFields.push('O tempo total de impressão deve ser maior que 0');
  }

  const rawPieces = parseLocalNumber(print.pieceCount);
  const pieceCount = rawPieces !== null ? Math.floor(rawPieces) : 0;

  if (pieceCount < 1) {
    missingFields.push('Quantidade de peças (deve ser no mínimo 1)');
  }

  // 3. Acessórios
  const calculatedAccessories = [];
  let totalAccessoriesCostPerPiece = 0;

  for (let i = 0; i < accessories.length; i++) {
    const acc = accessories[i];
    const itemLabel = acc.name.trim() || `Acessório ${i + 1}`;

    if (acc.mode === 'direct') {
      const directCost = parseLocalNumber(acc.directCostPerPiece);
      if (directCost === null) {
        missingFields.push(`Custo direto por peça de "${itemLabel}"`);
      } else {
        const pieceTotal = directCost;
        totalAccessoriesCostPerPiece += pieceTotal;
        calculatedAccessories.push({
          id: acc.id,
          name: itemLabel,
          costPerPiece: pieceTotal,
          totalCost: pieceTotal * (pieceCount >= 1 ? pieceCount : 1),
          description: `Custo direto de ${formatCurrency(pieceTotal)} / peça`,
        });
      }
    } else {
      // modo embalagem: preco / quant_embalagem * quant_por_peca
      const pkgPrice = parseLocalNumber(acc.packagePrice);
      const pkgQty = parseLocalNumber(acc.packageQuantity);
      const qtyPerPiece = parseLocalNumber(acc.quantityPerPiece);

      if (pkgPrice === null || pkgQty === null || qtyPerPiece === null) {
        missingFields.push(`Dados completos da embalagem/consumo de "${itemLabel}"`);
      } else if (pkgQty <= 0) {
        missingFields.push(`Quantidade na embalagem de "${itemLabel}" deve ser maior que 0`);
      } else {
        const costPerPiece = (pkgPrice / pkgQty) * qtyPerPiece;
        totalAccessoriesCostPerPiece += costPerPiece;
        calculatedAccessories.push({
          id: acc.id,
          name: itemLabel,
          costPerPiece: costPerPiece,
          totalCost: costPerPiece * (pieceCount >= 1 ? pieceCount : 1),
          description: `${qtyPerPiece} ${acc.unit} de embalagem (${pkgQty} ${acc.unit} por ${formatCurrency(pkgPrice)})`,
        });
      }
    }
  }

  // Processa dados de precificação (frete e margem)
  const rawMargin = parseLocalNumber(pricing?.profitMarginPercent);
  const profitMarginPercent = rawMargin !== null ? rawMargin : 0;
  const rawShipping = parseLocalNumber(pricing?.shippingCost);
  const shippingVal = rawShipping !== null ? rawShipping : 0;
  const shippingMode = pricing?.shippingMode || 'total';

  const isComplete = missingFields.length === 0;

  if (!isComplete) {
    return {
      isComplete: false,
      missingFields,
      totalHours: totalHours > 0 ? totalHours : 0,
      pieceCount: pieceCount >= 1 ? pieceCount : 1,
      energyCostTotal: 0,
      depreciationCostTotal: 0,
      filamentCostTotal: 0,
      accessoriesCostTotal: 0,
      printBatchTotal: 0,
      energyCostPerPiece: 0,
      depreciationCostPerPiece: 0,
      filamentCostPerPiece: 0,
      accessoriesCostPerPiece: 0,
      unitCost: 0,
      accessoriesBreakdown: calculatedAccessories,
      shippingCostTotal: 0,
      shippingCostPerPiece: 0,
      profitMarginPercent,
      profitTotal: 0,
      profitPerPiece: 0,
      finalSalePriceTotal: 0,
      finalSalePricePerPiece: 0,
      hasPricingCalculated: false,
    };
  }

  // Fórmulas exatas especificadas:
  // Horas totais = horas + minutos ÷ 60.
  // Energia da impressão = potência média em watts ÷ 1.000 × horas totais × tarifa do kWh.
  const energyCostTotal = ((powerW as number) / 1000) * totalHours * (energyTariff as number);

  // Depreciação da impressão = preço da impressora ÷ vida útil estimada em horas × horas totais.
  const depreciationCostTotal = ((printerPrice as number) / (lifespanH as number)) * totalHours;

  // Filamento da impressão = preço do rolo ÷ peso líquido do rolo em gramas × gramas utilizadas.
  const filamentCostTotal = ((spoolPrice as number) / (spoolWeightGrams as number)) * (usedGrams as number);

  // Rateio para a quantidade de peças
  const energyCostPerPiece = energyCostTotal / pieceCount;
  const depreciationCostPerPiece = depreciationCostTotal / pieceCount;
  const filamentCostPerPiece = filamentCostTotal / pieceCount;
  const accessoriesCostPerPiece = totalAccessoriesCostPerPiece;

  // Custo unitário = (energia + depreciação + filamento) ÷ quantidade de peças + soma dos acessórios por peça.
  const unitCost = ((energyCostTotal + depreciationCostTotal + filamentCostTotal) / pieceCount) + accessoriesCostPerPiece;

  // Custo total = custo unitário × quantidade de peças.
  const printBatchTotal = unitCost * pieceCount;
  const accessoriesCostTotal = accessoriesCostPerPiece * pieceCount;

  // 4. Precificação e Preço de Venda (Frete, Lucro e Valor Final)
  let shippingCostTotal = 0;
  let shippingCostPerPiece = 0;

  if (shippingMode === 'unit') {
    shippingCostPerPiece = shippingVal;
    shippingCostTotal = shippingVal * pieceCount;
  } else {
    shippingCostTotal = shippingVal;
    shippingCostPerPiece = pieceCount > 0 ? shippingVal / pieceCount : shippingVal;
  }

  // Base de custo operacional para cálculo do lucro (Custo fabril + Frete)
  // O valor do frete entra na base de cálculo da margem de lucro
  const baseCostPerPiece = unitCost + shippingCostPerPiece;
  const baseCostTotal = printBatchTotal + shippingCostTotal;

  // Lucro = (Custo + Frete) × (Margem% / 100)
  const profitPerPiece = baseCostPerPiece * (profitMarginPercent / 100);
  const profitTotal = baseCostTotal * (profitMarginPercent / 100);

  // Valor final de venda = Custo + Frete + Lucro
  const finalSalePricePerPiece = unitCost + shippingCostPerPiece + profitPerPiece;
  const finalSalePriceTotal = printBatchTotal + shippingCostTotal + profitTotal;

  const hasPricingCalculated = profitMarginPercent > 0 || shippingVal > 0;

  return {
    isComplete: true,
    missingFields: [],
    totalHours,
    pieceCount,
    energyCostTotal,
    depreciationCostTotal,
    filamentCostTotal,
    accessoriesCostTotal,
    printBatchTotal,
    energyCostPerPiece,
    depreciationCostPerPiece,
    filamentCostPerPiece,
    accessoriesCostPerPiece,
    unitCost,
    accessoriesBreakdown: calculatedAccessories,
    shippingCostTotal,
    shippingCostPerPiece,
    profitMarginPercent,
    profitTotal,
    profitPerPiece,
    finalSalePriceTotal,
    finalSalePricePerPiece,
    hasPricingCalculated,
  };
}

/**
 * Gera texto estruturado para o botão "Copiar resumo"
 */
export function generateSummaryText(
  printer: PrinterConfig,
  print: PrintConfig,
  result: CalculationResult
): string {
  const projectName = print.projectName.trim() || 'Peça 3D';
  const hours = Math.floor(result.totalHours);
  const minutes = Math.round((result.totalHours - hours) * 60);
  const timeFormatted = `${hours}h ${minutes.toString().padStart(2, '0')}min`;

  const accessoriesLines = result.accessoriesBreakdown.length > 0
    ? result.accessoriesBreakdown
        .map(a => `  - ${a.name}: ${formatCurrency(a.costPerPiece)}/peça (${formatCurrency(a.totalCost)} total)`)
        .join('\n')
    : '  - Nenhum acessório adicional';

  let pricingBlock = '';
  if (result.hasPricingCalculated) {
    pricingBlock = `
🏷️ PRECIFICAÇÃO E VENDA COMERCIAL:
  • Custo de produção: ${formatCurrency(result.unitCost)}/peça (Total: ${formatCurrency(result.printBatchTotal)})
  • Frete: ${formatCurrency(result.shippingCostPerPiece)}/peça (Total: ${formatCurrency(result.shippingCostTotal)})
  • Lucro estimado (${result.profitMarginPercent}%): ${formatCurrency(result.profitPerPiece)}/peça (Total: ${formatCurrency(result.profitTotal)})
  ⭐ PREÇO FINAL DE VENDA: ${formatCurrency(result.finalSalePricePerPiece)} / unidade (Total do pedido: ${formatCurrency(result.finalSalePriceTotal)})
`;
  }

  return `📊 Resumo de Custos - ${projectName}
------------------------------------------------
Peças no lote: ${result.pieceCount} unidade(s)
Tempo total: ${timeFormatted}
Material: ${print.usedFilamentGrams}g (${print.filamentType || 'PLA'})

💰 CUSTO DE FABRICAÇÃO POR PEÇA: ${formatCurrency(result.unitCost)}
📦 CUSTO TOTAL DO LOTE: ${formatCurrency(result.printBatchTotal)}

Detalhamento por peça:
  • Filamento: ${formatCurrency(result.filamentCostPerPiece)} (total do lote: ${formatCurrency(result.filamentCostTotal)})
  • Energia elétrica: ${formatCurrency(result.energyCostPerPiece)} (total do lote: ${formatCurrency(result.energyCostTotal)})
  • Depreciação do equipamento: ${formatCurrency(result.depreciationCostPerPiece)} (total do lote: ${formatCurrency(result.depreciationCostTotal)})
  • Acessórios e acabamento: ${formatCurrency(result.accessoriesCostPerPiece)} (total do lote: ${formatCurrency(result.accessoriesCostTotal)})

Acessórios adicionados:
${accessoriesLines}
${pricingBlock}
⚠️ Observação:
Estimativa baseada nos dados informados.`;
}
