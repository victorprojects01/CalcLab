import React from 'react';
import { BookOpen, Zap, Layers, Cpu, TrendingUp, DollarSign } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export const EditorialGuideSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section
      id="guia-precificacao"
      className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 mt-12 text-slate-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {t.guideTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {t.guideSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        {/* Pilar 1 */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <h3>{t.guidePillar1Title}</h3>
          </div>
          <p>{t.guidePillar1Desc}</p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono">
            {t.guidePillar1Formula}
          </div>
          <p className="text-[11px] text-slate-500">
            <strong>{language === 'en' ? 'Pro-tip:' : language === 'es' ? 'Consejo práctico:' : 'Dica prática:'}</strong>{' '}
            {language === 'en'
              ? 'Always copy sliced weight from your slicer (Cura, PrusaSlicer, Bambu Studio, OrcaSlicer) as it accounts for supports, skirts, brims, and rafts.'
              : language === 'es'
              ? 'Copia siempre los gramos indicados en tu laminador (Cura, PrusaSlicer, Bambu Studio u OrcaSlicer), ya que incluye soportes, faldas y bordes.'
              : 'Sempre copie as gramas indicadas diretamente no fatiador (Cura, PrusaSlicer, Bambu Studio ou OrcaSlicer), pois ele já inclui suportes, saia (skirt) e borda (brim).'}
          </p>
        </div>

        {/* Pilar 2 */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <h3>{t.guidePillar2Title}</h3>
          </div>
          <p>{t.guidePillar2Desc}</p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono">
            {t.guidePillar2Formula}
          </div>
          <p className="text-[11px] text-slate-500">
            {language === 'en'
              ? 'During steady printing with PLA at 60°C bed temperature, a standard FDM printer draws around 100W to 130W on average.'
              : language === 'es'
              ? 'En régimen estable con cama a 60°C para PLA, una impresora FDM típica consume una media de 100W a 130W.'
              : 'Em regime estável de impressão com PLA a 60°C de mesa, uma impressora tipo cartesiana consome em média 100W a 130W.'}
          </p>
        </div>

        {/* Pilar 3 */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <h3>{t.guidePillar3Title}</h3>
          </div>
          <p>{t.guidePillar3Desc}</p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono">
            {t.guidePillar3Formula}
          </div>
          <p className="text-[11px] text-slate-500">
            {language === 'en'
              ? 'A standard baseline is 5,000 to 6,000 operating hours for entry and mid-tier desktop FDM printers.'
              : language === 'es'
              ? 'Consideramos una media de 5.000 a 6.000 horas de vida útil para impresoras FDM domésticas y semiprofesionales.'
              : 'Consideramos uma média de mercado de 5.000 a 6.000 horas para impressoras FDM domésticas de entrada e intermediárias.'}
          </p>
        </div>

        {/* Pilar 4 */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            <h3>{t.guidePillar4Title}</h3>
          </div>
          <p>{t.guidePillar4Desc}</p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono">
            {t.guidePillar4Formula}
          </div>
          <p className="text-[11px] text-slate-500">
            {language === 'en'
              ? 'Save your favorite hardware packs (magnets, screws, keyrings) as reusable templates with one click.'
              : language === 'es'
              ? 'Guarda tus paquetes de herrajes habituales como plantillas reutilizables en un clic.'
              : 'Nossa calculadora permite salvar esses acessórios para reaproveitamento em um clique nos próximos orçamentos.'}
          </p>
        </div>
      </div>

      {/* Box de Precificação Comercial */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-slate-50 border border-blue-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-950">
              {language === 'en'
                ? 'How to set your final selling price?'
                : language === 'es'
                ? '¿Cómo fijar el precio de venta al cliente?'
                : 'Como definir o preço de venda da sua peça 3D?'}
            </h4>
            <p className="text-xs text-blue-800/90 mt-0.5 max-w-xl">
              {language === 'en'
                ? 'The figure calculated here is your internal factory cost. To price commercially: add setup/cad modeling time + failure buffer (around 10%) + your desired profit margin (50% to 200%) + marketplace commission fees.'
                : language === 'es'
                ? 'El valor calculado aquí es el coste de fabricación. Para vender: añade tiempo de modelado + margen para fallos (aprox. 10%) + margen de beneficio (50% al 200%) + comisiones de venta online.'
                : 'O valor calculado aqui é o custo de fabricação. Para precificar comercialmente, adicione: horas de modelagem/fatiamento + margem para falhas (cerca de 10%) + sua margem de lucro desejada (normalmente de 50% a 200%) + taxas de venda de marketplaces.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
