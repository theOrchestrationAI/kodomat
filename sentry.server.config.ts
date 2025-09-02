// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || '',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,
  
  // Enable performance monitoring
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/slavkokernel\.vercel\.app/],
    }),
  ],
  
  // Disable Sentry in development
  enabled: process.env.NODE_ENV === 'production',
  
  // Only send errors from production
  environment: process.env.NODE_ENV,
});