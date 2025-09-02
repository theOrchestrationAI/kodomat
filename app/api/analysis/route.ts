import { NextResponse } from 'next/server';

// Mock analysis data generator
function generateMockAnalysis(codeSnippet: string) {
  // In production, this would call an actual analysis service or AI model
  const randomScore = Math.floor(Math.random() * 41) + 60; // Random score between 60-100
  
  return {
    score: randomScore,
    metrics: {
      readability: Math.floor(Math.random() * 31) + 70,
      maintainability: Math.floor(Math.random() * 31) + 70,
      performance: Math.floor(Math.random() * 31) + 70,
      security: Math.floor(Math.random() * 31) + 70
    },
    suggestions: [
      "Consider adding more descriptive variable names",
      "Function complexity could be reduced by breaking into smaller functions",
      "Add proper error handling for edge cases"
    ],
    analysisTime: new Date().toISOString(),
    codeLength: codeSnippet.length
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, language = 'javascript' } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Valid code snippet required' }, { status: 400 });
    }

    // Add artificial delay to simulate processing (300-800ms)
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));

    // Generate mock analysis results
    const analysis = generateMockAnalysis(code);
    
    // Log for development purposes
    console.log(`[ANALYSIS] Language: ${language}, Score: ${analysis.score}, Length: ${analysis.codeLength}`);

    return NextResponse.json({ 
      success: true,
      analysis
    });
  } catch (err) {
    console.error('Analysis error:', err);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}