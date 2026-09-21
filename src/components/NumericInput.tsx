import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface NumericInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  helpText?: string;
  required?: boolean;
  min?: number;
  inputMode?: 'decimal' | 'numeric' | 'text';
  error?: string;
  optionalLabel?: string;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  helpText,
  required,
  inputMode = 'decimal',
  error,
  optionalLabel,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="flex flex-col gap-1.5" id={`container-${id}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold text-slate-700 tracking-wide flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-blue-600 font-bold" title="Campo obrigatório">*</span>}
          {optionalLabel && <span className="text-[11px] font-normal text-slate-400">({optionalLabel})</span>}
        </label>
        {helpText && (
          <button
            type="button"
            id={`btn-help-${id}`}
            onClick={() => setShowHelp(!showHelp)}
            className="text-slate-400 hover:text-blue-600 p-1 -mr-1 rounded-full transition-colors flex items-center justify-center min-w-[28px] min-h-[28px]"
            title="Ver explicação deste campo"
            aria-label={`Ajuda para ${label}`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {showHelp && helpText && (
        <div
          id={`help-box-${id}`}
          className="p-3 rounded-xl bg-blue-50/90 border border-blue-100 text-xs text-blue-950 leading-relaxed transition-all"
        >
          {helpText}
        </div>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-slate-500 text-sm font-semibold pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode={inputMode}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-slate-50/60 focus:bg-white min-h-[44px] py-2.5 text-sm text-slate-900 font-medium transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 ${
            prefix ? 'pl-9' : 'pl-3.5'
          } ${suffix ? 'pr-16' : 'pr-3.5'} ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-300 hover:border-slate-400'
          }`}
        />
        {suffix && (
          <span className="absolute right-3 text-slate-500 text-xs font-semibold pointer-events-none select-none bg-slate-50/80 px-1.5 py-0.5 rounded border border-slate-100">
            {suffix}
          </span>
        )}
      </div>

      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};
