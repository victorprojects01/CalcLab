import React from 'react';
import {
  Tag,
  Truck,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { CalculationResult, PricingConfig } from '../types';
import { parseLocalNumber } from '../utils/calculator';
import { NumericInput } from './NumericInput';
import { IconLucro } from './icons/CalcLabIcons';
import { trackEvent } from '../utils/analytics';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

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
  const { language, currency, formatMoney } = useLanguage();
  const t = translations[language];

  const marginPresets = [
    { label: '30%', value: '30', desc: t.marginAtacado },
    { label: '50%', value: '50', desc: t.marginCompetitivo },
    { label: '100%', value: '100', desc: t.marginPadrao },
    { label: '150%', value: '150', desc: t.marginRecomendado },
    { label: '200%', value: '200', desc: t.marginPremium },
  ];

  const shippingPresets = [
    { label: t.shippingFree, value: '0' },
    { label: `${currency.symbol} 5`, value: '5' },
    { label: `${currency.symbol} 10`, value: '10' },
    { label: `${currency.symbol} 15`, value: '15' },
  ];

  const handleFieldChange = (field: keyof PricingConfig, value: string) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handleSetMarginPreset = (value: string) => {
    handleFieldChange('profitMarginPercent', value);
    trackEvent('select_margin_preset', {
      margin_percent: value,
    });
  };

  const handleSetShippingPreset = (value: string) => {
    handleFieldChange('shippingCost', value);
    trackEvent('select_shipping_preset', {
      shipping_cost: value,
    });
  };

  return (
    <section
      id="bloco-precificacao"
      className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-md ring-4 ring-emerald-500/10 p-5 md:p-6 transition-all relative overflow-hidden"
      aria-labelledby="heading-precificacao"
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500" />

      <div className="flex items-center justify-between gap-3 mb-5 border-b border-emerald-100/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1.5 shadow-sm shadow-emerald-600/10 shrink-0 text-emerald-600">
            <IconLucro className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-100/90 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {t.block4Badge}
              </span>
            </div>
            <h2 id="heading-precificacao" className="text-lg md:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              {t.block4Title}
            </h2>
            <p className="text-xs text-slate-600">
              {t.block4Subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Margem de Lucro */}
        <div className="space-y-3" id="container-margem-lucro">
          <div className="flex items-center justify-between">
            <label htmlFor="input-profit-margin" className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>{t.profitMarginLabel}</span>
            </label>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {config.profitMarginPercent || '0'}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-5">
              <div className="relative flex items-center">
                <input
                  id="input-profit-margin"
                  type="text"
                  inputMode="numeric"
                  placeholder="100"
                  value={config.profitMarginPercent}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    handleFieldChange('profitMarginPercent', clean);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white min-h-[44px] py-2.5 pl-3.5 pr-12 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/25 focus:border-emerald-600 shadow-2xs"
                />
                <span className="absolute right-3 text-slate-500 text-xs font-bold pointer-events-none">
                  %
                </span>
              </div>
            </div>

            <div className="sm:col-span-7 flex flex-wrap gap-1.5">
              {marginPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handleSetMarginPreset(preset.value)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    config.profitMarginPercent === preset.value
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title={preset.desc}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Frete e Envio */}
        <div className="space-y-3 pt-3 border-t border-slate-100" id="container-frete">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>{t.shippingCostLabel}</span>
            </label>
            <div className="flex items-center gap-2 text-xs">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="shippingMode"
                  checked={config.shippingMode === 'total'}
                  onChange={() => handleFieldChange('shippingMode', 'total')}
                  className="text-emerald-600"
                />
                <span className="text-[11px] text-slate-600">{language === 'en' ? 'Total (split)' : language === 'es' ? 'Total (repartir)' : 'Total (ratear)'}</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="shippingMode"
                  checked={config.shippingMode === 'unit'}
                  onChange={() => handleFieldChange('shippingMode', 'unit')}
                  className="text-emerald-600"
                />
                <span className="text-[11px] text-slate-600">{language === 'en' ? 'Per unit' : language === 'es' ? 'Por unidad' : 'Por unidade'}</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-5">
              <NumericInput
                id="input-shipping-cost"
                label=""
                prefix={currency.symbol}
                placeholder="0.00"
                value={config.shippingCost}
                onChange={(val) => handleFieldChange('shippingCost', val)}
              />
            </div>

            <div className="sm:col-span-7 flex flex-wrap gap-1.5">
              {shippingPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handleSetShippingPreset(preset.value)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    config.shippingCost === preset.value
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card Destaque Preço de Venda Final */}
        {result.isComplete && (
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                  {t.resultSalePriceLabel}
                </span>
                <span className="text-3xl font-black text-emerald-700">
                  {formatMoney(result.finalSalePricePerPiece)}
                </span>
                <span className="text-xs text-emerald-800 font-medium ml-1">/ {language === 'en' ? 'piece' : language === 'es' ? 'pieza' : 'peça'}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-600 block">
                  {language === 'en' ? 'Order total:' : language === 'es' ? 'Total pedido:' : 'Total do pedido:'}
                </span>
                <span className="text-sm font-bold text-emerald-900">
                  {formatMoney(result.finalSalePriceTotal)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-200/80 text-center text-xs">
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-500 block">{language === 'en' ? 'Cost' : language === 'es' ? 'Coste' : 'Custo'}</span>
                <strong className="text-slate-800">{formatMoney(result.unitCost)}</strong>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-slate-500 block">{language === 'en' ? 'Shipping' : language === 'es' ? 'Portes' : 'Frete'}</span>
                <strong className="text-slate-800">{formatMoney(result.shippingCostPerPiece)}</strong>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-[10px] text-emerald-700 block">{language === 'en' ? 'Profit' : language === 'es' ? 'Beneficio' : 'Lucro'}</span>
                <strong className="text-emerald-700">{formatMoney(result.profitPerPiece)}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
