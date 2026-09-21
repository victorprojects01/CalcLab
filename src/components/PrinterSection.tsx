import React, { useMemo } from 'react';
import { Printer, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PRINTER_CATALOG } from '../data/printers';
import { PrinterConfig } from '../types';
import { NumericInput } from './NumericInput';

interface PrinterSectionProps {
  config: PrinterConfig;
  onChange: (updated: Partial<PrinterConfig>) => void;
}

export const PrinterSection: React.FC<PrinterSectionProps> = ({ config, onChange }) => {
  // Encontra a impressora selecionada no catálogo
  const selectedCatalogItem = useMemo(() => {
    return PRINTER_CATALOG.find((p) => p.id === config.selectedPrinterId) || null;
  }, [config.selectedPrinterId]);

  const handleSelectPrinter = (printerId: string) => {
    if (printerId === 'custom') {
      onChange({
        selectedPrinterId: 'custom',
        customBrand: config.customBrand || '',
        customModel: config.customModel || '',
        // Mantém a potência digitada ou limpa se for personalizada
      });
      return;
    }

    const item = PRINTER_CATALOG.find((p) => p.id === printerId);
    if (item) {
      onChange({
        selectedPrinterId: item.id,
        customBrand: item.brand,
        customModel: item.model,
        // Preenche com a potência média caso haja medição confiável; se null, deixa vazia para preenchimento manual
        averagePowerWatts: item.averagePowerWatts !== null ? String(item.averagePowerWatts) : '',
      });
    }
  };

  return (
    <div
      id="card-etapa-impressora"
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6 transition-all"
    >
      <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
                Etapa 1
              </span>
              <h2 className="text-base font-bold text-slate-800">Minha impressora</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Defina os custos do equipamento e de energia (salvos automaticamente)
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Seletor de modelo no catálogo */}
        <div className="flex flex-col gap-1.5" id="container-printer-select">
          <label htmlFor="printer-select" className="text-xs font-semibold text-slate-700">
            Marca e modelo da impressora
          </label>
          <select
            id="printer-select"
            value={config.selectedPrinterId}
            onChange={(e) => handleSelectPrinter(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm text-slate-800 font-medium hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
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
                  {p.brand} {p.model} (Medição manual necessária)
                </option>
              ))}
            </optgroup>
            <option value="custom">Outra / Personalizada</option>
          </select>
        </div>

        {/* Campos se for personalizada */}
        {config.selectedPrinterId === 'custom' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex flex-col gap-1">
              <label htmlFor="custom-brand" className="text-xs font-semibold text-slate-700">
                Marca
              </label>
              <input
                id="custom-brand"
                type="text"
                placeholder="Ex: Voron, Two Trees, Flsun..."
                value={config.customBrand}
                onChange={(e) => onChange({ customBrand: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="custom-model" className="text-xs font-semibold text-slate-700">
                Modelo
              </label>
              <input
                id="custom-model"
                type="text"
                placeholder="Ex: 2.4, V400, CoreXY..."
                value={config.customModel}
                onChange={(e) => onChange({ customModel: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>
        )}

        {/* Informação sobre a referência de potência média */}
        {selectedCatalogItem && (
          <div
            id="printer-reference-info"
            className={`p-3 rounded-xl border text-xs leading-relaxed ${
              selectedCatalogItem.averagePowerWatts !== null
                ? 'bg-blue-50/70 border-blue-100 text-blue-900'
                : 'bg-amber-50/80 border-amber-200 text-amber-900'
            }`}
          >
            {selectedCatalogItem.averagePowerWatts !== null ? (
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-blue-950">
                    Consumo de referência verificado: {selectedCatalogItem.averagePowerWatts} W
                  </div>
                  <p className="text-blue-800/90 mt-0.5">
                    <strong>Fonte:</strong> {selectedCatalogItem.referenceSource} ({selectedCatalogItem.referenceDate})
                  </p>
                  <p className="text-blue-800/80 mt-0.5">
                    <strong>Condição de teste:</strong> {selectedCatalogItem.testConditions}
                  </p>
                  <p className="text-blue-600 font-medium mt-1">
                    Você pode editar a potência abaixo a qualquer momento se tiver medições próprias.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-950">Consumo médio não disponível</div>
                  <p className="text-amber-800 mt-0.5">
                    Não encontramos um teste de consumo contínuo padronizado para este modelo. Não utilize a potência
                    máxima da fonte (ex: 350W) pois o consumo real de cruzeiro é bem menor (em torno de 100W a 150W para PLA). Preencha o valor abaixo com base na sua medição ou estimativa.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Inputs numéricos da etapa 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumericInput
            id="input-power-watts"
            label="Potência média em impressão"
            suffix="Watts"
            placeholder="Ex: 110"
            value={config.averagePowerWatts}
            onChange={(val) => onChange({ averagePowerWatts: val })}
            helpText="Consumo médio elétrico real durante a impressão contínua (com bico e mesa aquecidos). Não use a potência máxima nominal da fonte nem o pico inicial."
            required
          />

          <NumericInput
            id="input-energy-tariff"
            label="Tarifa de energia da sua região"
            prefix="R$"
            suffix="/ kWh"
            placeholder="Ex: 0,95"
            value={config.energyTariffPerKwh}
            onChange={(val) => onChange({ energyTariffPerKwh: val })}
            helpText="Custo total por quilowatt-hora cobrado na sua fatura de luz (incluindo tributos como ICMS e bandeiras tarifárias). A média no Brasil varia entre R$ 0,80 e R$ 1,20 por kWh."
            required
          />

          <NumericInput
            id="input-printer-price"
            label="Preço pago pela impressora"
            prefix="R$"
            placeholder="Ex: 2500,00"
            value={config.printerPurchasePrice}
            onChange={(val) => onChange({ printerPurchasePrice: val })}
            helpText="Valor total investido na compra da máquina (incluindo frete ou taxas). Será rateado gradativamente ao longo da vida útil estimada da impressora."
            required
          />

          <NumericInput
            id="input-lifespan-hours"
            label="Vida útil estimada de impressão"
            suffix="horas"
            placeholder="Ex: 5000"
            value={config.lifespanHours}
            onChange={(val) => onChange({ lifespanHours: val })}
            helpText="A vida útil é uma hipótese matemática para distribuir o valor da impressora nas horas de uso, considerando valor residual zero. Não é uma garantia de fábrica. Valores típicos adotados variam entre 3.000 e 6.000 horas de trabalho."
            required
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>
            Os dados desta impressora ficam salvos no seu navegador para não precisar preenchê-los novamente.
          </span>
        </div>
      </div>
    </div>
  );
};
