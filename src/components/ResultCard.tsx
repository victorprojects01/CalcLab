import React, { useState } from 'react';
import {
  Calculator,
  Check,
  Clock,
  Copy,
  Disc,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { CalculationResult, PrinterConfig, PrintConfig, CalculatedAccessory } from '../types';
import { generateSummaryText } from '../utils/calculator';
import { trackEvent } from '../utils/analytics';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import {
  IconFilamento,
  IconEnergia,
  IconImpressora3D,
  IconAcessorios,
  IconLucro,
} from './icons/CalcLabIcons';

interface ResultCardProps {
  printer: PrinterConfig;
  result: CalculationResult;
  print: PrintConfig;
  onResetForNewCalculation: () => void;
  onLoadTutorialExample?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  printer,
  result,
  print,
  onResetForNewCalculation,
  onLoadTutorialExample,
}) => {
  const { language, formatMoney } = useLanguage();
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = generateSummaryText(printer, print, result, formatMoney, {
      summaryTitle: t.summaryTitle,
      summaryPieces: t.summaryPieces,
      summaryTotalTime: t.summaryTotalTime,
      summaryMaterial: t.summaryMaterial,
      summaryCostPerPiece: t.summaryCostPerPiece,
      summaryBatchCost: t.summaryBatchCost,
      summaryBreakdownTitle: t.summaryBreakdownTitle,
      summaryFilament: t.summaryFilament,
      summaryEnergy: t.summaryEnergy,
      summaryDepreciation: t.summaryDepreciation,
      summaryAccessories: t.summaryAccessories,
      summaryNoAccessories: t.summaryNoAccessories,
      summaryPricingSection: t.summaryPricingSection,
      summaryCostProd: t.summaryCostProd,
      summaryShipping: t.summaryShipping,
      summaryProfit: t.summaryProfit,
      summaryFinalSale: t.summaryFinalSale,
      summaryNote: t.summaryNote,
    });

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      trackEvent('copy_summary_click', {
        piece_count: result.pieceCount,
        has_pricing: result.hasPricingCalculated,
        unit_cost: result.unitCost,
        sale_price: result.finalSalePricePerPiece,
      });
    } catch {
      // Fallback simples
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

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
              {t.resultCostPerPieceLabel}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {t.resultPendingTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {t.resultPendingDesc}
            </p>
          </div>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
            {t.block1Badge}:
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
                  {t.resultStepTime}
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
                  {t.resultStepFilament}
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
                  {t.resultStepPieces} ({print.pieceCount || '1'} {t.pieceCountSuffix})
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
              className="w-full py-2.5 px-3 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50/80 hover:bg-blue-100/80 rounded-xl transition-colors min-h-[44px] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t.tutorialInlineBtn}</span>
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
          {t.resultCostPerPieceLabel}
        </span>

        {/* 2. Valor com destaque visual */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight">
            {formatMoney(result.unitCost)}
          </span>
          <span className="text-xs font-semibold text-slate-500">/ {language === 'en' ? 'unit' : language === 'es' ? 'unidad' : 'unidade'}</span>
        </div>

        {/* 3. Custo total e quantidade de peças */}
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
          <span>{t.resultBatchCostTotalLabel}:</span>
          <strong className="text-slate-900">{formatMoney(result.printBatchTotal)}</strong>
          <span className="text-slate-400">•</span>
          <span>
            {result.pieceCount} {result.pieceCount === 1 ? (language === 'en' ? 'piece' : language === 'es' ? 'pieza' : 'peça') : (language === 'en' ? 'pieces' : language === 'es' ? 'piezas' : 'peças')}
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
                <span>{t.resultSalePriceLabel}</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-200">
                +{result.profitMarginPercent}% {t.profitMarginLabel}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight block">
                  {formatMoney(result.finalSalePricePerPiece)}
                </span>
                <span className="text-[11px] text-emerald-800 font-medium">/ {language === 'en' ? 'unit' : language === 'es' ? 'unidad' : 'unidade'}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-900 block">
                  {formatMoney(result.finalSalePriceTotal)}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium">{language === 'en' ? 'total order' : language === 'es' ? 'total pedido' : 'total do pedido'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200/70 grid grid-cols-3 gap-1.5 text-[10px] text-emerald-900">
              <div className="bg-white/70 p-1.5 rounded-md border border-emerald-100 text-center">
                <span className="block text-slate-500 font-medium">{language === 'en' ? 'Cost' : language === 'es' ? 'Coste' : 'Custo'}</span>
                <strong className="text-slate-800">{formatMoney(result.unitCost)}</strong>
              </div>
              <div className="bg-white/70 p-1.5 rounded-md border border-emerald-100 text-center">
                <span className="block text-slate-500 font-medium">{language === 'en' ? 'Shipping' : language === 'es' ? 'Portes' : 'Frete'}</span>
                <strong className="text-slate-800">{formatMoney(result.shippingCostPerPiece)}</strong>
              </div>
              <div className="bg-white/70 p-1.5 rounded-md border border-emerald-100 text-center">
                <span className="block text-emerald-700 font-medium">{language === 'en' ? 'Profit' : language === 'es' ? 'Beneficio' : 'Lucro'}</span>
                <strong className="text-emerald-700">{formatMoney(result.profitPerPiece)}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Detalhamento em lista clara de valores */}
      <div className="space-y-3 border-t border-slate-100 pt-5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
          {t.resultBreakdownTitle}
        </span>

        <div className="space-y-2.5 text-xs">
          {/* Filamento */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2">
              <IconFilamento className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">{t.resultFilamentItem}</span>
                <span className="text-[11px] text-slate-400 block">
                  {print.usedFilamentGrams}g {language === 'en' ? 'total' : language === 'es' ? 'total' : 'no total'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">
                {formatMoney(result.filamentCostPerPiece)}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Total: {formatMoney(result.filamentCostTotal)}
              </span>
            </div>
          </div>

          {/* Energia Elétrica */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2">
              <IconEnergia className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">{t.resultEnergyItem}</span>
                <span className="text-[11px] text-slate-400 block">
                  {result.totalHours.toFixed(1)}h {language === 'en' ? 'print time' : language === 'es' ? 'tiempo máquina' : 'de máquina'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">
                {formatMoney(result.energyCostPerPiece)}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Total: {formatMoney(result.energyCostTotal)}
              </span>
            </div>
          </div>

          {/* Depreciação */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2">
              <IconImpressora3D className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">{t.resultDepreciationItem}</span>
                <span className="text-[11px] text-slate-400 block">
                  {language === 'en' ? 'Machine wear' : language === 'es' ? 'Desgaste máquina' : 'Desgaste do equipamento'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">
                {formatMoney(result.depreciationCostPerPiece)}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Total: {formatMoney(result.depreciationCostTotal)}
              </span>
            </div>
          </div>

          {/* Acessórios (se houver) */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-2">
              <IconAcessorios className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800">{t.resultAccessoriesItem}</span>
                <span className="text-[11px] text-slate-400 block">
                  {result.accessoriesBreakdown.length > 0
                    ? `${result.accessoriesBreakdown.length} ${language === 'en' ? 'item(s)' : language === 'es' ? 'ítem(s)' : 'item(ns)'}`
                    : (language === 'en' ? 'None' : language === 'es' ? 'Ninguno' : 'Nenhum item')}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 text-sm">
                {formatMoney(result.accessoriesCostPerPiece)}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Total: {formatMoney(result.accessoriesCostTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Detalhamento de acessórios com nomes */}
        {result.accessoriesBreakdown.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-100 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-600 block">
              {t.resultAccessoriesIncluded}
            </span>
            <div className="space-y-1">
              {result.accessoriesBreakdown.map((item: CalculatedAccessory) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-[11px] text-slate-600 pl-2 border-l-2 border-slate-200"
                >
                  <span className="truncate max-w-[170px]" title={item.name}>
                    {item.name}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {formatMoney(item.costPerPiece)} / un
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Nota explicativa de fechamento */}
      <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 leading-relaxed">
        <p className="font-medium text-slate-600">
          {result.hasPricingCalculated ? t.resultNoticePricingActive : t.resultNoticePricingInactive}
        </p>
        <p className="mt-0.5 text-slate-500">
          {result.hasPricingCalculated
            ? (language === 'en'
                ? `Estimated selling price with ${result.profitMarginPercent}% margin and shipping included. Remember to account for marketplace fees if selling online.`
                : language === 'es'
                ? `Precio estimado con margen del ${result.profitMarginPercent}% y envío. Considera comisiones de plataformas de venta si aplica.`
                : `Preço de venda estimado incluindo margem de ${result.profitMarginPercent}% e frete. Lembre-se de incluir eventuais taxas de plataforma de venda (Mercado Livre, Shopee) se houver.`)
            : (language === 'en'
                ? 'The factory cost above excludes shipping and profit margin. Configure Block 4 below to calculate your final customer price.'
                : language === 'es'
                ? 'El coste de fabricación anterior no incluye envío ni margen de beneficio. Configura el Bloque 4 para calcular el precio final.'
                : 'O custo fabril acima não inclui frete nem margem de lucro. Configure o Bloco 4 logo abaixo para calcular o preço final de venda.')}
        </p>
      </div>

      {/* Ações */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
        <button
          type="button"
          id="btn-copiar-resumo"
          onClick={handleCopy}
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all min-h-[44px] flex items-center justify-center gap-2 cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:scale-98'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>{t.copiedSummarySuccess}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>{t.copySummaryBtn}</span>
            </>
          )}
        </button>

        <button
          type="button"
          id="btn-novo-calculo"
          onClick={onResetForNewCalculation}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors min-h-[44px] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>{t.newCalculationBtn}</span>
        </button>
      </div>
    </div>
  );
};
