import React from 'react';
import { Layers, HelpCircle, Sparkles } from 'lucide-react';
import { PrintConfig } from '../types';
import { NumericInput } from './NumericInput';

interface PrintSectionProps {
  config: PrintConfig;
  onChange: (updated: Partial<PrintConfig>) => void;
}

const COMMON_FILAMENT_TYPES = ['PLA', 'PETG', 'ABS', 'TPU', 'ASA', 'PVA / Suporte', 'Nylon', 'Resina Standard'];

export const PrintSection: React.FC<PrintSectionProps> = ({ config, onChange }) => {
  return (
    <div
      id="card-etapa-filamento"
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6 transition-all"
    >
      <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
                Etapa 2
              </span>
              <h2 className="text-base font-bold text-slate-800">Filamento e impressão</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Copie o tempo e o peso informados pelo fatiador da sua impressora
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Nome do projeto e tipo de filamento */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 flex flex-col gap-1.5" id="container-project-name">
            <label htmlFor="project-name" className="text-xs font-semibold text-slate-700">
              Nome da peça ou projeto
            </label>
            <input
              id="project-name"
              type="text"
              placeholder="Ex: Suporte de Headset, Vaso Espiral, Chaveiro..."
              value={config.projectName}
              onChange={(e) => onChange({ projectName: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5" id="container-filament-type">
            <label htmlFor="filament-type" className="text-xs font-semibold text-slate-700">
              Tipo de material / filamento
            </label>
            <div className="relative">
              <input
                id="filament-type"
                type="text"
                list="filament-suggestions"
                placeholder="Ex: PLA"
                value={config.filamentType}
                onChange={(e) => onChange({ filamentType: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
              />
              <datalist id="filament-suggestions">
                {COMMON_FILAMENT_TYPES.map((type) => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {/* Custo do rolo e peso líquido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumericInput
            id="input-spool-price"
            label="Preço pago pelo rolo de filamento"
            prefix="R$"
            placeholder="Ex: 95,00"
            value={config.spoolPrice}
            onChange={(val) => onChange({ spoolPrice: val })}
            helpText="Valor total que você pagou no carretel (incluindo eventual frete rateado). Geralmente carretéis padrão de PLA ou PETG variam entre R$ 80 e R$ 140."
            required
          />

          <NumericInput
            id="input-spool-weight"
            label="Peso líquido do filamento no rolo"
            suffix="gramas (g)"
            placeholder="1000"
            value={config.spoolNetWeightGrams}
            onChange={(val) => onChange({ spoolNetWeightGrams: val })}
            helpText="Peso apenas do plástico (descontando o carretel vazio). O padrão mais comum de mercado é 1.000 g (1 kg). Alguns fabricantes vendem bobinas de 500 g ou 250 g."
            required
          />
        </div>

        {/* Guia visual para iniciantes sobre fatiador */}
        <div
          id="slicer-guidance-box"
          className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900 leading-relaxed"
        >
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-blue-950">
              Copie o tempo e gramas diretamente do fatiador (Bambu Studio, Cura, PrusaSlicer, OrcaSlicer):
            </span>
            <p className="mt-0.5 text-blue-800/90">
              As <strong>gramas totais</strong> devem incluir a peça + suportes + purga/torre de limpeza.
              Tempo e material informados correspondem à <strong>impressão inteira na mesa</strong>, que será dividida
              igualmente pela quantidade de peças.
            </p>
          </div>
        </div>

        {/* Consumo da impressão atual */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumericInput
            id="input-used-grams"
            label="Filamento total da impressão"
            suffix="gramas (g)"
            placeholder="Ex: 120"
            value={config.usedFilamentGrams}
            onChange={(val) => onChange({ usedFilamentGrams: val })}
            helpText="Quantidade total de gramas prevista pelo fatiador para rodar essa mesa inteira (incluindo suportes, saias e purga)."
            required
          />

          {/* Duração dividida em Horas e Minutos */}
          <div className="flex flex-col gap-1.5" id="container-duration-inputs">
            <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Tempo total de impressão *</span>
              <span className="text-[11px] text-slate-400 font-normal">horas e minutos</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <input
                  id="input-duration-hours"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={config.durationHours}
                  onChange={(e) => onChange({ durationHours: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
                <span className="absolute right-2.5 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">
                  h
                </span>
              </div>
              <div className="relative">
                <input
                  id="input-duration-minutes"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={config.durationMinutes}
                  onChange={(e) => onChange({ durationMinutes: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-10 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
                <span className="absolute right-2.5 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">
                  min
                </span>
              </div>
            </div>
          </div>

          <NumericInput
            id="input-piece-count"
            label="Peças iguais nesta impressão"
            suffix="peça(s)"
            placeholder="1"
            value={config.pieceCount}
            onChange={(val) => {
              // Somente inteiros positivos
              const clean = val.replace(/\D/g, '');
              onChange({ pieceCount: clean });
            }}
            helpText="Se você colocou mais de uma peça idêntica para imprimir junta na mesma mesa, o custo de energia, máquina e filamento será dividido proporcionalmente."
            required
          />
        </div>
      </div>
    </div>
  );
};
