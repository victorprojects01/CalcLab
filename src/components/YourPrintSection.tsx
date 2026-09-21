import React from 'react';
import { Layers, Info } from 'lucide-react';
import { PrintConfig } from '../types';
import { NumericInput } from './NumericInput';
import { IconFilamento } from './icons/CalcLabIcons';

interface YourPrintSectionProps {
  config: PrintConfig;
  onChange: (updated: Partial<PrintConfig>) => void;
}

export const YourPrintSection: React.FC<YourPrintSectionProps> = ({
  config,
  onChange,
}) => {
  return (
    <section
      id="bloco-sua-impressao"
      className="bg-white rounded-2xl border-2 border-blue-500/80 shadow-md ring-4 ring-blue-500/10 p-5 md:p-6 transition-all relative overflow-hidden"
      aria-labelledby="heading-sua-impressao"
    >
      {/* Faixa decorativa no topo indicando bloco prioritário */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

      {/* Cabeçalho do Bloco 1 com maior destaque visual */}
      <div className="flex items-center justify-between gap-3 mb-5 border-b border-blue-100/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center p-1.5 shadow-sm shadow-blue-600/10 shrink-0">
            <IconFilamento className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider bg-blue-100/90 px-2.5 py-0.5 rounded-md border border-blue-200">
                Bloco Principal de Preenchimento
              </span>
            </div>
            <h2 id="heading-sua-impressao" className="text-lg md:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Sua impressão
            </h2>
            <p className="text-xs text-slate-600">
              Preencha o tempo e o filamento indicados pelo seu fatiador para calcular o custo exato
            </p>
          </div>
        </div>
      </div>

      {/* Caixa de orientação explícita para iniciantes */}
      <div
        id="ajuda-fatiador"
        className="mb-5 p-3.5 rounded-xl bg-blue-50 border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-950 leading-relaxed shadow-2xs"
      >
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-900">
            Copie o tempo e o consumo de filamento exibidos no seu fatiador (Cura, Bambu Studio, PrusaSlicer, Orca).
          </p>
          <p className="text-blue-800/90 mt-0.5">
            Tempo e gramas correspondem à <strong>impressão inteira na mesa</strong> (incluindo suportes e purga). A quantidade
            abaixo serve para dividir o custo total igualmente entre as peças idênticas do mesmo lote.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Nome da peça (opcional) */}
        <div className="flex flex-col gap-1.5" id="container-project-name">
          <div className="flex items-center justify-between">
            <label htmlFor="project-name" className="text-xs font-semibold text-slate-800">
              Nome da peça ou projeto
            </label>
            <span className="text-[11px] text-slate-400">Opcional</span>
          </div>
          <input
            id="project-name"
            type="text"
            placeholder="Ex: Chaveiro Articulado, Vaso Espiral, Suporte..."
            value={config.projectName}
            onChange={(e) => onChange({ projectName: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white min-h-[44px] py-2.5 px-3.5 text-sm text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition-all hover:border-slate-400 shadow-2xs"
          />
        </div>

        {/* Linha com Tempo de impressão e Filamento */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Tempo de impressão: horas e minutos lado a lado com rótulos claros */}
          <div className="sm:col-span-7 flex flex-col gap-1.5" id="container-tempo-impressao">
            <label className="text-xs font-semibold text-slate-800 flex items-center gap-1">
              <span>Tempo de impressão</span>
              <span className="text-blue-600 font-bold">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="relative flex items-center">
                <input
                  id="input-duration-hours"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={config.durationHours}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    onChange({ durationHours: clean });
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white min-h-[44px] py-2.5 pl-3.5 pr-14 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 hover:border-slate-400 transition-all shadow-2xs"
                  aria-label="Horas de impressão"
                />
                <span className="absolute right-3 text-slate-500 text-xs font-semibold pointer-events-none bg-slate-100/90 px-1.5 py-0.5 rounded border border-slate-200">
                  horas
                </span>
              </div>

              <div className="relative flex items-center">
                <input
                  id="input-duration-minutes"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={config.durationMinutes}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    onChange({ durationMinutes: clean });
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white min-h-[44px] py-2.5 pl-3.5 pr-14 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 hover:border-slate-400 transition-all shadow-2xs"
                  aria-label="Minutos de impressão"
                />
                <span className="absolute right-3 text-slate-500 text-xs font-semibold pointer-events-none bg-slate-100/90 px-1.5 py-0.5 rounded border border-slate-200">
                  min
                </span>
              </div>
            </div>
          </div>

          {/* Filamento utilizado em gramas */}
          <div className="sm:col-span-5">
            <NumericInput
              id="input-used-grams"
              label="Filamento utilizado"
              suffix="gramas (g)"
              placeholder="Ex: 85"
              value={config.usedFilamentGrams}
              onChange={(val) => onChange({ usedFilamentGrams: val })}
              helpText="Peso total de plástico indicado no fatiador para a mesa inteira (já com suportes e saias)."
              required
            />
          </div>
        </div>

        {/* Quantidade de peças iguais */}
        <div className="pt-1">
          <div className="max-w-xs">
            <NumericInput
              id="input-piece-count"
              label="Quantidade de peças iguais"
              suffix="peça(s)"
              placeholder="1"
              value={config.pieceCount}
              onChange={(val) => {
                const clean = val.replace(/\D/g, '');
                onChange({ pieceCount: clean });
              }}
              inputMode="numeric"
              helpText="Se você colocou 1, 3 ou 5 peças idênticas para imprimir juntas na mesa, informe aqui para que o custo de energia, máquina e filamento seja rateado igualmente."
              required
            />
          </div>
        </div>
      </div>
    </section>
  );
};
