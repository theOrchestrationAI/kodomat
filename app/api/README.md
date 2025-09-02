# SlavkoKernel API

This directory contains the API endpoints for the SlavkoKernel application.

## Available Endpoints

### `/api/leads`

Handles lead capture from the website.

- **Method**: POST
- **Body**:
  ```typescript
  {
    email: string;       // Required
    source?: string;     // Optional
    name?: string;       // Optional
    company?: string;    // Optional
    referrer?: string;   // Optional
  }
  ```
- **Response**:
  ```typescript
  {
    success: boolean;
    message?: string;
    error?: string;
  }
  ```

#### Production Implementation

The production-ready implementation (`production-ready-route.ts`) includes:

- Email validation using Zod
- Rate limiting to prevent abuse
- Structured logging
- Error handling
- Integration points for various databases and CRMs

To use the production version:
1. Install dependencies: `npm install zod lru-cache`
2. Rename `production-ready-route.ts` to `route.ts`
3. Configure your database/CRM integration
4. Set environment variables for logging and rate limiting

### `/api/analysis`

Provides code analysis functionality.

- **Method**: POST
- **Body**:
  ```typescript
  {
    code: string;        // Required
    language?: string;   // Optional, defaults to 'javascript'
  }
  ```
- **Response**:
  ```typescript
  {
    success: boolean;
    analysis?: {
      score: number;
      metrics: {
        readability: number;
        maintainability: number;
        performance: number;
        security: number;
      };
      suggestions: string[];
      analysisTime: string;
      codeLength: number;
    };
    error?: string;
  }
  ```

## Utility Libraries

### Rate Limiting (`/lib/rate-limit.ts`)

Provides IP-based rate limiting to prevent API abuse.

```typescript
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  limit: 5,            // 5 requests per minute
  uniqueTokenPerInterval: 500
});

// Usage
try {
  await limiter.check(ip);
  // Continue processing request
} catch (error) {
  // Return 429 Too Many Requests
}
```

### Logging (`/lib/logger.ts`)

Provides structured logging with different log levels.

```typescript
import { logger } from '@/lib/logger';

// Usage
logger.info('User signed up', { userId: '123' });
logger.error('Failed to process payment', { orderId: '456', error: err.message });
```

## Integration Guide

### Database Integration

The production-ready lead capture endpoint includes commented examples for:
- Firebase Firestore
- PostgreSQL with Prisma
- MongoDB
- HubSpot CRM

To integrate with your preferred database or CRM:
1. Install the required dependencies
2. Set up the client/connection in a separate file
3. Uncomment and configure the relevant integration code
4. Add any necessary environment variables

### Logging Service Integration

To send logs to a service like Sentry:
1. Install the required dependencies: `npm install @sentry/nextjs`
2. Configure Sentry in your Next.js application
3. Uncomment and configure the logging service integration in `lib/logger.ts`

## Environment Variables

- `LOG_LEVEL`: Sets the minimum log level ('debug', 'info', 'warn', 'error')
- `NODE_ENV`: Determines environment-specific behavior