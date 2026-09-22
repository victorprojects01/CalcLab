import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { updateGtagConsent } from '../utils/analytics';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface CookieConsentProps {
  onOpenPrivacyPolicy: () => void;
}

const STORAGE_KEY_CONSENT = 'calc3d_cookie_consent_status_v1';

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacyPolicy }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY_CONSENT);
      if (!consent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        updateGtagConsent(consent === 'accepted');
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY_CONSENT, 'accepted');
    } catch {
      // ignore
    }
    updateGtagConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY_CONSENT, 'essential_only');
    } catch {
      // ignore
    }
    updateGtagConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.cookieTitle}
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-xl p-4 sm:p-5 transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>{t.cookieTitle}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </h3>
            <button
              type="button"
              onClick={handleDecline}
              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 rounded-lg cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-600 mt-1.5 leading-relaxed">
            {t.cookieDesc}
          </p>

          <div className="mt-3 flex items-center gap-2 pt-1">
            <button
              type="button"
              id="btn-aceitar-cookies"
              onClick={handleAccept}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-2xs transition-colors min-h-[38px] flex-1 cursor-pointer"
            >
              {t.cookieAcceptAll}
            </button>

            <button
              type="button"
              id="btn-recusar-cookies"
              onClick={handleDecline}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors min-h-[38px] cursor-pointer"
            >
              {t.cookieEssentialOnly}
            </button>
          </div>

          <div className="mt-2 text-center">
            <button
              type="button"
              onClick={onOpenPrivacyPolicy}
              className="text-[10px] text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer"
            >
              {t.cookieReadPrivacy}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
