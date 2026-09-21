import React, { useEffect, useRef } from 'react';

interface AdSenseUnitProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  layout?: string;
  layoutKey?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
  layout,
  layoutKey,
  label = 'Publicidade',
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushed = useRef(false);

  // Lê o Publisher ID da variável de ambiente ou fallback de configuração
  const clientId =
    (import.meta.env.VITE_ADSENSE_CLIENT_ID as string) ||
    'ca-pub-0000000000000000';

  const isConfigured =
    clientId &&
    clientId !== 'ca-pub-0000000000000000' &&
    !clientId.includes('XXXX');

  useEffect(() => {
    if (isConfigured && adRef.current && !isPushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      } catch (e) {
        console.warn('AdSense push error (aguardando aprovação/credencial):', e);
      }
    }
  }, [isConfigured]);

  return (
    <div
      className={`my-6 flex flex-col items-center justify-center w-full overflow-hidden ${className}`}
      aria-label="Espaço publicitário"
    >
      {/* Rótulo de conformidade estrita das políticas do Google AdSense */}
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1.5 self-center select-none">
        {label}
      </span>

      {isConfigured ? (
        <div className="w-full bg-slate-50/50 rounded-xl overflow-hidden min-h-[90px] flex items-center justify-center border border-slate-100">
          <ins
            ref={adRef}
            className="adsbygoogle block w-full"
            style={{ display: 'block' }}
            data-ad-client={clientId}
            data-ad-slot={slotId || ''}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
            {...(layout ? { 'data-ad-layout': layout } : {})}
            {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
          />
        </div>
      ) : (
        /* Bloco pré-configurado pronto para o Google AdSense (Aguardando credenciais do usuário) */
        <div
          className="w-full bg-gradient-to-r from-slate-50 via-slate-100/70 to-slate-50 border border-dashed border-slate-300/80 rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center gap-1.5 transition-all"
          style={{ minHeight: '90px' }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Espaço para Google AdSense</span>
            {slotId && (
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600">
                Slot: {slotId}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 max-w-md leading-relaxed">
            Área reservada e formatada para exibição de anúncios responsivos. O bloco será ativado automaticamente ao inserir seu ID do AdSense no arquivo <code className="font-mono bg-slate-200/60 px-1 py-0.5 rounded text-slate-700">.env</code>.
          </p>
        </div>
      )}
    </div>
  );
};
