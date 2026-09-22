import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  Search,
  Zap,
  Layers,
  Cpu,
  DollarSign,
  Calculator,
  Sparkles,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface FAQPageProps {
  onNavigateToCalculator: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigateToCalculator }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true });

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    trackEvent('toggle_faq_item', {
      faq_index: index,
    });
  };

  const categories = useMemo(() => [
    { id: 'todos', label: language === 'en' ? 'All' : language === 'es' ? 'Todas' : 'Todas as Perguntas', icon: HelpCircle },
    { id: 'filamento', label: language === 'en' ? 'Filament & Slicer' : language === 'es' ? 'Filamento y Laminador' : 'Filamento & Fatiador', icon: Layers },
    { id: 'energia', label: language === 'en' ? 'Electricity' : language === 'es' ? 'Energía Eléctrica' : 'Energia Elétrica', icon: Zap },
    { id: 'maquina', label: language === 'en' ? 'Printer & Wear' : language === 'es' ? 'Máquina y Desgaste' : 'Máquina & Desgaste', icon: Cpu },
    { id: 'precificacao', label: language === 'en' ? 'Selling Price' : language === 'es' ? 'Precio de Venta' : 'Preço de Venda', icon: DollarSign },
  ], [language]);

  const filteredFaqs = useMemo(() => {
    return t.faqList.map((faq, index) => ({
      ...faq,
      originalIndex: index,
      category: index === 0 ? 'energia' : index === 1 ? 'energia' : index === 2 ? 'maquina' : index === 3 ? 'filamento' : 'precificacao',
    })).filter((item) => {
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [t.faqList, selectedCategory, searchQuery]);

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

        <span className="text-xs text-slate-500 font-medium">
          {filteredFaqs.length} {language === 'en' ? 'questions found' : language === 'es' ? 'preguntas encontradas' : 'dúvidas catalogadas'}
        </span>
      </div>

      {/* Cabeçalho */}
      <header className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{t.faqBadge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.faqTitle}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {t.faqSubtitle}
        </p>
      </header>

      {/* Barra de Busca Rápida */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            id="input-busca-faq"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.faqSearchPlaceholder}
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-2xs text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Filtros de Categorias */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              id={`btn-faq-categoria-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer min-h-[38px] ${
                isActive
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Lista de FAQs */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = !!openItems[faq.originalIndex];
          return (
            <div
              key={faq.originalIndex}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all hover:border-slate-300"
            >
              <button
                type="button"
                id={`btn-faq-item-${faq.originalIndex}`}
                onClick={() => toggleItem(faq.originalIndex)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base cursor-pointer focus:outline-none focus:bg-slate-50/80"
                aria-expanded={isOpen}
              >
                <span className="leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                  <p className="mt-2">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Banner de Chamada para a Calculadora */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {language === 'en' ? 'Want to calculate your 3D print right now?' : language === 'es' ? '¿Quieres calcular tu impresión ahora?' : 'Quer simular o custo da sua impressão agora?'}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              {language === 'en' ? 'Free tool with real-time math.' : language === 'es' ? 'Herramienta gratuita y precisa.' : 'Preencha o peso e tempo da sua peça para obter o orçamento na hora.'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onNavigateToCalculator}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer min-h-[42px]"
        >
          <Calculator className="w-4 h-4" />
          <span>{t.openCalculatorBtn}</span>
        </button>
      </div>
    </div>
  );
};
