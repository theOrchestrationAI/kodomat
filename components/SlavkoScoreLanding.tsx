'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Code, BarChart3, Shield, Zap, CheckCircle, ChevronRight } from 'lucide-react';
import LeadModal from './LeadModal';

export default function SlavkoScoreLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f7] to-[#e5e5ea] pt-20 pb-32">
        <div className="container-apple relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in-down">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                SlavkoScore™
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl animate-fade-in-down stagger-1">
              AI-powered code analysis with elegant, intuitive scoring
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in-down stagger-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-apple btn-apple-primary flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-apple btn-apple-secondary flex items-center gap-2"
              >
                Try Demo <Code className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 flex justify-center animate-scale-in stagger-3">
            <div className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden shadow-apple">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <div className="text-white text-center">
                    <div className="text-7xl font-bold">94</div>
                    <div className="text-sm font-medium mt-1">EXCELLENT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <div className="absolute top-40 left-[10%] animate-float hidden md:block">
            <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-apple">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="absolute top-60 right-[15%] animate-float animation-delay-2000 hidden md:block">
            <div className="bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-apple">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-3xl"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-purple-200/30 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-apple bg-white">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Analysis Features</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              SlavkoScore™ provides comprehensive code analysis with actionable insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-apple p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Code Quality</h3>
              <p className="text-gray-600">
                Analyze code structure, complexity, and maintainability with advanced AI algorithms
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-apple p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Security Analysis</h3>
              <p className="text-gray-600">
                Identify vulnerabilities and security risks before they become problems
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-apple p-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Metrics</h3>
              <p className="text-gray-600">
                Get detailed performance insights and optimization recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-apple bg-[#f5f5f7]">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How SlavkoScore™ Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A simple three-step process to analyze and improve your code
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Code</h3>
              <p className="text-gray-600">
                Upload your code or connect your repository for analysis
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-gray-400">
              <ArrowRight className="w-8 h-8" />
            </div>
            <div className="block md:hidden text-gray-400 -rotate-90">
              <ArrowRight className="w-8 h-8" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI engine analyzes your code across multiple dimensions
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-gray-400">
              <ArrowRight className="w-8 h-8" />
            </div>
            <div className="block md:hidden text-gray-400 -rotate-90">
              <ArrowRight className="w-8 h-8" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">
                Receive detailed reports with actionable recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-apple bg-white">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What Developers Say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by developers and teams worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="card-apple p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-600 italic">
                    "SlavkoScore™ helped us identify critical issues in our codebase that we had missed for months. The insights are incredibly valuable."
                  </p>
                  <p className="mt-4 font-semibold">Sarah Chen</p>
                  <p className="text-sm text-gray-500">Lead Developer, TechCorp</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card-apple p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div>
                  <p className="text-gray-600 italic">
                    "The performance recommendations alone saved us 40% in cloud costs. SlavkoScore™ is now an essential part of our CI/CD pipeline."
                  </p>
                  <p className="mt-4 font-semibold">Marcus Johnson</p>
                  <p className="text-sm text-gray-500">CTO, StartupX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-apple bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <div className="container-apple">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Improve Your Code?</h2>
            <p className="mt-4 text-xl max-w-2xl mx-auto">
              Start your free analysis today and see the difference
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-8 bg-white text-blue-600 btn-apple flex items-center gap-2"
            >
              Start Your Free Analysis <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] py-12">
        <div className="container-apple">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">SlavkoScore™</h3>
              <p className="text-sm text-gray-500 mt-1">© 2025 SlavkoKernel. All rights reserved.</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lead Modal */}
      <LeadModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}