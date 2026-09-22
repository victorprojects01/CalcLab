import React, { useState, useMemo } from 'react';
import {
  Printer,
  Zap,
  Disc,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  BookOpen,
} from 'lucide-react';
import { PRINTER_CATALOG } from '../data/printers';
import { PrinterConfig, PrintConfig } from '../types';
import { NumericInput } from './NumericInput';
import {
  IconImpressora3D,
  IconEnergia,
  IconFilamento,
} from './icons/CalcLabIcons';
import { trackEvent } from '../utils/analytics';

interface PrinterAndFilamentSectionProps {
  printerConfig: PrinterConfig;
  printConfig: PrintConfig;
  onPrinterChange: (updated: Partial<PrinterConfig>) => void;
  onPrintChange: (updated: Partial<PrintConfig>) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const PrinterAndFilamentSection: React.FC<PrinterAndFilamentSectionProps> = ({
  printerConfig,
  printConfig,
  onPrinterChange,
  onPrintChange,
  isExpanded,
  onToggleExpand,
}) => {
  const [showReferenceModal, setShowReferenceModal] = useState(false);

  // Encontra a impressora selecionada no catálogo
  const selectedCatalogItem = useMemo(() => {
    return PRINTER_CATALOG.find((p) => p.id === printerConfig.selectedPrinterId) || null;
  }, [printerConfig.selectedPrinterId]);

  // Identifica a origem do consumo
  const powerSourceType = useMemo(() => {
    if (printerConfig.selectedPrinterId === 'custom') {
      return 'custom';
    }
    if (selectedCatalogItem && selectedCatalogItem.averagePowerWatts !== null) {
      // Se o usuário alterou o valor para algo diferente do catálogo, é personalizado
      if (String(selectedCatalogItem.averagePowerWatts) === printerConfig.averagePowerWatts.trim()) {
        return 'catalog';
      }
      return 'custom_override';
    }
    return 'manual';
  }, [printerConfig.selectedPrinterId, selectedCatalogItem, printerConfig.averagePowerWatts]);

  const handleSelectPrinter = (printerId: string) => {
    if (printerId === 'custom') {
      onPrinterChange({
        selectedPrinterId: 'custom',
        customBrand: printerConfig.customBrand || '',
        customModel: printerConfig.customModel || '',
      });
      trackEvent('select_printer_model', {
        printer_id: 'custom',
        printer_name: 'Customizada',
      });
      return;
    }

    const item = PRINTER_CATALOG.find((p) => p.id === printerId);
    if (item) {
      onPrinterChange({
        selectedPrinterId: item.id,
        customBrand: item.brand,
        customModel: item.model,
        averagePowerWatts: item.averagePowerWatts !== null ? String(item.averagePowerWatts) : '',
      });
      trackEvent('select_printer_model', {
        printer_id: item.id,
        printer_name: `${item.brand} ${item.model}`,
      });
    }
  };

  const getPrinterDisplayName = () => {
    if (printerConfig.selectedPrinterId === 'custom') {
      const b = printerConfig.customBrand.trim();
      const m = printerConfig.customModel.trim();
      return b || m ? `${b} ${m}`.trim() : 'Impressora Personalizada';
    }
    if (selectedCatalogItem) {
      return `${selectedCatalogItem.brand} ${selectedCatalogItem.model}`;
    }
    return 'Impressora não selecionada';
  };

  return (
    <section
      id="bloco-impressora-filamento"
      className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm transition-all overflow-hidden"
      aria-labelledby="heading-impressora-filamento"
    >
      {/* Cabeçalho do Bloco */}
      <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-1.5 shrink-0">
            <IconImpressora3D className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                Bloco 2
              </span>
              <h2 id="heading-impressora-filamento" className="text-base md:text-lg font-bold text-slate-900">
                Impressora e filamento
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Custos operacionais fixos que ficam salvos para os próximos cálculos
            </p>
          </div>
        </div>

        {/* Botão de alternar expansão */}
        <button
          type="button"
          id="btn-toggle-config-block"
          onClick={onToggleExpand}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-50 rounded-xl transition-colors min-h-[44px] touch-manipulation"
          aria-expanded={isExpanded}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{isExpanded ? 'Recolher' : 'Editar configurações'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4 ml-0.5" /> : <ChevronDown className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      {/* Visão resumida compacta quando recolhido */}
      {!isExpanded && (
        <div id="resumo-compacto-config" className="p-4 md:p-5 bg-slate-50/70 text-xs text-slate-700 flex flex-wrap items-center gap-2.5">
          <span className="font-semibold text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
            <IconImpressora3D className="w-4 h-4" />
            {getPrinterDisplayName()}
          </span>

          <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
            <IconEnergia className="w-4 h-4" />
            <span>{printerConfig.averagePowerWatts ? `${printerConfig.averagePowerWatts} W` : 'Potência não informada'}</span>
            {powerSourceType === 'catalog' && (
              <span className="text-[10px] text-blue-700 bg-blue-50 font-medium px-1.5 py-0.5 rounded">
                Ref. catálogo
              </span>
            )}
          </span>

          <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs">
            Energia: <strong className="text-slate-900">R$ {printerConfig.energyTariffPerKwh || '0,00'}/kWh</strong>
          </span>

          <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center gap-1.5">
            <IconFilamento className="w-4 h-4" />
            <span>
              {printConfig.filamentType}: <strong className="text-slate-900">R$ {printConfig.spoolPrice || '0,00'}</strong> / {printConfig.spoolNetWeightGrams || '1000'}g
            </span>
          </span>
        </div>
      )}

      {/* Conteúdo completo quando expandido */}
      {isExpanded && (
        <div className="p-5 md:p-6 space-y-6">
          {/* Grupo 1: Impressora */}
          <div className="space-y-4" id="grupo-equipamento">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <IconImpressora3D className="w-5 h-5 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                1. Equipamento e consumo
              </h3>
            </div>

            {/* Seletor de impressora */}
            <div className="flex flex-col gap-1.5" id="container-select-printer">
              <label htmlFor="printer-select-main" className="text-xs font-semibold text-slate-700">
                Marca e modelo da impressora
              </label>
              <select
                id="printer-select-main"
                value={printerConfig.selectedPrinterId}
                onChange={(e) => handleSelectPrinter(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white min-h-[44px] py-2.5 px-3.5 text-sm text-slate-800 font-medium hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition-colors shadow-2xs"
              >
                <option value="" disabled>
                  Selecione sua impressora...
                </option>
                <optgroup label="Modelos Populares Verificados">
                  {PRINTER_CATALOG.filter((p) => p.averagePowerWatts !== null).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} {p.model} ({p.averagePowerWatts}W médio)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Outros Modelos Cadastrados">
                  {PRINTER_CATALOG.filter((p) => p.averagePowerWatts === null).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} {p.model} (Sem referência de consumo)
                    </option>
                  ))}
                </optgroup>
                <option value="custom">Outra / Personalizada</option>
              </select>
            </div>

            {/* Campos se for personalizada */}
            {printerConfig.selectedPrinterId === 'custom' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex flex-col gap-1">
                  <label htmlFor="custom-brand-input" className="text-xs font-semibold text-slate-700">
                    Marca da máquina
                  </label>
                  <input
                    id="custom-brand-input"
                    type="text"
                    placeholder="Ex: Voron, Flsun, Two Trees..."
                    value={printerConfig.customBrand}
                    onChange={(e) => onPrinterChange({ customBrand: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white min-h-[44px] py-2 px-3 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 shadow-2xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="custom-model-input" className="text-xs font-semibold text-slate-700">
                    Modelo
                  </label>
                  <input
                    id="custom-model-input"
                    type="text"
                    placeholder="Ex: 2.4, V400, CoreXY..."
                    value={printerConfig.customModel}
                    onChange={(e) => onPrinterChange({ customModel: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-white min-h-[44px] py-2 px-3 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 shadow-2xs"
                  />
                </div>
              </div>
            )}

            {/* Linha da Potência com Identificação da Origem e Botão "Ver referência" */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="input-power-watts" className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <span>Potência média em impressão</span>
                    <span className="text-blue-600 font-bold">*</span>
                  </label>
                  {/* Identificação da Origem */}
                  {powerSourceType === 'catalog' && (
                    <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Ref. de catálogo
                    </span>
                  )}
                  {powerSourceType === 'custom_override' && (
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Valor personalizado
                    </span>
                  )}
                  {powerSourceType === 'custom' && (
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Personalizado
                    </span>
                  )}
                </div>

                <div className="relative flex items-center">
                  <input
                    id="input-power-watts"
                    type="text"
                    inputMode="decimal"
                    placeholder="Ex: 120"
                    value={printerConfig.averagePowerWatts}
                    onChange={(e) => onPrinterChange({ averagePowerWatts: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white min-h-[44px] py-2.5 pl-3.5 pr-16 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 hover:border-slate-300"
                  />
                  <span className="absolute right-3 text-slate-500 text-xs font-semibold pointer-events-none bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                    Watts
                  </span>
                </div>

                {/* Acesso a "Ver referência" ou alerta de ausência de teste */}
                {selectedCatalogItem && selectedCatalogItem.averagePowerWatts !== null ? (
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[11px] text-slate-500">
                      Consumo verificado: {selectedCatalogItem.averagePowerWatts}W
                    </span>
                    <button
                      type="button"
                      id="btn-ver-referencia"
                      onClick={() => setShowReferenceModal(true)}
                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline min-h-[28px] p-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      Ver referência
                    </button>
                  </div>
                ) : selectedCatalogItem && selectedCatalogItem.averagePowerWatts === null ? (
                  <p className="text-[11px] text-amber-700 bg-amber-50/80 p-2 rounded-lg border border-amber-200">
                    Consumo de cruzeiro não disponível para este modelo. Insira a potência medida ou estimada (geralmente entre 100W e 150W para PLA).
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400">
                    Consumo elétrico real com mesa e bico aquecidos.
                  </p>
                )}
              </div>

              {/* Depreciação da máquina: Preço e Vida Útil */}
              <div className="space-y-4">
                <NumericInput
                  id="input-printer-price"
                  label="Preço pago pela impressora"
                  prefix="R$"
                  placeholder="Ex: 2200,00"
                  value={printerConfig.printerPurchasePrice}
                  onChange={(val) => onPrinterChange({ printerPurchasePrice: val })}
                  helpText="Valor investido na impressora. O cálculo de depreciação distribui esse montante pelas horas estimadas de uso."
                  required
                />

                <NumericInput
                  id="input-lifespan-hours"
                  label="Vida útil estimada em horas"
                  suffix="horas"
                  placeholder="Ex: 5000"
                  value={printerConfig.lifespanHours}
                  onChange={(val) => onPrinterChange({ lifespanHours: val })}
                  helpText="Distribui o valor da sua impressora pelas horas de uso. Não é garantia de fábrica, mas um critério financeiro (típico: 3.000 a 6.000 horas)."
                  required
                />
              </div>
            </div>
          </div>

          {/* Grupo 2: Custos de Energia */}
          <div className="space-y-4 pt-2" id="grupo-energia">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <IconEnergia className="w-5 h-5" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                2. Tarifa de energia elétrica
              </h3>
            </div>

            <div className="max-w-md">
              <NumericInput
                id="input-energy-tariff"
                label="Tarifa de energia da sua fatura de luz"
                prefix="R$"
                suffix="/ kWh"
                placeholder="Ex: 0,95"
                value={printerConfig.energyTariffPerKwh}
                onChange={(val) => onPrinterChange({ energyTariffPerKwh: val })}
                helpText="Valor do kWh com todos os impostos (ICMS, PIS, COFINS) e bandeiras tarifárias. No Brasil costuma variar entre R$ 0,80 e R$ 1,25 por kWh."
                required
              />
            </div>
          </div>

          {/* Grupo 3: Filamento padrão */}
          <div className="space-y-4 pt-2" id="grupo-filamento">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <IconFilamento className="w-5 h-5" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                3. Filamento padrão
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5" id="container-filament-type">
                <label htmlFor="select-filament-type" className="text-xs font-semibold text-slate-700">
                  Tipo de material
                </label>
                <select
                  id="select-filament-type"
                  value={printConfig.filamentType}
                  onChange={(e) => onPrintChange({ filamentType: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white min-h-[44px] py-2.5 px-3 text-sm text-slate-800 font-medium hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 shadow-2xs"
                >
                  <option value="PLA">PLA</option>
                  <option value="PETG">PETG</option>
                  <option value="ABS">ABS</option>
                  <option value="ASA">ASA</option>
                  <option value="TPU">TPU (Flexível)</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <NumericInput
                id="input-spool-price"
                label="Preço do rolo de filamento"
                prefix="R$"
                placeholder="Ex: 95,00"
                value={printConfig.spoolPrice}
                onChange={(val) => onPrintChange({ spoolPrice: val })}
                helpText="Preço pago no carretel fechado de filamento (incluindo eventual frete rateado)."
                required
              />

              <NumericInput
                id="input-spool-net-weight"
                label="Peso líquido do rolo"
                suffix="gramas (g)"
                placeholder="1000"
                value={printConfig.spoolNetWeightGrams}
                onChange={(val) => onPrintChange({ spoolNetWeightGrams: val })}
                helpText="Peso real do plástico sem o carretel plástico vazio (a maioria dos rolos no mercado contém 1000g / 1kg)."
                required
              />
            </div>
          </div>

          {/* Rodapé do bloco expandido com botão de concluir */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Alterações salvas automaticamente no armazenamento local.
            </p>
            <button
              type="button"
              id="btn-recolher-config"
              onClick={onToggleExpand}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors min-h-[44px]"
            >
              Concluir e recolher
            </button>
          </div>
        </div>
      )}

      {/* Modal de Referência Técnica de Consumo */}
      {showReferenceModal && selectedCatalogItem && (
        <div
          id="modal-referencia-consumo"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-modal-referencia"
        >
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-xl p-6 relative">
            <button
              type="button"
              id="btn-fechar-modal-referencia"
              onClick={() => setShowReferenceModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Fechar janela"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <BookOpen className="w-5 h-5" />
              <h3 id="titulo-modal-referencia" className="text-base font-bold text-slate-900">
                Referência de consumo medida
              </h3>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Detalhes do teste padronizado de potência média para{' '}
              <strong>{selectedCatalogItem.brand} {selectedCatalogItem.model}</strong>.
            </p>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block mb-0.5">Potência média em regime:</span>
                <span className="text-base font-bold text-slate-900">
                  {selectedCatalogItem.averagePowerWatts} Watts
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Fonte da medição:</span>
                <span className="font-semibold text-slate-800">{selectedCatalogItem.referenceSource}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Data / Período:</span>
                <span className="font-medium text-slate-700">{selectedCatalogItem.referenceDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Condições do teste:</span>
                <span className="text-slate-700 leading-relaxed">{selectedCatalogItem.testConditions}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
              O consumo real pode variar conforme a velocidade de impressão, temperatura da mesa e temperatura ambiente. Você pode editar o valor a qualquer momento.
            </p>

            <div className="mt-5 text-right">
              <button
                type="button"
                id="btn-entendi-modal-referencia"
                onClick={() => setShowReferenceModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl min-h-[44px]"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
