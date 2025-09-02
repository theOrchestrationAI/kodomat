// Konfiguracija aplikacije
// Ova datoteka centralizira sve konfiguracijske postavke

// Osnovne informacije o aplikaciji
export const APP_NAME = 'SlavkoKernel';
export const APP_DESCRIPTION = 'AI-powered code analysis and suggestions for developers';
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';

// URL-ovi
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Značajke
export const FEATURES = {
  analytics: process.env.NODE_ENV === 'production',
  authentication: true,
  codeAnalysis: true,
  leadCapture: true,
};

// Postavke API-ja
export const API_CONFIG = {
  timeout: 10000, // 10 sekundi
  retries: 3,
  rateLimit: {
    windowMs: 60 * 1000, // 1 minuta
    max: 100, // limit svaki IP na 100 zahtjeva po windowMs
  },
};

// Postavke autentikacije
export const AUTH_CONFIG = {
  providers: ['google', 'github', 'email'],
  sessionDuration: 60 * 60 * 24 * 7, // 7 dana
};

// Postavke analitike
export const ANALYTICS_CONFIG = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  enabledInDev: false,
};

// Postavke za različita okruženja
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

// Eksportiraj sve postavke kao jedan objekt
export const config = {
  app: {
    name: APP_NAME,
    description: APP_DESCRIPTION,
    version: APP_VERSION,
  },
  urls: {
    api: API_URL,
    site: SITE_URL,
  },
  features: FEATURES,
  api: API_CONFIG,
  auth: AUTH_CONFIG,
  analytics: ANALYTICS_CONFIG,
  env: ENV_CONFIG,
};

export default config;