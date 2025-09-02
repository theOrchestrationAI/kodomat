import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Pokušaj dohvatiti verziju iz package.json
    let version = '1.0.0';
    try {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(packageJsonContent);
      version = packageJson.version || '1.0.0';
    } catch (error) {
      console.error('Error reading package.json:', error);
    }

    // Informacije o verziji
    const versionInfo = {
      version,
      buildTime: process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString(),
      commitHash: process.env.NEXT_PUBLIC_COMMIT_HASH || 'unknown',
      environment: process.env.NODE_ENV,
      nodeVersion: process.version,
    };

    // Vrati uspješan odgovor
    return NextResponse.json(versionInfo, { status: 200 });
  } catch (error) {
    // Logiraj grešku i vrati error odgovor
    console.error('Version check failed:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve version information' },
      { status: 500 }
    );
  }
}