import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, SupportedLanguage } from '../i18n/LanguageContext';
import { trackEvent } from '../utils/analytics';

const LANGUAGE_OPTIONS: Array<{
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  flag: string;
  currency: string;
}> = [
  { code: 'pt', label: 'Português', nativeName: 'Português (Brasil)', flag: '🇧🇷', currency: 'BRL (R$)' },
  { code: 'en', label: 'English', nativeName: 'English (US/Global)', flag: '🇺🇸', currency: 'USD ($)' },
  { code: 'es', label: 'Español', nativeName: 'Español (España/Latam)', flag: '🇪🇸', currency: 'EUR (€)' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
    trackEvent('change_language', {
      selected_language: code,
    });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        id="btn-language-selector"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Selecionar idioma e moeda"
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/80 rounded-xl transition-colors border border-slate-200/80 min-h-[38px] cursor-pointer"
      >
        <span className="text-base leading-none" role="img" aria-hidden="true">
          {currentOption.flag}
        </span>
        <span className="font-bold">{currentOption.code.toUpperCase()}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="btn-language-selector"
          className="absolute right-0 mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Idioma & Moeda</span>
          </div>

          <div className="py-1 space-y-0.5">
            {LANGUAGE_OPTIONS.map((option) => {
              const isSelected = option.code === language;
              return (
                <button
                  key={option.code}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelect(option.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base" role="img" aria-hidden="true">
                      {option.flag}
                    </span>
                    <div>
                      <span className="block leading-tight">{option.label}</span>
                      <span className="text-[10px] text-slate-400 block">{option.currency}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
