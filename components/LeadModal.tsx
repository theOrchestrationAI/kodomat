'use client';
import { useState } from 'react';
import { Loader2, CheckCircle, ShieldAlert, Thermometer, FileText, X } from 'lucide-react';

type AnalysisReport = { area: string; score: number; status: 'ok' | 'warning' | 'danger' };
type AnalysisResult = { score: number; report: AnalysisReport[] };

export default function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'submitting'|'analyzing'|'analyzed'|'error'>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      // Submit email to lead capture API
      await fetch('/api/leads', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email}) 
      });
      
      // Simulate analysis
      setStatus('analyzing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock analysis result
      const mockResult: AnalysisResult = {
        score: 94,
        report: [
          { area: 'Code Quality', score: 92, status: 'ok' },
          { area: 'Security', score: 96, status: 'ok' },
          { area: 'Performance', score: 89, status: 'warning' },
          { area: 'Maintainability', score: 97, status: 'ok' },
          { area: 'Documentation', score: 85, status: 'warning' }
        ]
      };
      
      setAnalysisResult(mockResult);
      setStatus('analyzed');
    } catch (error) { 
      console.error('Error:', error);
      setStatus('error'); 
    }
  };

  const handleClose = () => { 
    onClose(); 
    setTimeout(() => { 
      setEmail(''); 
      setStatus('idle'); 
      setAnalysisResult(null); 
    }, 300); 
  };

  const renderIcon = (status: AnalysisReport['status']) => {
    if(status === 'ok') return <CheckCircle className="w-5 h-5 text-green-500"/>;
    if(status === 'warning') return <ShieldAlert className="w-5 h-5 text-yellow-500"/>;
    if(status === 'danger') return <Thermometer className="w-5 h-5 text-red-500"/>;
    return null;
  };

  if(!open) return null;
  
  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      onClick={handleClose}
    >
      <div 
        className="max-w-md w-full bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-apple border border-white/20 animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {status === 'analyzed' ? 'Analysis Complete' : 'Start Free Analysis'}
          </h3>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {status === 'idle' && (
          <div className="animate-fade-in">
            <p className="text-gray-600 mb-6">
              Enter your email to receive a free code analysis report.
            </p>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                Start Analysis
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        )}
        
        {(status === 'submitting' || status === 'analyzing') && (
          <div className="py-8 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
              <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-6 text-lg font-medium text-gray-900">
              {status === 'submitting' ? 'Processing your request...' : 'Analyzing code patterns...'}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {status === 'submitting' 
                ? 'This will just take a moment.' 
                : 'Our AI is examining code quality and security.'}
            </p>
          </div>
        )}
        
        {status === 'analyzed' && analysisResult && (
          <div className="animate-fade-in">
            <div className="flex justify-center my-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">{analysisResult.score}</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              {analysisResult.report.map(r => (
                <div 
                  key={r.area} 
                  className="flex items-center justify-between p-3 bg-white/80 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    {renderIcon(r.status)}
                    <span className="font-medium text-gray-800">{r.area}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{r.score}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                View Full Report
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                We've sent the detailed report to your email.
              </p>
            </div>
          </div>
        )}
        
        {status === 'error' && (
          <div className="py-8 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-lg font-medium text-gray-900">Something went wrong</p>
            <p className="mt-2 text-sm text-gray-600 mb-6">
              We couldn't process your request. Please try again later.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}