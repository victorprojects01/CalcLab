import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Disc,
  Zap,
  TrendingDown,
  Package,
  Calculator,
  Clock,
  Layers,
  Tag,
  Truck,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { CalculationResult, PrinterConfig, PrintConfig } from '../types';
import { formatCurrency, generateSummaryText } from '../utils/calculator';
import {
  IconFilamento,
  IconEnergia,
  IconImpressora3D,
  IconAcessorios,
  IconLucro,
} from './icons/CalcLabIcons';

interface ResultCardProps {
  result: CalculationResult;
  printer: PrinterConfig;
  print: PrintConfig;
  onResetForNewCalculation: () => void;
  onLoadTutorialExample?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  printer,
  print,
  onResetForNewCalculation,
  onLoadTutorialExample,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = generateSummaryText(printer, print, result);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Estado antes do preenchimento das variáveis: o resultado do custo NÃO aparece
  if (!result.isComplete) {
    return (
      <div
        id="card-resultado"
        className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 transition-all"
      >
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Resultado do custo
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Aguardando preenchimento das variáveis
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              O custo por peça e o detalhamento completo só serão calculados após você informar as variáveis da sua impressão no <strong>Bloco 1</strong>:
            </p>
          </div>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
            Variáveis necessárias:
          </span>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5">
              <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold ${
                print.durationHours || print.durationMinutes ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {print.durationHours || print.durationMinutes ? '✓' : '1'}
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className={print.durationHours || print.durationMinutes ? 'font-semibold text-slate-900' : ''}>
                  Tempo de impressão (horas e minutos)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold ${
                print.usedFilamentGrams ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
              }`}>
                {print.usedFilamentGrams ? '✓' : '2'}
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Disc className="w-3.5 h-3.5 text-slate-400" />
                <span className={print.usedFilamentGrams ? 'font-semibold text-slate-900' : ''}>
                  Filamento utilizado (em gramas)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold">
                ✓
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Quantidade de peças ({print.pieceCount || '1'} unidade)
                </span>
              </div>
            </div>
          </div>
        </div>

        {onLoadTutorialExample && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              id="btn-tutorial-inline"
              onClick={onLoadTutorialExample}
              className="w-full py-2.5 px-3 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50/80 hover:bg-blue-100/80 rounded-xl transition-colors min-h-[44px] flex items-center justify-center gap-1.5"
            >
              <span>Ver como funciona no tutorial prático</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      id="card-resultado"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6 transition-all"
    >
      {/* 1. Rótulo da Hierarquia */}
      <div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
          Custo estimado por peça
        </span>

        {/* 2. Valor em reais com maior destaque visual */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight">
            {formatCurrency(result.unitCost)}
          </span>
          <span className="text-xs font-semibold text-slate-500">/ unidade</span>
        </div>

        {/* 3. Custo total e quantidade de peças */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
          <span>Lote total:</span>
          <strong className="text-slate-900">{formatCurrency(result.printBatchTotal)}</strong>
          <span className="text-slate-400">•</span>
          <span>
            {result.pieceCount} {result.pieceCount === 1 ? 'peça' : 'peças'}
          </span>
          {print.projectName && (
            <>
              <span className="text-slate-400">•</span>
              <span className="truncate max-w-[140px] text-slate-600 font-semibold" title={print.projectName}>
                {print.projectName}
              </span>
            </>
          )}
        </div>

        {/* Bloco Comercial: Preço Final de Venda se configurado no Bloco 4 */}
        {result.hasPricingCalculated && (
          <div
            id="resumo-preco-venda-sidebar"
            className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <IconLucro className="w-4 h-4" />
                <span>Preço Final de Venda</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-200">
                +{result.profitMarginPercent}% Lucro
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight block">
                  {formatCurrency(result.finalSalePricePerPiece)}
                </span>
                <span className="text-[11px] text-emerald-800 font-medium">por unidade</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-900 block">
                  {formatCurrency(result.finalSalePriceTotal)}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium">total do pedido</span>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200/70 grid grid-cols-3 gap-1.5 text-[10px] text-emerald-900">
              <div className="bg-white/70 p-1.5 rounded-md border border-emerald-100 text-center">
                <span className="block text-slate-500 font-medium">Custo</span>
                <strong className="text-slate-800">{formatCurrency(result.unitCost)}</strong>
              </div>
              <div className="bg-white/70 p-1.5 rounded-md border border-emerald-100 text-center">
                <span className="block text-slate-500 font-medium">Frete</span>
                <strong className="text-slate-800">{formatCurrency(result.shippingCostPerPiece)}</strong>
              </div>
              <div className="bg-white/70 p-1.5 rounded-md border border-emerald-100 text-center">
                <span className="block text-emerald-700 font-medium">Lucro</span>
                <strong className="text-emerald-700">{formatCurrency(result.profitPerPiece)}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Detalhamento em lista clara de valores (sem gráficos decorativos) */}
      <div className="space-y-3 border-t border-slate-100 pt-5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
          Detalhamento de custos
        </span>

        <div className="space-y-2.5 text-xs">
          {/* Filamento */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2">
              <IconFilamento className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">Filamento</span>
                <span className="text-[11px] text-slate-400 block">
                  {print.usedFilamentGrams}g no total
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">
                {formatCurrency(result.filamentCostPerPiece)}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Total: {formatCurrency(result.filamentCostTotal)}
              </span>
            </div>
          </div>

          {/* Energia Elétrica */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2">
              <IconEnergia className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">Energia elétrica</span>
                <span className="text-[11px] text-slate-400 block">
                  {result.totalHours.toFixed(1)}h de máquina
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">
                {formatCurrency(result.energyCostPerPiece)}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Total: {formatCurrency(result.energyCostTotal)}
              </span>
            </div>
          </div>

          {/* Depreciação */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2">
              <IconImpressora3D className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">Depreciação</span>
                <span className="text-[11px] text-slate-400 block">
                  Desgaste do equipamento
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">
                {formatCurrency(result.depreciationCostPerPiece)}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Total: {formatCurrency(result.depreciationCostTotal)}
              </span>
            </div>
          </div>

          {/* Acessórios (se houver) */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2">
              <IconAcessorios className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">Acabamento e extras</span>
                <span className="text-[11px] text-slate-400 block">
                  {result.accessoriesBreakdown.length > 0
                    ? `${result.accessoriesBreakdown.length} item(ns)`
                    : 'Nenhum item'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">
                {formatCurrency(result.accessoriesCostPerPiece)}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Total: {formatCurrency(result.accessoriesCostTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Lista de nomes de acessórios quando houver */}
        {result.accessoriesBreakdown.length > 0 && (
          <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600 space-y-1">
            <span className="font-semibold text-slate-700 block">Itens incluídos por peça:</span>
            {result.accessoriesBreakdown.map((acc) => (
              <div key={acc.id} className="flex justify-between">
                <span className="truncate pr-2">• {acc.name}</span>
                <span className="font-medium text-slate-800 shrink-0">
                  {formatCurrency(acc.costPerPiece)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Observação discreta e legível */}
      <div
        id="observacao-custo"
        className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed"
      >
        <p className="font-semibold text-slate-700">
          {result.hasPricingCalculated ? 'Formação do preço final:' : 'Atenção ao formar seu preço:'}
        </p>
        <p className="mt-0.5 text-slate-500">
          {result.hasPricingCalculated
            ? `Preço de venda estimado incluindo margem de ${result.profitMarginPercent}% e frete. Lembre-se de incluir eventuais taxas de plataforma de venda (Mercado Livre, Shopee) se houver.`
            : 'O custo fabril acima não inclui frete nem margem de lucro. Configure o Bloco 4 logo abaixo para calcular o preço final de venda.'}
        </p>
      </div>

      {/* Ações */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
        <button
          type="button"
          id="btn-copiar-resumo"
          onClick={handleCopy}
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all min-h-[44px] flex items-center justify-center gap-2 ${
            copied
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:scale-98'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Resumo copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar resumo</span>
            </>
          )}
        </button>

        <button
          type="button"
          id="btn-novo-calculo"
          onClick={onResetForNewCalculation}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors min-h-[44px] flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Novo cálculo</span>
        </button>
      </div>
    </div>
  );
};
