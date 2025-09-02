import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Dohvati trenutni odgovor
  const response = NextResponse.next();

  // Dodaj sigurnosne headere
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Ako je produkcija, dodaj CSP header
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://*.sentry.io; img-src 'self' data: https://www.google-analytics.com https://placehold.co https://images.unsplash.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; frame-src 'self'; object-src 'none';"
    );
  }

  return response;
}

// Konfiguriraj na kojim putanjama će middleware biti aktivan
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icons/ (PWA icons)
     * - images/ (static images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icons/|images/).*)',
  ],
};