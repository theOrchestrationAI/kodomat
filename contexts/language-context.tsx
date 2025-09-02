'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'hr';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    'hero.title': 'SlavkoScore™',
    'hero.subtitle': 'AI-powered code analysis with elegant, intuitive scoring',
    'hero.cta.start': 'Get Started',
    'hero.cta.demo': 'Try Demo',
    'features.title': 'Powerful Analysis Features',
    'features.subtitle': 'SlavkoScore™ provides comprehensive code analysis with actionable insights',
    'features.codeQuality.title': 'Code Quality',
    'features.codeQuality.description': 'Analyze code structure, complexity, and maintainability with advanced AI algorithms',
    'features.security.title': 'Security Analysis',
    'features.security.description': 'Identify vulnerabilities and security risks before they become problems',
    'features.performance.title': 'Performance Metrics',
    'features.performance.description': 'Get detailed performance insights and optimization recommendations',
    'howItWorks.title': 'How SlavkoScore™ Works',
    'howItWorks.subtitle': 'A simple three-step process to analyze and improve your code',
    'howItWorks.step1.title': 'Submit Code',
    'howItWorks.step1.description': 'Upload your code or connect your repository for analysis',
    'howItWorks.step2.title': 'AI Analysis',
    'howItWorks.step2.description': 'Our AI engine analyzes your code across multiple dimensions',
    'howItWorks.step3.title': 'Get Results',
    'howItWorks.step3.description': 'Receive detailed reports with actionable recommendations',
    'testimonials.title': 'What Developers Say',
    'testimonials.subtitle': 'Trusted by developers and teams worldwide',
    'cta.title': 'Ready to Improve Your Code?',
    'cta.subtitle': 'Start your free analysis today and see the difference',
    'cta.button': 'Start Your Free Analysis',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.contact': 'Contact',
    'modal.title': 'Start Free Analysis',
    'modal.subtitle': 'Enter your email to receive a free code analysis report',
    'modal.placeholder': 'you@company.com',
    'modal.button': 'Start Analysis',
    'modal.privacy': 'We respect your privacy. No spam, ever.',
    'modal.processing': 'Processing your request...',
    'modal.analyzing': 'Analyzing code patterns...',
    'modal.processingSubtitle': 'This will just take a moment.',
    'modal.analyzingSubtitle': 'Our AI is examining code quality and security.',
    'modal.viewReport': 'View Full Report',
    'modal.reportSent': 'We\'ve sent the detailed report to your email.',
    'modal.error.title': 'Something went wrong',
    'modal.error.description': 'We couldn\'t process your request. Please try again later.',
    'modal.error.button': 'Close',
  },
  hr: {
    'hero.title': 'SlavkoScore™',
    'hero.subtitle': 'AI analiza koda s elegantnim, intuitivnim bodovanjem',
    'hero.cta.start': 'Započnite',
    'hero.cta.demo': 'Isprobajte Demo',
    'features.title': 'Moćne značajke analize',
    'features.subtitle': 'SlavkoScore™ pruža sveobuhvatnu analizu koda s praktičnim preporukama',
    'features.codeQuality.title': 'Kvaliteta koda',
    'features.codeQuality.description': 'Analizirajte strukturu, složenost i održivost koda pomoću naprednih AI algoritama',
    'features.security.title': 'Sigurnosna analiza',
    'features.security.description': 'Identificirajte ranjivosti i sigurnosne rizike prije nego postanu problemi',
    'features.performance.title': 'Metrike performansi',
    'features.performance.description': 'Dobijte detaljne uvide u performanse i preporuke za optimizaciju',
    'howItWorks.title': 'Kako SlavkoScore™ radi',
    'howItWorks.subtitle': 'Jednostavan proces u tri koraka za analizu i poboljšanje vašeg koda',
    'howItWorks.step1.title': 'Pošaljite kod',
    'howItWorks.step1.description': 'Učitajte svoj kod ili povežite repozitorij za analizu',
    'howItWorks.step2.title': 'AI analiza',
    'howItWorks.step2.description': 'Naš AI sustav analizira vaš kod kroz više dimenzija',
    'howItWorks.step3.title': 'Dobijte rezultate',
    'howItWorks.step3.description': 'Primite detaljne izvještaje s praktičnim preporukama',
    'testimonials.title': 'Što kažu developeri',
    'testimonials.subtitle': 'Pouzdan od strane developera i timova diljem svijeta',
    'cta.title': 'Spremni poboljšati svoj kod?',
    'cta.subtitle': 'Započnite besplatnu analizu danas i vidite razliku',
    'cta.button': 'Započnite besplatnu analizu',
    'footer.privacy': 'Privatnost',
    'footer.terms': 'Uvjeti',
    'footer.contact': 'Kontakt',
    'modal.title': 'Započnite besplatnu analizu',
    'modal.subtitle': 'Unesite svoju email adresu za besplatni izvještaj analize koda',
    'modal.placeholder': 'vi@tvrtka.com',
    'modal.button': 'Započni analizu',
    'modal.privacy': 'Poštujemo vašu privatnost. Bez spama, ikada.',
    'modal.processing': 'Obrađujemo vaš zahtjev...',
    'modal.analyzing': 'Analiziramo uzorke koda...',
    'modal.processingSubtitle': 'Ovo će trajati samo trenutak.',
    'modal.analyzingSubtitle': 'Naš AI ispituje kvalitetu i sigurnost koda.',
    'modal.viewReport': 'Pogledaj cijeli izvještaj',
    'modal.reportSent': 'Poslali smo detaljni izvještaj na vašu email adresu.',
    'modal.error.title': 'Nešto je pošlo po krivu',
    'modal.error.description': 'Nismo mogli obraditi vaš zahtjev. Molimo pokušajte kasnije.',
    'modal.error.button': 'Zatvori',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check browser language or localStorage preference
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = navigator.language.startsWith('hr') ? 'hr' : 'en';
    setLanguage(savedLanguage || browserLanguage);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};