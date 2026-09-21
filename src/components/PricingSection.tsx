import React from 'react';
import {
  Tag,
  Truck,
  TrendingUp,
  Layers,
  HelpCircle,
  Percent,
  DollarSign,
  ArrowRight,
  Info,
} from 'lucide-react';
import { CalculationResult, PricingConfig } from '../types';
import { formatCurrency, parseLocalNumber } from '../utils/calculator';
import { NumericInput } from './NumericInput';
import { IconLucro } from './icons/CalcLabIcons';

interface PricingSectionProps {
  config: PricingConfig;
  onChange: (config: PricingConfig) => void;
  result: CalculationResult;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  config,
  onChange,
  result,
}) => {
  const marginPresets = [
    { label: '30%', value: '30', desc: 'Atacado / Lotes' },
    { label: '50%', value: '50', desc: 'Competitivo' },
    { label: '100%', value: '100', desc: 'Padrão Maker (2x)' },
    { label: '150%', value: '150', desc: 'Recomendado' },
    { label: '200%', value: '200', desc: 'Premium / Exclusivo' },
  ];

  const shippingPresets = [
    { label: 'Grátis / Balcão', value: '0' },
    { label: 'R$ 15', value: '15' },
    { label: 'R$ 25', value: '25' },
    { label: 'R$ 35', value: '35' },
  ];

  const handleFieldChange = (field: keyof PricingConfig, value: string) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handleSetMarginPreset = (value: string) => {
    handleFieldChange('profitMarginPercent', value);
  };

  const handleSetShippingPreset = (value: string) => {
    handleFieldChange('shippingCost', value);
  };

  const marginNum = parseLocalNumber(config.profitMarginPercent) ?? 0;
  const shippingNum = parseLocalNumber(config.shippingCost) ?? 0;

  return (
    <section
      id="bloco-preco-de-venda"
      className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-md ring-4 ring-emerald-500/10 p-5 md:p-6 transition-all relative overflow-hidden"
      aria-labelledby="heading-preco-venda"
    >
      {/* Faixa decorativa no topo */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-500" />

      {/* Cabeçalho do Bloco 4 */}
      <div className="flex items-center justify-between gap-3 mb-5 border-b border-emerald-100/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1.5 shadow-sm shadow-emerald-600/10 shrink-0">
            <IconLucro className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-100/90 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Bloco 4 • Precificação Comercial
              </span>
            </div>
            <h2 id="heading-preco-venda" className="text-lg md:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Preço de Venda & Lucro
            </h2>
            <p className="text-xs text-slate-600">
              Calcule o valor de venda comercial integrando frete e margem de lucro líquida
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Entradas: Frete e Margem de Lucro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* 1. Frete */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Valor do Frete
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Entrega / Envio</span>
          </div>

          <NumericInput
            id="input-shipping-cost"
            label="Frete em Reais"
            value={config.shippingCost}
            onChange={(val) => handleFieldChange('shippingCost', val)}
            placeholder="0,00"
            prefix="R$"
            helpText="Informe o valor cobrado para enviar o pedido. Pode ser o total da encomenda ou por peça individual."
          />

          {/* Modo de aplicação do frete (total do pedido vs unitário) */}
          <div className="pt-1">
            <label className="text-[11px] font-semibold text-slate-600 block mb-1.5">
              Como cobrar o frete:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                id="btn-frete-total"
                onClick={() => handleFieldChange('shippingMode', 'total')}
                className={`py-1.5 px-2.5 rounded-lg border text-center font-medium transition-colors ${
                  config.shippingMode === 'total'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Total do Pedido</span>
                {result.pieceCount > 1 && config.shippingMode === 'total' && shippingNum > 0 && (
                  <span className="block text-[10px] text-emerald-600 font-normal">
                    ({formatCurrency(shippingNum / result.pieceCount)} / peça)
                  </span>
                )}
              </button>

              <button
                type="button"
                id="btn-frete-unitario"
                onClick={() => handleFieldChange('shippingMode', 'unit')}
                className={`py-1.5 px-2.5 rounded-lg border text-center font-medium transition-colors ${
                  config.shippingMode === 'unit'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>Por Peça</span>
                {result.pieceCount > 1 && config.shippingMode === 'unit' && shippingNum > 0 && (
                  <span className="block text-[10px] text-emerald-600 font-normal">
                    ({formatCurrency(shippingNum * result.pieceCount)} total)
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Atalhos rápidos de frete */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {shippingPresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => handleSetShippingPreset(preset.value)}
                className={`text-[11px] px-2 py-1 rounded-md border transition-colors ${
                  config.shippingCost === preset.value
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Margem de Lucro */}
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <IconLucro className="w-4 h-4" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Margem de Lucro (%)
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Markup sobre custo</span>
          </div>

          <NumericInput
            id="input-profit-margin"
            label="Porcentagem de Margem"
            value={config.profitMarginPercent}
            onChange={(val) => handleFieldChange('profitMarginPercent', val)}
            placeholder="100"
            suffix="%"
            helpText={
              shippingNum > 0
                ? "Markup sobre custo + frete: a porcentagem de lucro é aplicada sobre o valor do custo fabril somado ao frete."
                : "Markup sobre o custo fabril: por exemplo, 100% de margem significa obter de lucro exatamente o mesmo valor investido na produção."
            }
          />

          {/* Presets de Margem */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1.5">
              Padrões comuns no mercado 3D:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {marginPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handleSetMarginPreset(preset.value)}
                  className={`py-1.5 px-1 rounded-lg border text-center transition-all ${
                    config.profitMarginPercent === preset.value
                      ? 'bg-emerald-600 border-emerald-700 text-white font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title={preset.desc}
                >
                  <span className="text-xs font-bold block leading-tight">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            💡 <strong>100% de margem</strong> dobra o custo de fabricação da peça garantindo retorno saudável para reinvestimento.
          </p>
        </div>
      </div>

      {/* ENTREGA DOS VALORES SEPARADOS: Custo, Frete, Lucro e Valor Final de Venda */}
      <div className="border-t border-emerald-100/90 pt-5 space-y-4" id="secao-valores-entregues">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Demonstrativo Financeiro da Venda
            </span>
            <p className="text-xs text-slate-500">
              Valores discriminados por unidade e para o lote completo de {result.pieceCount} {result.pieceCount === 1 ? 'peça' : 'peças'}
            </p>
          </div>
          {result.isComplete && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ✓ Calculado automaticamente
            </span>
          )}
        </div>

        {result.isComplete ? (
          <div className="space-y-4">
            {/* Grid dos 3 pilares intermediários: Custo, Frete e Lucro */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. CUSTO */}
              <div
                id="card-custo-discriminado"
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider">1. Custo</span>
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Custo Fabril Total
                  </span>
                  <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {formatCurrency(result.unitCost)}
                    <span className="text-[11px] font-normal text-slate-500"> / un</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 flex justify-between">
                  <span>Lote ({result.pieceCount} un):</span>
                  <strong className="text-slate-800">{formatCurrency(result.printBatchTotal)}</strong>
                </div>
              </div>

              {/* 2. FRETE */}
              <div
                id="card-frete-discriminado"
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider">2. Frete</span>
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Envio / Entrega
                  </span>
                  <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {formatCurrency(result.shippingCostPerPiece)}
                    <span className="text-[11px] font-normal text-slate-500"> / un</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 flex justify-between">
                  <span>Lote total:</span>
                  <strong className="text-slate-800">{formatCurrency(result.shippingCostTotal)}</strong>
                </div>
              </div>

              {/* 3. LUCRO */}
              <div
                id="card-lucro-discriminado"
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider">3. Lucro</span>
                    <IconLucro className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Lucro Líquido (+{result.profitMarginPercent}%)
                    {result.shippingCostTotal > 0 && (
                      <span className="block text-[10px] text-slate-400 font-normal">
                        sobre custo + frete
                      </span>
                    )}
                  </span>
                  <div className="text-lg font-extrabold text-emerald-700 mt-0.5">
                    {formatCurrency(result.profitPerPiece)}
                    <span className="text-[11px] font-normal text-emerald-600/80"> / un</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 flex justify-between">
                  <span>Lote total:</span>
                  <strong className="text-emerald-800">{formatCurrency(result.profitTotal)}</strong>
                </div>
              </div>
            </div>

            {/* 4. VALOR FINAL DE VENDA CALCULADO - Destaque Visual Supremo */}
            <div
              id="card-valor-final-venda"
              className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wide uppercase mb-1">
                    <DollarSign className="w-3 h-3" />
                    <span>4. Preço Final de Venda Sugerido</span>
                  </div>
                  <h3 className="text-xs text-emerald-100 font-medium">
                    Valor total de venda com Custo + Frete + Lucro
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                      {formatCurrency(result.finalSalePricePerPiece)}
                    </span>
                    <span className="text-xs text-emerald-100 font-semibold">/ unidade</span>
                  </div>
                </div>

                <div className="sm:text-right bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 sm:min-w-[180px]">
                  <span className="text-[11px] text-emerald-100 font-medium block">
                    Valor Total do Lote ({result.pieceCount} un):
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-white block mt-0.5">
                    {formatCurrency(result.finalSalePriceTotal)}
                  </span>
                  {shippingNum > 0 && (
                    <span className="text-[10px] text-emerald-200 block mt-0.5">
                      Inclui {formatCurrency(result.shippingCostTotal)} de frete
                    </span>
                  )}
                </div>
              </div>

              {/* Equação visual discriminada */}
              <div className="mt-4 pt-3.5 border-t border-white/20 flex flex-wrap items-center gap-2 text-xs text-emerald-100">
                <span className="font-semibold text-white">Equação por peça:</span>
                <span className="bg-white/15 px-2 py-0.5 rounded text-white">
                  Custo: {formatCurrency(result.unitCost)}
                </span>
                <span>+</span>
                <span className="bg-white/15 px-2 py-0.5 rounded text-white">
                  Frete: {formatCurrency(result.shippingCostPerPiece)}
                </span>
                <span>+</span>
                <span className="bg-white/15 px-2 py-0.5 rounded text-white">
                  Lucro: {formatCurrency(result.profitPerPiece)}
                </span>
                <span>=</span>
                <strong className="text-white underline decoration-emerald-300 font-bold">
                  {formatCurrency(result.finalSalePricePerPiece)}
                </strong>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="aviso-preenchimento-pendente"
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-start gap-3 leading-relaxed"
          >
            <Info className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-slate-800">
                Aguardando dados de impressão do Bloco 1
              </p>
              <p className="mt-0.5 text-slate-500">
                Assim que você preencher o tempo e a quantidade de filamento no <strong>Bloco 1 (Sua impressão)</strong>, os valores de <strong>Custo</strong>, <strong>Frete</strong>, <strong>Lucro</strong> e o <strong>Valor Final de Venda</strong> serão calculados e exibidos aqui em tempo real.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
