// This file configures the initialization of Sentry for edge functions.
// The config you add here will be used whenever an edge function is invoked.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || '',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,
  
  // Disable Sentry in development
  enabled: process.env.NODE_ENV === 'production',
  
  // Only send errors from production
  environment: process.env.NODE_ENV,
});