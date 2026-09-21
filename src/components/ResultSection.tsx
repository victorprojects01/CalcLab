import React, { useState } from 'react';
import {
  Calculator,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  Zap,
  Clock,
  CircleDollarSign,
  PackageCheck,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import { CalculationResult, PrinterConfig, PrintConfig } from '../types';
import { formatCurrency, generateSummaryText } from '../utils/calculator';

interface ResultSectionProps {
  result: CalculationResult;
  printer: PrinterConfig;
  print: PrintConfig;
  onResetForNewCalculation: () => void;
  onLoadExample: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  result,
  printer,
  print,
  onResetForNewCalculation,
  onLoadExample,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const summary = generateSummaryText(printer, print, result);
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback manual se clipboard API falhar no iframe
      const textArea = document.createElement('textarea');
      textArea.value = summary;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Se houver campos pendentes, exibe o aviso com os itens faltantes
  if (!result.isComplete) {
    return (
      <div
        id="card-resultado-pendente"
        className="bg-white rounded-2xl border-2 border-dashed border-amber-200 p-6 md:p-8 text-center space-y-4 shadow-xs"
      >
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="max-w-md mx-auto">
          <h3 className="text-base font-bold text-slate-800">Complete os dados para ver o custo</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Para garantir precisão e não calcular custos falsos como zero, preencha os seguintes campos obrigatórios:
          </p>
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-left">
            <ul className="text-xs text-amber-900 space-y-1.5 list-disc pl-4 font-medium">
              {result.missingFields.map((field, idx) => (
                <li key={idx}>{field}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            id="btn-load-example-validation"
            onClick={onLoadExample}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Preencher com exemplo de validação (R$ 2,68)</span>
          </button>
        </div>
      </div>
    );
  }

  // Percentuais de cada componente do custo unitário
  const unitCostSafe = result.unitCost > 0 ? result.unitCost : 1;
  const pctFilament = Math.round((result.filamentCostPerPiece / unitCostSafe) * 100);
  const pctEnergy = Math.round((result.energyCostPerPiece / unitCostSafe) * 100);
  const pctDepreciation = Math.round((result.depreciationCostPerPiece / unitCostSafe) * 100);
  const pctAccessories = Math.round((result.accessoriesCostPerPiece / unitCostSafe) * 100);

  return (
    <div
      id="card-resultado-completo"
      className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden transition-all"
    >
      {/* Top Banner de Destaque com Custo Principal */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
              <Calculator className="w-3.5 h-3.5" />
              <span>Etapa 5 • Resumo da Produção</span>
            </div>
            <h2 className="text-sm font-medium text-blue-100 mt-3">Custo estimado de produção</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl md:text-5xl font-black tracking-tight text-white">
                {formatCurrency(result.unitCost)}
              </span>
              <span className="text-sm font-medium text-blue-200">/ peça produzida</span>
            </div>
            {print.projectName && (
              <p className="text-xs text-blue-100 mt-2 font-medium">
                Projeto: <span className="text-white font-bold">{print.projectName}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 text-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-100">Quantidade de peças:</span>
              <span className="font-bold text-white text-sm">
                {result.pieceCount} {result.pieceCount === 1 ? 'unidade' : 'unidades'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-100">Custo total do lote:</span>
              <span className="font-bold text-white text-base">
                {formatCurrency(result.printBatchTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-2">
              <span className="text-blue-200 text-[11px]">Tempo total:</span>
              <span className="text-white font-medium text-[11px]">
                {Math.floor(result.totalHours)}h {Math.round((result.totalHours - Math.floor(result.totalHours)) * 60)}min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detalhamento por Componente */}
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Detalhamento de custos (por peça e total)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. Filamento */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-700">
                  <CircleDollarSign className="w-3.5 h-3.5 text-blue-600" />
                  Filamento
                </span>
                <span className="text-[11px] font-bold text-slate-500">{pctFilament}%</span>
              </div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {formatCurrency(result.filamentCostPerPiece)}
                <span className="text-[11px] font-normal text-slate-500"> /un</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Total lote: <strong>{formatCurrency(result.filamentCostTotal)}</strong>
              </div>
            </div>

            {/* 2. Energia Elétrica */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-700">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Energia elétrica
                </span>
                <span className="text-[11px] font-bold text-slate-500">{pctEnergy}%</span>
              </div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {formatCurrency(result.energyCostPerPiece)}
                <span className="text-[11px] font-normal text-slate-500"> /un</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Total lote: <strong>{formatCurrency(result.energyCostTotal)}</strong>
              </div>
            </div>

            {/* 3. Depreciação da Impressora */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-700">
                  <TrendingDown className="w-3.5 h-3.5 text-purple-600" />
                  Depreciação
                </span>
                <span className="text-[11px] font-bold text-slate-500">{pctDepreciation}%</span>
              </div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {formatCurrency(result.depreciationCostPerPiece)}
                <span className="text-[11px] font-normal text-slate-500"> /un</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Total lote: <strong>{formatCurrency(result.depreciationCostTotal)}</strong>
              </div>
            </div>

            {/* 4. Acessórios e Acabamento */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-700">
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Acessórios
                </span>
                <span className="text-[11px] font-bold text-slate-500">{pctAccessories}%</span>
              </div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {formatCurrency(result.accessoriesCostPerPiece)}
                <span className="text-[11px] font-normal text-slate-500"> /un</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Total lote: <strong>{formatCurrency(result.accessoriesCostTotal)}</strong>
              </div>
            </div>
          </div>

          {/* Lista discriminada de acessórios se houver */}
          {result.accessoriesBreakdown.length > 0 && (
            <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <span className="font-semibold text-slate-700 block mb-1.5">Itens extras incluídos na peça:</span>
              <div className="space-y-1">
                {result.accessoriesBreakdown.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-slate-600">
                    <span>• {item.name} ({item.description})</span>
                    <span className="font-bold text-slate-800">
                      {formatCurrency(item.costPerPiece)} / un
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Observação obrigatória explícita */}
        <div
          id="resultado-observacao-obrigatoria"
          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed"
        >
          <p className="font-medium text-slate-700">
            <strong>Observação importante:</strong> Estimativa baseada nos dados informados. Não inclui mão de obra,
            falhas, manutenção, taxas de venda ou lucro.
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Recomenda-se adicionar uma margem de segurança (geralmente 10% a 15% para falhas e desgaste de bicos/mesa)
            e calcular seu tempo de mão de obra antes de definir o preço final de venda.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            id="btn-copiar-resumo"
            onClick={handleCopySummary}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-98'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Resumo copiado com sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar resumo</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-novo-calculo"
              onClick={onResetForNewCalculation}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Novo cálculo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
