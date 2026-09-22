import React from 'react';
import {
  BookOpen,
  Zap,
  Layers,
  Cpu,
  TrendingUp,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface GuidePageProps {
  onNavigateToCalculator: () => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ onNavigateToCalculator }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 text-slate-800">
      {/* Barra de Navegação Superior / Voltar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={onNavigateToCalculator}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-3.5 py-2 rounded-xl transition-all cursor-pointer min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToCalc}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{t.guideReadingTime}</span>
        </div>
      </div>

      {/* Cabeçalho da Página */}
      <header className="mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.guideBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {t.guideTitle}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          {t.guideSubtitle}
        </p>
      </header>

      {/* Artigo Principal Estruturado */}
      <article className="space-y-10 text-sm sm:text-base leading-relaxed text-slate-700">
        {/* Seção 1: O Prejuízo Invisível */}
        <section className="space-y-4 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80">
          <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base sm:text-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <h2>{t.guideSec1Title}</h2>
          </div>
          <p>{t.guideSec1P1}</p>
          <p>{t.guideSec1P2}</p>
        </section>

        {/* Seção 2: Pilar 1 - Filamento */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-blue-700 font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <h2>{t.guidePillar1Title}</h2>
          </div>
          <p>{t.guidePillar1Desc}</p>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm">
            {t.guidePillar1Formula}
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
            <p className="font-semibold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {language === 'en' ? 'Why rely on your 3D Slicer?' : language === 'es' ? '¿Por qué confiar únicamente en el Laminador?' : 'Por que confiar apenas no Fatiador (Slicer)?'}
            </p>
            <p className="text-slate-600">
              {language === 'en'
                ? 'Never use only the weight of the cleaned part. Software like Cura, Bambu Studio, PrusaSlicer, and OrcaSlicer already precisely calculate:'
                : language === 'es'
                ? 'Nunca utilices solo el peso de la pieza limpia. Softwares como Cura, Bambu Studio, PrusaSlicer y OrcaSlicer calculan con exactitud:'
                : 'Nunca use apenas o peso da peça limpa após remover suportes. Softwares como Cura, Bambu Studio, PrusaSlicer e OrcaSlicer já calculam com precisão milimétrica:'}
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 pl-2">
              <li>{language === 'en' ? 'Perimeter walls and internal infill;' : language === 'es' ? 'Paredes perimetrales y relleno interno (infill);' : 'Paredes perimétricas e preenchimento interno (infill);'}</li>
              <li>{language === 'en' ? 'Support structures (standard or tree supports);' : language === 'es' ? 'Estructuras de soporte (estándar o en árbol);' : 'Estruturas de suporte (suportes normais ou suportes em árvore);'}</li>
              <li>{language === 'en' ? 'Bed adhesion elements: skirts, brims, and rafts;' : language === 'es' ? 'Elementos de adhesión a la cama: falda (skirt), borde (brim) y balsa (raft);' : 'Elementos de adesão à mesa: saia (skirt), borda (brim) e balsa (raft);'}</li>
              <li>{language === 'en' ? 'Purge towers used for multi-material or multi-color prints.' : language === 'es' ? 'Torres de purga para impresiones multicolor.' : 'Torres de purga (purge towers) utilizadas em impressões multicoloridas.'}</li>
            </ul>
          </div>
        </section>

        {/* Seção 3: Pilar 2 - Energia Elétrica */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-blue-700 font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <h2>{t.guidePillar2Title}</h2>
          </div>
          <p>{t.guidePillar2Desc}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="p-3">{language === 'en' ? 'Material' : language === 'es' ? 'Material' : 'Material Típico'}</th>
                  <th className="p-3">{language === 'en' ? 'Bed Temp' : language === 'es' ? 'Temp. Cama' : 'Temperatura da Mesa'}</th>
                  <th className="p-3">{language === 'en' ? 'Average Real Power' : language === 'es' ? 'Potencia Media Real' : 'Potência Média Real'}</th>
                  <th className="p-3">{language === 'en' ? 'Consumption (10h)' : language === 'es' ? 'Consumo (10h)' : 'Consumo em 10 Horas'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">PLA</td>
                  <td className="p-3">55°C – 60°C</td>
                  <td className="p-3">100W – 130W</td>
                  <td className="p-3">1.0 – 1.3 kWh</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">PETG</td>
                  <td className="p-3">70°C – 80°C</td>
                  <td className="p-3">140W – 180W</td>
                  <td className="p-3">1.4 – 1.8 kWh</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">ABS / ASA</td>
                  <td className="p-3">95°C – 110°C</td>
                  <td className="p-3">220W – 300W</td>
                  <td className="p-3">2.2 – 3.0 kWh</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm">
            {t.guidePillar2Formula}
          </div>
        </section>

        {/* Seção 4: Pilar 3 - Depreciação */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-blue-700 font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <h2>{t.guidePillar3Title}</h2>
          </div>
          <p>{t.guidePillar3Desc}</p>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm">
            {t.guidePillar3Formula}
          </div>
        </section>

        {/* Seção 5: Pilar 4 - Insumos e Acabamento */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-blue-700 font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h2>{t.guidePillar4Title}</h2>
          </div>
          <p>{t.guidePillar4Desc}</p>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm">
            {t.guidePillar4Formula}
          </div>
        </section>

        {/* Seção 6: Formação do Preço de Venda */}
        <section className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/70 border border-blue-200">
          <div className="flex items-center gap-2.5 text-blue-950 font-bold text-lg sm:text-xl">
            <DollarSign className="w-5 h-5 text-blue-600 shrink-0" />
            <h2>{language === 'en' ? 'Pillar 5: Commercial Selling Price and Margins' : language === 'es' ? 'Pilar 5: Del Coste al Precio de Venta Comercial' : 'Pilar 5: Do Custo de Fabricação ao Preço de Venda Comercial'}</h2>
          </div>
          <p className="text-blue-900/90">
            {language === 'en'
              ? 'Our calculator yields your internal factory cost. To price commercially: add setup/cad time + failure buffer (5-15%) + net profit margin (50-200%) + marketplace fees.'
              : language === 'es'
              ? 'Nuestra calculadora calcula tu coste fabril interno. Para fijar el precio de venta: añade tiempo de CAD + margen de fallos (5-15%) + margen de beneficio (50-200%) + comisiones de venta online.'
              : 'A Calculadora de Impressão 3D entrega o Custo Fabril Total. Para precificar comercialmente, adicione: horas de modelagem/fatiamento + margem para falhas (5% a 15%) + sua margem líquida (50% a 200%) + taxas de marketplace.'}
          </p>
        </section>

        {/* Chamada para Ação */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'en' ? 'Ready to calculate?' : language === 'es' ? '¿Listo para calcular?' : 'Pronto para colocar em prática?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'en'
                ? 'Use our free interactive calculator to compute exact costs in seconds.'
                : language === 'es'
                ? 'Utiliza nuestra calculadora interactiva gratuita para calcular costes en segundos.'
                : 'Utilize nossa calculadora interativa gratuita para obter o custo exato em segundos.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToCalculator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all cursor-pointer min-h-[44px] touch-manipulation"
          >
            <Calculator className="w-4 h-4" />
            <span>{t.openCalculatorBtn}</span>
          </button>
        </div>
      </article>
    </div>
  );
};
