import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

export const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="perguntas-frequentes"
      className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 mt-6 text-slate-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.faqSubtitle}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {t.faqList.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/50 overflow-hidden transition-colors hover:border-slate-300"
            >
              <button
                type="button"
                id={`btn-faq-${index}`}
                onClick={() => toggleAccordion(index)}
                className="w-full py-4 px-5 text-left font-semibold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-slate-100/80"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
