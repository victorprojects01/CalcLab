import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Printer,
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
import { calculatePrintCost, formatCurrency } from './utils/calculator';
import { YourPrintSection } from './components/YourPrintSection';
import { PrinterAndFilamentSection } from './components/PrinterAndFilamentSection';
import { AccessoriesSection } from './components/AccessoriesSection';
import { PricingSection } from './components/PricingSection';
import { ResultCard } from './components/ResultCard';
import { AdSenseUnit } from './components/AdSenseUnit';
import { CookieConsent } from './components/CookieConsent';
import { LegalModal, LegalTabType } from './components/LegalModal';
import { GuidePage } from './pages/GuidePage';
import { FAQPage } from './pages/FAQPage';
import { CalcLabLogo } from './components/icons/CalcLabIcons';

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
  // Se o usuário já tiver configurações válidas salvas anteriormente, inicia recolhido
  const [isConfigExpanded, setIsConfigExpanded] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG_COLLAPSED);
      if (saved !== null) {
        return saved === 'false'; // se estava recolhido, isConfigExpanded é false
      }
    } catch {
      // ignore
    }
    return false; // por padrão inicia em modo resumo compacto para focar na nova impressão
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

  // Navegação entre páginas separadas (Calculadora, Guia Completo, FAQ)
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
    if (page === 'calculadora') {
      if (window.location.hash) {
        try {
          window.history.pushState(null, '', window.location.pathname);
        } catch {
          window.location.hash = '';
        }
      }
    } else if (page === 'guia') {
      window.location.hash = '#guia-completo';
    } else if (page === 'faq') {
      window.location.hash = '#perguntas-frequentes';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('guia')) {
        setCurrentPage('guia');
      } else if (hash.includes('faq')) {
        setCurrentPage('faq');
      } else {
        setCurrentPage('calculadora');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Estado do tutorial didático com exemplo prático
  const [isTutorialActive, setIsTutorialActive] = useState(false);

  // Estados institucionais e de conformidade com Google AdSense e LGPD
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTabType>('privacidade');

  const handleOpenLegal = (tab: LegalTabType) => {
    setLegalTab(tab);
    setIsLegalOpen(true);
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

  // Novo cálculo: limpa campos da peça atual preservando a impressora, tarifa e filamento
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
  };

  // Tutorial guiado com exemplo prático didático:
  // Mostra na prática como tempo, filamento, energia, acessórios, frete e margem compõem o preço de venda.
  const handleLoadValidationExample = () => {
    setPrinterConfig({
      selectedPrinterId: 'custom',
      customBrand: 'Impressora de Demonstração',
      customModel: '100W de Consumo',
      averagePowerWatts: '100',
      printerPurchasePrice: '3000',
      lifespanHours: '6000',
      energyTariffPerKwh: '1',
    });

    setPrintConfig({
      projectName: 'Lote de 5 Chaveiros Articulados',
      filamentType: 'PLA',
      spoolPrice: '100',
      spoolNetWeightGrams: '1000',
      usedFilamentGrams: '100',
      durationHours: '4',
      durationMinutes: '0',
      pieceCount: '5',
    });

    setAccessories([
      {
        id: 'acc-argolas-teste',
        name: 'Argola de chaveiro com corrente',
        mode: 'package',
        unit: 'un',
        packagePrice: '20',
        packageQuantity: '100',
        quantityPerPiece: '1',
        directCostPerPiece: '',
      },
    ]);

    setPricingConfig({
      shippingCost: '15',
      shippingMode: 'total',
      profitMarginPercent: '100',
    });

    setIsTutorialActive(true);
  };

  // Cálculo reativo automático
  const calculationResult = useMemo(() => {
    return calculatePrintCost(printerConfig, printConfig, accessories, pricingConfig);
  }, [printerConfig, printConfig, accessories, pricingConfig]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900 pb-28 lg:pb-12">
      {/* Topo com Marca CalcLab Oficial, Título, Subtítulo e Navegação de Páginas */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo CalcLab Oficial com Ação de Voltar para a Home/Calculadora */}
          <button
            type="button"
            onClick={() => handleNavigate('calculadora')}
            className="flex items-center text-left cursor-pointer group focus:outline-none transition-transform active:scale-[0.99]"
            title="CalcLab - Calculadora de Impressão 3D"
          >
            <CalcLabLogo size="md" showSubtitle={true} />
          </button>

          {/* Abas Principais de Navegação entre Páginas */}
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
              <span>Calculadora</span>
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
              <span className="hidden sm:inline">Guia Completo</span>
              <span className="sm:hidden">Guia</span>
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
              <span>FAQ</span>
            </button>

            {/* Ajustes da Impressora */}
            <button
              type="button"
              id="btn-header-ajustes-impressora"
              onClick={handleOpenConfigFromHeader}
              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors min-h-[40px] touch-manipulation"
              title="Acessar dados da impressora, consumo e tarifa"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Ajustes</span>
            </button>

            {/* Tutorial com exemplo prático didático */}
            <button
              type="button"
              id="btn-header-exemplo"
              onClick={handleLoadValidationExample}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/80 rounded-xl transition-colors min-h-[40px] touch-manipulation"
              title="Carregar tutorial com um exemplo prático passo a passo"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden lg:inline">Tutorial prático</span>
              <span className="lg:hidden">Tutorial</span>
            </button>
          </nav>
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
        <>
          {/* Bloco de Anúncio Google AdSense: Topo / Leaderboard Horizontal */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
            <AdSenseUnit
              slotId={import.meta.env.VITE_ADSENSE_SLOT_TOP || 'adsense-topo-leaderboard'}
              format="horizontal"
              label="Publicidade • Google AdSense"
            />
          </div>

          {/* Conteúdo Principal em Grid Responsivo da Calculadora */}
          <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 sm:pt-4" id="main-content">
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
                      Tutorial: Exemplo prático demonstrativo carregado
                    </p>
                    <p className="text-blue-800/90 mt-0.5 leading-relaxed">
                      Preenchemos a simulação com um lote de <strong>5 chaveiros</strong> (tempo de <strong>4h</strong> e <strong>100g de filamento PLA</strong>) em uma impressora com potência média de 100W e argolas de acabamento. Veja ao lado como todas as variáveis de máquina, energia e material se combinam para formar o custo por peça.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTutorialActive(false)}
                  className="text-blue-700 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-100 min-w-[32px] min-h-[32px] flex items-center justify-center shrink-0"
                  title="Fechar aviso do tutorial"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Coluna Esquerda: Os 3 Blocos de Entrada */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Sua impressão (bloco principal com maior destaque) */}
                <YourPrintSection
                  config={printConfig}
                  onChange={handleUpdatePrint}
                />

                {/* 2. Impressora e filamento (recolhível com resumo compacto) */}
                <PrinterAndFilamentSection
                  printerConfig={printerConfig}
                  printConfig={printConfig}
                  onPrinterChange={handleUpdatePrinter}
                  onPrintChange={handleUpdatePrint}
                  isExpanded={isConfigExpanded}
                  onToggleExpand={handleToggleConfig}
                />

                {/* 3. Acabamento e acessórios (opcional, inicialmente recolhido) */}
                <AccessoriesSection
                  items={accessories}
                  savedTemplates={savedTemplates}
                  onUpdateItems={setAccessories}
                  onSaveTemplate={handleSaveTemplate}
                  onDeleteTemplate={handleDeleteTemplate}
                />

                {/* 4. Preço de venda, frete e margem de lucro (último bloco) */}
                <PricingSection
                  config={pricingConfig}
                  onChange={setPricingConfig}
                  result={calculationResult}
                />

                {/* No celular: Exibe o card de resultado completo após os 4 blocos */}
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

              {/* Coluna Direita (Desktop): Card de Resultado fixo acompanhando a rolagem */}
              <div className="hidden lg:block lg:col-span-5 sticky top-24 self-start space-y-6">
                <ResultCard
                  result={calculationResult}
                  printer={printerConfig}
                  print={printConfig}
                  onResetForNewCalculation={handleResetForNewCalculation}
                  onLoadTutorialExample={handleLoadValidationExample}
                />

                {/* Espaço Publicitário Responsivo na Barra Lateral */}
                <AdSenseUnit
                  slotId={import.meta.env.VITE_ADSENSE_SLOT_INLINE || 'adsense-sidebar-retangulo'}
                  format="rectangle"
                  label="Anúncio"
                />
              </div>
            </div>

            {/* Bloco de Anúncio Intermediário */}
            <div className="mt-8">
              <AdSenseUnit
                slotId={import.meta.env.VITE_ADSENSE_SLOT_FOOTER || 'adsense-banner-meio'}
                format="auto"
                label="Publicidade"
              />
            </div>
          </main>
        </>
      )}

      {/* Barra Compacta Inferior Fixa no Celular - Só na calculadora e quando os dados estiverem preenchidos */}
      {currentPage === 'calculadora' && calculationResult.isComplete && (
        <div
          id="barra-inferior-mobile"
          className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg lg:hidden flex items-center justify-between gap-3"
        >
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              {calculationResult.hasPricingCalculated ? 'Preço de Venda / Custo' : 'Custo por peça'}
            </span>
            <div className="flex items-baseline gap-1.5">
              {calculationResult.hasPricingCalculated ? (
                <>
                  <span className="text-xl font-black text-emerald-600 tracking-tight">
                    {formatCurrency(calculationResult.finalSalePricePerPiece)}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium line-through">
                    {formatCurrency(calculationResult.unitCost)}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xl font-black text-blue-600 tracking-tight">
                    {formatCurrency(calculationResult.unitCost)}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    (Lote: {formatCurrency(calculationResult.printBatchTotal)})
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            id="btn-ver-resultado-mobile"
            onClick={handleScrollToMobileResult}
            className={`px-4 py-2 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 min-h-[44px] transition-colors ${
              calculationResult.hasPricingCalculated
                ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            <span>Ver resultado</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Rodapé Institucional Completo e Conforme com Políticas do Google AdSense */}
      <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Coluna 1: Marca & Missão */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <CalcLabLogo size="sm" showSubtitle={false} />
              </div>
              <p className="text-slate-500 leading-relaxed text-xs max-w-sm">
                <strong>CalcLab</strong>: Quanto custa sua impressão 3D? Ferramenta desenvolvida para auxiliar entusiastas, makers e empreendedores a calcularem com rigor o custo fabril exato e o preço de venda de peças produzidas por impressão 3D FDM.
              </p>
              <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  Dados 100% Locais (LocalStorage)
                </span>
                <span>•</span>
                <span>Sem Cadastro Obrigatório</span>
              </div>
            </div>

            {/* Coluna 2: Páginas do Site */}
            <div className="md:col-span-3 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Páginas & Conteúdo
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('calculadora')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5 text-slate-400" />
                    <span>Calculadora de Custos 3D</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('guia')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Guia Completo de Custos & Precificação</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('faq')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Perguntas Frequentes (FAQ)</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Navegação Institucional & Políticas (Exigência do AdSense) */}
            <div className="md:col-span-3 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Políticas & Transparência
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('privacidade')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>Política de Privacidade (Cookies)</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('termos')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Termos de Uso do Serviço</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('sobre')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sobre Nós & Metodologia</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('isencao')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Isenção de Responsabilidade</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Coluna 4: Contato & Suporte */}
            <div className="md:col-span-2 space-y-2.5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Contato & Suporte
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('contato')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Fale Conosco</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('privacidade')}
                    className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-500"
                  >
                    <Cookie className="w-3.5 h-3.5 text-slate-400" />
                    <span>Preferências de Cookies</span>
                  </button>
                </li>
              </ul>

              <div className="pt-2">
                <p className="text-[11px] text-slate-400 leading-snug">
                  Em conformidade com a LGPD e o regulamento de editores do Google AdSense.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>
              © {new Date().getFullYear()} CalcLab. Todos os direitos reservados.
            </p>
            <p className="text-center sm:text-right">
              Este site exibe anúncios certificados pelo Google AdSense e utiliza cookies para personalização.
            </p>
          </div>
        </div>
      </footer>

      {/* Banner de Consentimento de Cookies em Conformidade com LGPD e Google AdSense */}
      <CookieConsent onOpenPrivacyPolicy={() => handleOpenLegal('privacidade')} />

      {/* Modal Institucional (Privacidade, Termos, Sobre, Contato, Isenção) */}
      <LegalModal
        isOpen={isLegalOpen}
        initialTab={legalTab}
        onClose={() => setIsLegalOpen(false)}
      />
    </div>
  );
}
