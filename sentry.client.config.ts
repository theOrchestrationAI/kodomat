// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || '',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
  
  // Enable performance monitoring
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/slavkokernel\.vercel\.app/],
    }),
    new Sentry.Replay(),
  ],
  
  // Disable Sentry in development
  enabled: process.env.NODE_ENV === 'production',
  
  // Only send errors from production
  environment: process.env.NODE_ENV,
});