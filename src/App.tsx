import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calculator,
  Sparkles,
  ArrowDown,
  X,
  BookOpen,
  HelpCircle,
  Shield,
  FileText,
  Info,
  Mail,
  AlertTriangle,
  Cookie,
  SlidersHorizontal,
} from 'lucide-react';
import {
  AccessoryItem,
  SavedAccessoryTemplate,
  PrinterConfig,
  PrintConfig,
  PricingConfig,
} from './types';
import { calculatePrintCost } from './utils/calculator';
import { YourPrintSection } from './components/YourPrintSection';
import { PrinterAndFilamentSection } from './components/PrinterAndFilamentSection';
import { AccessoriesSection } from './components/AccessoriesSection';
import { PricingSection } from './components/PricingSection';
import { ResultCard } from './components/ResultCard';
import { CookieConsent } from './components/CookieConsent';
import { LegalModal, LegalTabType } from './components/LegalModal';
import { LanguageSelector } from './components/LanguageSelector';
import { GuidePage } from './pages/GuidePage';
import { FAQPage } from './pages/FAQPage';
import { CalcLabLogo } from './components/icons/CalcLabIcons';
import { trackEvent, trackPageView } from './utils/analytics';
import { useLanguage } from './i18n/LanguageContext';
import { translations } from './i18n/translations';

export type ActivePage = 'calculadora' | 'guia' | 'faq';

const STORAGE_KEY_PRINTER = 'calc3d_printer_config_v2';
const STORAGE_KEY_TEMPLATES = 'calc3d_saved_accessories_v2';
const STORAGE_KEY_PRINT_DEFAULTS = 'calc3d_print_defaults_v2';
const STORAGE_KEY_CONFIG_COLLAPSED = 'calc3d_config_collapsed_v2';
const STORAGE_KEY_PRICING = 'calc3d_pricing_config_v1';

// Valores padrão amigáveis para iniciantes
const DEFAULT_PRINTER: PrinterConfig = {
  selectedPrinterId: 'creality-ender-3-v2',
  customBrand: '',
  customModel: '',
  averagePowerWatts: '120',
  printerPurchasePrice: '1800',
  lifespanHours: '5000',
  energyTariffPerKwh: '0.95',
};

const DEFAULT_PRINT: PrintConfig = {
  projectName: '',
  filamentType: 'PLA',
  spoolPrice: '95',
  spoolNetWeightGrams: '1000',
  usedFilamentGrams: '',
  durationHours: '',
  durationMinutes: '',
  pieceCount: '1',
};

const DEFAULT_PRICING: PricingConfig = {
  shippingCost: '',
  shippingMode: 'total',
  profitMarginPercent: '100',
};

// Templates iniciais de acessórios para microempreendedores
const INITIAL_SAVED_TEMPLATES: SavedAccessoryTemplate[] = [
  {
    id: 'tpl-argola-chaveiro',
    name: 'Argola de chaveiro com corrente',
    mode: 'package',
    unit: 'un',
    packagePrice: '20',
    packageQuantity: '100',
    quantityPerPiece: '1',
    directCostPerPiece: '',
  },
  {
    id: 'tpl-ima-neodimio',
    name: 'Ímã de neodímio 8x2mm',
    mode: 'package',
    unit: 'un',
    packagePrice: '35',
    packageQuantity: '50',
    quantityPerPiece: '2',
    directCostPerPiece: '',
  },
  {
    id: 'tpl-parafuso-m3',
    name: 'Parafuso M3x12mm com porca',
    mode: 'package',
    unit: 'un',
    packagePrice: '25',
    packageQuantity: '100',
    quantityPerPiece: '4',
    directCostPerPiece: '',
  },
  {
    id: 'tpl-cola-instantanea',
    name: 'Cola instantânea (gotas)',
    mode: 'direct',
    unit: 'un',
    packagePrice: '',
    packageQuantity: '',
    quantityPerPiece: '',
    directCostPerPiece: '0.25',
  },
];

