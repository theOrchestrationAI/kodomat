import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    // Osnovne informacije o statusu
    const statusInfo = {
      status: 'operational',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      services: {
        api: 'operational',
        database: 'unknown',
        storage: 'unknown',
        auth: 'unknown',
      },
      request: {
        userAgent,
        ip: headersList.get('x-forwarded-for') || 'unknown',
        protocol: headersList.get('x-forwarded-proto') || 'http',
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };

    // Provjeri Firebase konfiguraciju
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      statusInfo.services.database = 'configured';
      statusInfo.services.storage = 'configured';
      statusInfo.services.auth = 'configured';
    }

    // Vrati uspješan odgovor
    return NextResponse.json(statusInfo, { status: 200 });
  } catch (error) {
    // Logiraj grešku i vrati error odgovor
    console.error('Status check failed:', error);
    return NextResponse.json(
      { 
        status: 'degraded', 
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}