// Utility za praćenje analitike

import { config } from './config';

// Tipovi događaja
export enum EventType {
  PAGE_VIEW = 'page_view',
  BUTTON_CLICK = 'button_click',
  FORM_SUBMIT = 'form_submit',
  LEAD_CAPTURE = 'lead_capture',
  CODE_ANALYSIS = 'code_analysis',
  ERROR = 'error',
  FEATURE_USAGE = 'feature_usage',
}

// Sučelje za događaj
interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
}

// Provjeri je li analitika omogućena
const isAnalyticsEnabled = () => {
  if (typeof window === 'undefined') return false;
  if (config.env.isTest) return false;
  if (!config.env.isProduction && !config.analytics.enabledInDev) return false;
  return config.features.analytics;
};

// Inicijaliziraj Google Analytics
const initGoogleAnalytics = () => {
  if (!config.analytics.googleAnalyticsId) return;
  
  // Dodaj Google Analytics skriptu
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}`;
  script.async = true;
  document.head.appendChild(script);
  
  // Inicijaliziraj gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', config.analytics.googleAnalyticsId);
};

// Pošalji događaj u Google Analytics
const sendToGoogleAnalytics = (event: AnalyticsEvent) => {
  if (!config.analytics.googleAnalyticsId || typeof window === 'undefined') return;
  
  // Provjeri postoji li gtag funkcija
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics nije inicijaliziran');
    return;
  }
  
  // Pošalji događaj
  window.gtag('event', event.eventName, event.properties);
};

// Prati događaj
export const trackEvent = (eventType: EventType, eventName: string, properties?: Record<string, any>) => {
  if (!isAnalyticsEnabled()) return;
  
  const event: AnalyticsEvent = {
    eventName,
    properties: {
      event_category: eventType,
      ...properties,
    },
  };
  
  // Pošalji u Google Analytics
  sendToGoogleAnalytics(event);
  
  // Ovdje možeš dodati i druge analitičke servise
  // npr. Mixpanel, Amplitude, itd.
};

// Prati učitavanje stranice
export const trackPageView = (url: string) => {
  trackEvent(EventType.PAGE_VIEW, 'page_view', { page_path: url });
};

// Prati klik na gumb
export const trackButtonClick = (buttonName: string, properties?: Record<string, any>) => {
  trackEvent(EventType.BUTTON_CLICK, 'button_click', { button_name: buttonName, ...properties });
};

// Prati slanje forme
export const trackFormSubmit = (formName: string, properties?: Record<string, any>) => {
  trackEvent(EventType.FORM_SUBMIT, 'form_submit', { form_name: formName, ...properties });
};

// Prati hvatanje leada
export const trackLeadCapture = (source: string, properties?: Record<string, any>) => {
  trackEvent(EventType.LEAD_CAPTURE, 'lead_capture', { source, ...properties });
};

// Prati analizu koda
export const trackCodeAnalysis = (language: string, codeLength: number, properties?: Record<string, any>) => {
  trackEvent(EventType.CODE_ANALYSIS, 'code_analysis', { language, code_length: codeLength, ...properties });
};

// Prati grešku
export const trackError = (errorType: string, errorMessage: string, properties?: Record<string, any>) => {
  trackEvent(EventType.ERROR, 'error', { error_type: errorType, error_message: errorMessage, ...properties });
};

// Inicijalizacija analitike
export const initAnalytics = () => {
  if (isAnalyticsEnabled() && typeof window !== 'undefined') {
    // Inicijaliziraj Google Analytics
    if (config.analytics.googleAnalyticsId) {
      initGoogleAnalytics();
    }
    
    // Ovdje možeš inicijalizirati i druge analitičke servise
  }
};

// Dodaj tipove za window objekt
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default {
  trackEvent,
  trackPageView,
  trackButtonClick,
  trackFormSubmit,
  trackLeadCapture,
  trackCodeAnalysis,
  trackError,
  initAnalytics,
};