export default function App() {
  const { language, formatMoney } = useLanguage();
  const t = translations[language];

  // Sincroniza o título da página com o idioma atual
  useEffect(() => {
    document.title = t.siteTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.siteDescription);
    }
  }, [language, t.siteTitle, t.siteDescription]);

  // Estado 1: Impressora
  const [printerConfig, setPrinterConfig] = useState<PrinterConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRINTER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PRINTER;
  });

  // Estado 2: Filamento e Impressão
  const [printConfig, setPrintConfig] = useState<PrintConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRINT_DEFAULTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PRINT,
          spoolPrice: parsed.spoolPrice || DEFAULT_PRINT.spoolPrice,
          spoolNetWeightGrams: parsed.spoolNetWeightGrams || DEFAULT_PRINT.spoolNetWeightGrams,
          filamentType: parsed.filamentType || DEFAULT_PRINT.filamentType,
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_PRINT;
  });

  // Estado de recolhimento do Bloco 2 (Impressora e filamento)
  const [isConfigExpanded, setIsConfigExpanded] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG_COLLAPSED);
      if (saved !== null) {
        return saved === 'false';
      }
    } catch {
      // ignore
    }
    return false;
  });

  // Estado 3: Acessórios desta impressão
  const [accessories, setAccessories] = useState<AccessoryItem[]>([]);

  // Estado 4: Precificação comercial (Frete e Margem de Lucro)
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRICING);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PRICING;
  });

  // Estado da biblioteca de acessórios salvos
  const [savedTemplates, setSavedTemplates] = useState<SavedAccessoryTemplate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TEMPLATES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SAVED_TEMPLATES;
  });

  // Navegação entre páginas separadas
  const getInitialPage = (): ActivePage => {
    if (typeof window === 'undefined') return 'calculadora';
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('guia')) return 'guia';
    if (hash.includes('faq')) return 'faq';
    return 'calculadora';
  };

  const [currentPage, setCurrentPage] = useState<ActivePage>(getInitialPage);

  const handleNavigate = (page: ActivePage) => {
    setCurrentPage(page);
    let pagePath = '/';
    let pageTitle = t.siteTitle;

    if (page === 'calculadora') {
      if (window.location.hash) {
        try {
          window.history.pushState(null, '', window.location.pathname);
        } catch {
          window.location.hash = '';
        }
      }
      pagePath = '/';
      pageTitle = t.siteTitle;
    } else if (page === 'guia') {
      window.location.hash = '#guia-completo';
      pagePath = '/#guia-completo';
      pageTitle = `${t.navGuide} - CalcLab`;
    } else if (page === 'faq') {
      window.location.hash = '#perguntas-frequentes';
      pagePath = '/#perguntas-frequentes';
      pageTitle = `${t.navFAQ} - CalcLab`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    trackPageView(pagePath, pageTitle);
    trackEvent('navigate_section', {
      section_name: page,
    });

    try {
      if (typeof window !== 'undefined' && 'adsbygoogle' in window) {
        ((window as unknown as { adsbygoogle: Array<Record<string, unknown>> }).adsbygoogle =
          (window as unknown as { adsbygoogle: Array<Record<string, unknown>> }).adsbygoogle || []).push({});
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('guia')) {
        setCurrentPage('guia');
        trackPageView('/#guia-completo', `${t.navGuide} - CalcLab`);
      } else if (hash.includes('faq')) {
        setCurrentPage('faq');
        trackPageView('/#perguntas-frequentes', `${t.navFAQ} - CalcLab`);
      } else {
        setCurrentPage('calculadora');
        trackPageView('/', t.siteTitle);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [t.navGuide, t.navFAQ, t.siteTitle]);

  // Estado do tutorial didático com exemplo prático
  const [isTutorialActive, setIsTutorialActive] = useState(false);

  // Estados institucionais e de conformidade
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTabType>('privacidade');

  const handleOpenLegal = (tab: LegalTabType) => {
    setLegalTab(tab);
    setIsLegalOpen(true);
    trackEvent('open_legal_modal', {
      tab_name: tab,
    });
  };

  const mobileResultRef = useRef<HTMLDivElement>(null);

  // Persistência local no navegador
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRINTER, JSON.stringify(printerConfig));
    } catch {
      // ignore
    }
  }, [printerConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(savedTemplates));
    } catch {
      // ignore
    }
  }, [savedTemplates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRICING, JSON.stringify(pricingConfig));
    } catch {
      // ignore
    }
  }, [pricingConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_PRINT_DEFAULTS,
        JSON.stringify({
          spoolPrice: printConfig.spoolPrice,
          spoolNetWeightGrams: printConfig.spoolNetWeightGrams,
          filamentType: printConfig.filamentType,
        })
      );
    } catch {
      // ignore
    }
  }, [printConfig.spoolPrice, printConfig.spoolNetWeightGrams, printConfig.filamentType]);

  const handleToggleConfig = () => {
    setIsConfigExpanded((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY_CONFIG_COLLAPSED, String(!next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleOpenConfigFromHeader = () => {
    if (currentPage !== 'calculadora') {
      handleNavigate('calculadora');
    }
    setIsConfigExpanded(true);
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG_COLLAPSED, 'false');
    } catch {
      // ignore
    }
    setTimeout(() => {
      const element = document.getElementById('bloco-impressora-filamento');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const handleScrollToMobileResult = () => {
    if (mobileResultRef.current) {
      mobileResultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleUpdatePrinter = (updated: Partial<PrinterConfig>) => {
    setPrinterConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdatePrint = (updated: Partial<PrintConfig>) => {
    setPrintConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleSaveTemplate = (template: SavedAccessoryTemplate) => {
    setSavedTemplates((prev) => {
      const exists = prev.some((t) => t.name.toLowerCase() === template.name.toLowerCase());
      if (exists) {
        return prev.map((t) => (t.name.toLowerCase() === template.name.toLowerCase() ? template : t));
      }
      return [template, ...prev];
    });
  };

  const handleDeleteTemplate = (templateId: string) => {
    setSavedTemplates((prev) => prev.filter((t) => t.id !== templateId));
  };

  const handleResetForNewCalculation = () => {
    setPrintConfig((prev) => ({
      ...prev,
      projectName: '',
      usedFilamentGrams: '',
      durationHours: '',
      durationMinutes: '',
      pieceCount: '1',
    }));
    setAccessories([]);
    setPricingConfig((prev) => ({
      ...prev,
      shippingCost: '',
    }));
    setIsTutorialActive(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('reset_calculation');
  };

  const handleLoadValidationExample = () => {
    trackEvent('load_tutorial_example');
    setPrinterConfig({
      selectedPrinterId: 'custom',
      customBrand: language === 'en' ? 'Demo 3D Printer' : language === 'es' ? 'Impresora Demo' : 'Impressora de Demonstração',
      customModel: '100W avg',
      averagePowerWatts: '100',
      printerPurchasePrice: '350',
      lifespanHours: '5000',
      energyTariffPerKwh: '0.15',
    });

    setPrintConfig({
      projectName: language === 'en' ? 'Batch of 5 Articulated Keychains' : language === 'es' ? 'Lote de 5 Llaveros Articulados' : 'Lote de 5 Chaveiros Articulados',
      filamentType: 'PLA',
      spoolPrice: '20',
      spoolNetWeightGrams: '1000',
      usedFilamentGrams: '100',
      durationHours: '4',
      durationMinutes: '0',
      pieceCount: '5',
    });

    setAccessories([
      {
        id: 'acc-argolas-teste',
        name: language === 'en' ? 'Keyring with chain' : language === 'es' ? 'Anilla de llavero con cadena' : 'Argola de chaveiro com corrente',
        mode: 'package',
        unit: 'un',
        packagePrice: '5',
        packageQuantity: '50',
        quantityPerPiece: '1',
        directCostPerPiece: '',
      },
    ]);

    setPricingConfig({
      shippingCost: '5',
      shippingMode: 'total',
      profitMarginPercent: '100',
    });

    setIsTutorialActive(true);
  };

  const calculationResult = useMemo(() => {
    return calculatePrintCost(printerConfig, printConfig, accessories, pricingConfig);
  }, [printerConfig, printConfig, accessories, pricingConfig]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 pb-28 lg:pb-12">
      {/* Topo com Marca CalcLab Oficial, Navegação e Seletor de Idioma */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo CalcLab */}
          <button
            type="button"
            onClick={() => handleNavigate('calculadora')}
            className="flex items-center text-left cursor-pointer group focus:outline-none transition-transform active:scale-[0.99]"
            title="CalcLab 3D"
          >
            <CalcLabLogo size="md" showSubtitle={true} />
          </button>

          {/* Abas Principais de Navegação e Seletor de Idioma */}
          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Navegação Principal">
              <button
                type="button"
                id="nav-tab-calculadora"
                onClick={() => handleNavigate('calculadora')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all min-h-[40px] touch-manipulation cursor-pointer ${
                  currentPage === 'calculadora'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{t.navCalculator}</span>
              </button>

              <button
                type="button"
                id="nav-tab-guia"
                onClick={() => handleNavigate('guia')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all min-h-[40px] touch-manipulation cursor-pointer ${
                  currentPage === 'guia'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.navGuide}</span>
                <span className="sm:hidden">{language === 'en' ? 'Guide' : language === 'es' ? 'Guía' : 'Guia'}</span>
              </button>

              <button
                type="button"
                id="nav-tab-faq"
                onClick={() => handleNavigate('faq')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all min-h-[40px] touch-manipulation cursor-pointer ${
                  currentPage === 'faq'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.navFAQ}</span>
              </button>

              {/* Ajustes da Impressora */}
              <button
                type="button"
                id="btn-header-ajustes-impressora"
                onClick={handleOpenConfigFromHeader}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors min-h-[40px] touch-manipulation cursor-pointer"
                title="Ajustes de máquina"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">{t.navSettings}</span>
              </button>

              {/* Tutorial didático */}
              <button
                type="button"
                id="btn-header-exemplo"
                onClick={handleLoadValidationExample}
                className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/80 rounded-xl transition-colors min-h-[40px] touch-manipulation cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.tutorialBtn}</span>
              </button>
            </nav>

            {/* Seletor Global de Idioma (PT / EN / ES) com detecção automática */}
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* RENDERIZAÇÃO CONDICIONAL POR PÁGINA */}
      {currentPage === 'guia' && (
        <main id="main-content">
          <GuidePage onNavigateToCalculator={() => handleNavigate('calculadora')} />
        </main>
      )}

      {currentPage === 'faq' && (
        <main id="main-content">
          <FAQPage onNavigateToCalculator={() => handleNavigate('calculadora')} />
        </main>
      )}

      {currentPage === 'calculadora' && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6" id="main-content">
          {/* Cabeçalho Principal da Calculadora */}
          <div className="mb-6 space-y-1.5 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Banner didático quando o tutorial está ativo */}
          {isTutorialActive && (
            <div
              id="banner-tutorial-ativo"
              className="mb-6 p-4 rounded-2xl bg-blue-50/90 border border-blue-200/90 text-xs text-blue-950 flex items-start justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-blue-900">
                    {t.tutorialBannerTitle}
                  </p>
                  <p className="text-blue-800/90 mt-0.5 leading-relaxed">
                    {t.tutorialBannerDesc}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTutorialActive(false)}
                className="text-blue-700 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-100 min-w-[32px] min-h-[32px] flex items-center justify-center shrink-0 cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Coluna Esquerda: Blocos de Entrada */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Sua impressão */}
              <YourPrintSection
                config={printConfig}
                onChange={handleUpdatePrint}
              />

              {/* 2. Impressora e filamento */}
              <PrinterAndFilamentSection
                printerConfig={printerConfig}
                printConfig={printConfig}
                onPrinterChange={handleUpdatePrinter}
                onPrintChange={handleUpdatePrint}
                isExpanded={isConfigExpanded}
                onToggleExpand={handleToggleConfig}
              />

              {/* 3. Acabamento e acessórios */}
              <AccessoriesSection
                items={accessories}
                savedTemplates={savedTemplates}
                onUpdateItems={setAccessories}
                onSaveTemplate={handleSaveTemplate}
                onDeleteTemplate={handleDeleteTemplate}
              />

              {/* 4. Preço de venda, frete e margem de lucro */}
              <PricingSection
                config={pricingConfig}
                onChange={setPricingConfig}
                result={calculationResult}
              />

              {/* No celular: Exibe o card de resultado após os 4 blocos */}
              <div className="lg:hidden pt-2" ref={mobileResultRef} id="card-resultado-mobile">
                <ResultCard
                  result={calculationResult}
                  printer={printerConfig}
                  print={printConfig}
                  onResetForNewCalculation={handleResetForNewCalculation}
                  onLoadTutorialExample={handleLoadValidationExample}
                />
              </div>
            </div>

            {/* Coluna Direita (Desktop): Card de Resultado fixo */}
            <div className="hidden lg:block lg:col-span-5 sticky top-24 self-start space-y-6">
              <ResultCard
                result={calculationResult}
                printer={printerConfig}
                print={printConfig}
                onResetForNewCalculation={handleResetForNewCalculation}
                onLoadTutorialExample={handleLoadValidationExample}
              />
            </div>
          </div>

          {/* Seção Explicativa SEO */}
          <section
            id="seo-metodologia-calculo"
            aria-labelledby="heading-metodologia-calculo"
            className="mt-12 pt-8 border-t border-slate-200/80 space-y-6 text-slate-700"
          >
            <div className="text-center sm:text-left space-y-2">
              <h2 id="heading-metodologia-calculo" className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                {t.pillarsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                {t.pillarsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">1</span>
                  {t.pillar1Badge}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{t.pillar1Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.pillar1Desc}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-[10px]">2</span>
                  {t.pillar2Badge}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{t.pillar2Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.pillar2Desc}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">3</span>
                  {t.pillar3Badge}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{t.pillar3Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.pillar3Desc}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">4</span>
                  {t.pillar4Badge}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{t.pillar4Title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.pillar4Desc}
                </p>
              </div>
            </div>

            {/* Botões de Acesso aos Conteúdos Didáticos */}
            <div className="bg-blue-50/80 border border-blue-200/90 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-blue-950 text-center sm:text-left space-y-0.5">
                <p className="font-bold text-blue-900">{t.deepenKnowledgeTitle}</p>
                <p className="text-blue-800/90">{t.deepenKnowledgeDesc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleNavigate('guia')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl transition-all shadow-2xs cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.navGuide}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate('faq')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t.navFAQ}</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Barra Compacta Inferior Fixa no Celular */}
      {currentPage === 'calculadora' && calculationResult.isComplete && (
        <div
          id="barra-inferior-mobile"
          className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg lg:hidden flex items-center justify-between gap-3"
        >
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              {calculationResult.hasPricingCalculated ? t.resultSalePriceLabel : t.resultUnitCostLabel}
            </span>
            <div className="flex items-baseline gap-1.5">
              {calculationResult.hasPricingCalculated ? (
                <>
                  <span className="text-xl font-black text-emerald-600 tracking-tight">
                    {formatMoney(calculationResult.finalSalePricePerPiece)}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium line-through">
                    {formatMoney(calculationResult.unitCost)}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xl font-black text-blue-600 tracking-tight">
                    {formatMoney(calculationResult.unitCost)}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ({formatMoney(calculationResult.printBatchTotal)})
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            id="btn-ver-resultado-mobile"
            onClick={handleScrollToMobileResult}
            className={`px-4 py-2 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 min-h-[44px] transition-colors cursor-pointer ${
              calculationResult.hasPricingCalculated
                ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            <span>{t.viewResultMobileBtn}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Rodapé Institucional */}
      <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Coluna 1: Marca & Missão */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <CalcLabLogo size="sm" showSubtitle={false} />
              </div>
              <p className="text-slate-500 leading-relaxed text-xs max-w-sm">
                <strong>CalcLab</strong>: {t.footerMission}
              </p>
              <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  {t.footerLocalData}
                </span>
                <span>•</span>
                <span>{t.footerNoSignup}</span>
              </div>
            </div>

            {/* Coluna 2: Páginas do Site */}
            <div className="md:col-span-3 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                {t.footerPagesTitle}
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('calculadora')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.navCalculator}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('guia')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.navGuide}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('faq')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.navFAQ}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Navegação Institucional & Políticas */}
            <div className="md:col-span-3 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                {t.footerPoliciesTitle}
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('privacidade')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.footerPrivacy}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('termos')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.footerTerms}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('sobre')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.footerAbout}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('isencao')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.footerDisclaimer}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Coluna 4: Contato & Suporte */}
            <div className="md:col-span-2 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                {t.footerContactTitle}
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('contato')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.footerContact}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('privacidade')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-500 cursor-pointer"
                  >
                    <Cookie className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.footerCookiePreferences}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>
              © {new Date().getFullYear()} CalcLab. {t.footerRightsReserved}
            </p>
            <p className="text-center sm:text-right">
              {t.footerComplianceNotice}
            </p>
          </div>
        </div>
      </footer>

      {/* Banner de Consentimento de Cookies */}
      <CookieConsent onOpenPrivacyPolicy={() => handleOpenLegal('privacidade')} />

      {/* Modal Institucional */}
      <LegalModal
        isOpen={isLegalOpen}
        initialTab={legalTab}
        onClose={() => setIsLegalOpen(false)}
      />
    </div>
  );
}
