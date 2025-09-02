import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'SlavkoKernel API',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
    endpoints: [
      {
        path: '/api/health',
        description: 'Health check endpoint',
        methods: ['GET']
      },
      {
        path: '/api/status',
        description: 'Detailed status information',
        methods: ['GET']
      },
      {
        path: '/api/leads',
        description: 'Lead capture endpoint',
        methods: ['POST']
      },
      {
        path: '/api/analysis',
        description: 'Code analysis endpoint',
        methods: ['POST']
      }
    ],
    documentation: 'https://github.com/theOrchestrationAI/v0-slavkokernellaunchkit'
  });
}