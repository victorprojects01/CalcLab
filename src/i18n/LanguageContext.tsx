import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SupportedLanguage = 'pt' | 'en' | 'es';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
}

export const CURRENCY_CONFIGS: Record<SupportedLanguage, CurrencyConfig> = {
  pt: { code: 'BRL', symbol: 'R$', locale: 'pt-BR' },
  en: { code: 'USD', symbol: '$', locale: 'en-US' },
  es: { code: 'EUR', symbol: '€', locale: 'es-ES' },
};

const STORAGE_KEY_LANG = 'calclab_preferred_language_v1';

/**
 * Detecta o idioma preferencial através do fuso horário, país e configurações do navegador
 */
export function detectUserLanguage(): SupportedLanguage {
  try {
    // 1. Verifica se o usuário já salvou manualmente anteriormente
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (saved === 'pt' || saved === 'en' || saved === 'es') {
      return saved;
    }
  } catch {
    // ignore
  }

  try {
    // 2. Analisa o fuso horário (Intl) para detectar o país/região geográfica
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    
    // Fusos horários brasileiros ou lusófonos
    if (
      timeZone.startsWith('America/Sao_Paulo') ||
      timeZone.startsWith('America/Belem') ||
      timeZone.startsWith('America/Fortaleza') ||
      timeZone.startsWith('America/Recife') ||
      timeZone.startsWith('America/Cuiaba') ||
      timeZone.startsWith('America/Manaus') ||
      timeZone.startsWith('America/Porto_Velho') ||
      timeZone.startsWith('America/Rio_Branco') ||
      timeZone.startsWith('America/Noronha') ||
      timeZone.startsWith('Atlantic/Cape_Verde') ||
      timeZone.startsWith('Africa/Luanda') ||
      timeZone.startsWith('Africa/Maputo') ||
      timeZone.startsWith('Europe/Lisbon')
    ) {
      return 'pt';
    }

    // Fusos horários de países hispanofalantes
    if (
      timeZone.startsWith('Europe/Madrid') ||
      timeZone.startsWith('Atlantic/Canary') ||
      timeZone.startsWith('America/Argentina') ||
      timeZone.startsWith('America/Bogota') ||
      timeZone.startsWith('America/Mexico_City') ||
      timeZone.startsWith('America/Santiago') ||
      timeZone.startsWith('America/Lima') ||
      timeZone.startsWith('America/Caracas') ||
      timeZone.startsWith('America/Montevideo') ||
      timeZone.startsWith('America/Asuncion') ||
      timeZone.startsWith('America/La_Paz') ||
      timeZone.startsWith('America/Guayaquil') ||
      timeZone.startsWith('America/Costa_Rica') ||
      timeZone.startsWith('America/Panama') ||
      timeZone.startsWith('America/Guatemala') ||
      timeZone.startsWith('America/El_Salvador') ||
      timeZone.startsWith('America/Tegucigalpa') ||
      timeZone.startsWith('America/Managua') ||
      timeZone.startsWith('America/Santo_Domingo') ||
      timeZone.startsWith('America/Havana')
    ) {
      return 'es';
    }

    // 3. Analisa o idioma do navegador (navigator.languages / navigator.language)
    if (typeof navigator !== 'undefined') {
      const browserLanguages = navigator.languages || [navigator.language || ''];
      for (const lang of browserLanguages) {
        const lower = lang.toLowerCase();
        if (lower.startsWith('pt')) return 'pt';
        if (lower.startsWith('es')) return 'es';
        if (lower.startsWith('en')) return 'en';
      }
    }
  } catch {
    // fallback seguro
  }

  // Padrão internacional para visitantes de outras regiões
  return 'en';
}

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currency: CurrencyConfig;
  formatMoney: (value: number | null | undefined) => string;
  formatDec: (value: number, decimals?: number) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => detectUserLanguage());

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
      // Atualiza atributo lang na tag html para acessibilidade e SEO
      if (typeof document !== 'undefined') {
        const langMap: Record<SupportedLanguage, string> = {
          pt: 'pt-BR',
          en: 'en-US',
          es: 'es-ES',
        };
        document.documentElement.lang = langMap[lang] || 'en';
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Sincroniza o html lang inicial
    if (typeof document !== 'undefined') {
      const langMap: Record<SupportedLanguage, string> = {
        pt: 'pt-BR',
        en: 'en-US',
        es: 'es-ES',
      };
      document.documentElement.lang = langMap[language] || 'en';
    }
  }, [language]);

  const currency = CURRENCY_CONFIGS[language];

  const formatMoney = (value: number | null | undefined): string => {
    if (value === null || value === undefined || isNaN(value)) {
      return `${currency.symbol} --.--`;
    }
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDec = (value: number, decimals: number = 2): string => {
    return new Intl.NumberFormat(currency.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, formatMoney, formatDec }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
