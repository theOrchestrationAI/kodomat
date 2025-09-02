import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Provjeri osnovne funkcionalnosti
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      uptime: process.uptime(),
    };

    // Provjeri Firebase konekciju ako je konfiguriran
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      try {
        // Samo provjeri je li varijabla postavljena, ne pokušavaj stvarnu konekciju
        // jer bi to zahtijevalo import Firebase modula
        healthStatus['firebase'] = 'configured';
      } catch (error) {
        healthStatus['firebase'] = 'error';
      }
    }

    // Vrati uspješan odgovor
    return NextResponse.json(healthStatus, { status: 200 });
  } catch (error) {
    // Logiraj grešku i vrati error odgovor
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'unhealthy', error: 'Internal server error' },
      { status: 500 }
    );
  }
}