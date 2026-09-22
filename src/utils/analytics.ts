/**
 * Utilitário centralizado para Google Analytics 4 (GA4)
 * Measurement ID: G-V50HYR5VND
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-V50HYR5VND';

/**
 * Dispara evento personalizado para o GA4 com segurança contra falhas
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, string | number | boolean | null | undefined> = {}
): void {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // Remove parâmetros nulos/indefinidos
      const cleanParams: Record<string, string | number | boolean> = {};
      for (const [key, value] of Object.entries(eventParams)) {
        if (value !== null && value !== undefined) {
          cleanParams[key] = value;
        }
      }
      window.gtag('event', eventName, cleanParams);
    }
  } catch {
    // Fail-safe silencioso
  }
}

/**
 * Notifica transição de tela / visualização de página SPA
 */
export function trackPageView(pagePath: string, pageTitle: string): void {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle,
        page_location: window.location.href,
        send_to: GA_MEASUREMENT_ID,
      });
    }
  } catch {
    // Fail-safe silencioso
  }
}

/**
 * Atualiza o estado de consentimento do Google Consent Mode v2
 */
export function updateGtagConsent(granted: boolean): void {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const status = granted ? 'granted' : 'denied';
      window.gtag('consent', 'update', {
        analytics_storage: status,
        ad_storage: status,
        ad_user_data: status,
        ad_personalization: status,
      });
    }
  } catch {
    // Fail-safe silencioso
  }
}
