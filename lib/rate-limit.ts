import { LRUCache } from 'lru-cache';

type Options = {
  interval: number; // milliseconds
  limit: number; // max requests per interval
  uniqueTokenPerInterval?: number; // max unique tokens per interval
};

export function rateLimit(options: Options) {
  const tokenCache = new LRUCache<string, number>({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval,
  });

  return {
    check: (token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) || 0) + 1;
        
        // Update token count
        tokenCache.set(token, tokenCount);
        
        // Check if token count exceeds limit
        if (tokenCount > options.limit) {
          return reject(new Error('Rate limit exceeded'));
        }
        
        return resolve();
      }),
  };
}