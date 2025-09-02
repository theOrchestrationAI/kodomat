import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import pricing data
import pricingData from './pricing.json';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('healthcare');
  
  const industries = [
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'finance', name: 'Financial Services' },
    { id: 'legal', name: 'Legal' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'creative', name: 'Creative Industries' },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-primary-600">SlavkoKernel™</span>
              </div>
              <nav className="ml-10 hidden space-x-8 md:flex">
                <a href="#features" className="text-gray-500 hover:text-gray-900">Features</a>
                <a href="#industries" className="text-gray-500 hover:text-gray-900">Industries</a>
                <a href="#models" className="text-gray-500 hover:text-gray-900">AI Models</a>
                <a href="#pricing" className="text-gray-500 hover:text-gray-900">Pricing</a>
              </nav>
            </div>
            <div className="flex items-center">
              <a href="#contact" className="btn btn-outline mr-4">Contact Sales</a>
              <a href="#demo" className="btn btn-primary">Request Demo</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex flex-col justify-center">
                <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                  Transform Decision-Making with Multi-Model AI
                </h1>
                <p className="mb-8 text-xl text-white opacity-90">
                  SlavkoKernel™ combines four complementary AI models to deliver technical precision, contextual understanding, probability assessment, and strategic recommendations—all in one integrated platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#demo" className="btn bg-white text-primary-600 hover:bg-gray-100">
                    Request Demo
                  </a>
                  <a href="#learn-more" className="btn border border-white bg-transparent text-white hover:bg-white/10">
                    Learn More
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-80 w-80">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/10 p-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-white p-4 text-center shadow-lg">
                        <div className="mb-2 text-lg font-bold text-primary-600">Audit™</div>
                        <div className="text-sm text-gray-600">Technical Precision</div>
                      </div>
                      <div className="rounded-lg bg-white p-4 text-center shadow-lg">
                        <div className="mb-2 text-lg font-bold text-secondary-600">Introspekt™</div>
                        <div className="text-sm text-gray-600">Contextual Depth</div>
                      </div>
                      <div className="rounded-lg bg-white p-4 text-center shadow-lg">
                        <div className="mb-2 text-lg font-bold text-primary-600">Score™</div>
                        <div className="text-sm text-gray-600">Probability Assessment</div>
                      </div>
                      <div className="rounded-lg bg-white p-4 text-center shadow-lg">
                        <div className="mb-2 text-lg font-bold text-secondary-600">Tactic™</div>
                        <div className="text-sm text-gray-600">Strategic Foresight</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="mb-4">The Power of Multi-Model AI</h2>
              <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-600">
                SlavkoKernel™ combines four specialized AI models to deliver comprehensive insights that transform decision-making across industries.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="card p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Audit™</h3>
                <p className="text-gray-600">
                  Rigorous analysis and verification with technical precision. Ensures compliance, validates processes, and identifies potential issues.
                </p>
              </div>

              <div className="card p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-secondary-100 text-secondary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Introspekt™</h3>
                <p className="text-gray-600">
                  Contextual understanding with philosophical depth. Explores nuances, considers multiple perspectives, and provides holistic insights.
                </p>
              </div>

              <div className="card p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Score™</h3>
                <p className="text-gray-600">
                  Probability assessment with semantic evaluation. Quantifies likelihood, evaluates risks, and provides confidence metrics for decisions.
                </p>
              </div>

              <div className="card p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-secondary-100 text-secondary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Tactic™</h3>
                <p className="text-gray-600">
                  Strategic foresight with proactive recommendations. Develops action plans, anticipates outcomes, and provides implementation guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section id="industries" className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="mb-4">Industry Solutions</h2>
              <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-600">
                SlavkoKernel™ delivers specialized solutions for industries where complex decision-making, regulatory compliance, and strategic insights are critical.
              </p>
            </div>

            <div className="mb-8 flex overflow-x-auto">
              <div className="flex space-x-2">
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ${
                      activeTab === industry.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(industry.id)}
                  >
                    {industry.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 shadow sm:rounded-lg">
              {activeTab === 'healthcare' && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-primary-600">Healthcare Solutions</h3>
                    <p className="mb-4 text-gray-600">
                      Transform medical decision-making with AI that thinks like a medical team: analyzing compliance, exploring context, calculating probabilities, and recommending strategies—all in one integrated platform.
                    </p>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Medical protocol compliance verification</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Holistic patient analysis</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Treatment success probability assessment</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="mr-2 h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Preventive care strategy development</span>
                      </li>
                    </ul>
                    <a href="#healthcare-demo" className="btn btn-primary">
                      View Healthcare Demo
                    </a>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="rounded-lg bg-gray-100 p-6">
                      <div className="text-center">
                        <div className="mb-4 text-lg font-semibold">Market Size</div>
                        <div className="mb-2 text-3xl font-bold text-primary-600">$102.7B</div>
                        <div className="text-sm text-gray-600">Projected by 2030</div>
                      </div>
                      <div className="mt-6">
                        <div className="mb-2 flex justify-between">
                          <span className="text-sm font-medium">Impact Potential</span>
                          <span className="text-sm font-medium">Very High</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-primary-600" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="mb-2 flex justify-between">
                          <span className="text-sm font-medium">Implementation Complexity</span>
                          <span className="text-sm font-medium">Medium</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-primary-600" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Similar sections for other industries */}
              {/* Finance, Legal, Manufacturing, Creative Industries */}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="mb-4">Flexible Pricing</h2>
              <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-600">
                Choose the plan that fits your needs, from individual professionals to enterprise organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingData.plans.map((plan) => (
                <div key={plan.id} className={`card overflow-hidden ${plan.highlighted ? 'ring-2 ring-primary-600' : ''}`}>
                  <div className={`${plan.highlighted ? 'bg-primary-600 text-white' : 'bg-gray-50'} p-6`}>
                    <h3 className="mb-2 text-xl font-semibold">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{typeof plan.price === 'number' ? `$${plan.price}` : plan.price}</span>
                      {typeof plan.price === 'number' && <span className={`${plan.highlighted ? 'text-white opacity-80' : 'text-gray-600'}`}>/{plan.billingCycle}</span>}
                    </div>
                    <p className={`text-sm ${plan.highlighted ? 'text-white opacity-80' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                  </div>
                  <div className="p-6">
                    <ul className="mb-6 space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="mr-2 h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={plan.contactSales ? "#contact" : "#signup"} className={`btn w-full ${plan.highlighted ? 'btn-primary' : 'btn-outline'}`}>
                      {plan.contactSales ? 'Contact Sales' : 'Get Started'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="demo" className="bg-primary-600 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-white">Ready to transform your decision-making?</h2>
                <p className="mb-8 text-lg text-white opacity-90">
                  Request a personalized demo to see how SlavkoKernel™ can help your organization make better decisions with our multi-model AI approach.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
                    Request Demo
                  </a>
                  <a href="#pricing" className="btn border border-white bg-transparent text-white hover:bg-white/10">
                    View Pricing
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <form className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900">Request a Demo</h3>
                  <div className="mb-4">
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="Your name"
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="you@company.com"
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="company" className="mb-1 block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      placeholder="Your company"
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="industry" className="mb-1 block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <select
                      id="industry"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      aria-required="true"
                    >
                      <option value="">Select your industry</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Financial Services</option>
                      <option value="legal">Legal</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="creative">Creative Industries</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label="Submit demo request form"
                  >
                    Request Demo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-white">SlavkoKernel™</div>
              <p className="mt-2 text-sm text-gray-400">
                Transform decision-making with multi-model AI that combines technical precision, contextual understanding, probability assessment, and strategic recommendations.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold">Solutions</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#healthcare" className="hover:text-white">Healthcare</a></li>
                <li><a href="#finance" className="hover:text-white">Financial Services</a></li>
                <li><a href="#legal" className="hover:text-white">Legal</a></li>
                <li><a href="#manufacturing" className="hover:text-white">Manufacturing</a></li>
                <li><a href="#creative" className="hover:text-white">Creative Industries</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#careers" className="hover:text-white">Careers</a></li>
                <li><a href="#blog" className="hover:text-white">Blog</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#security" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 SlavkoKernel™. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
