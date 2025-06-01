'use client';

import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import InsuranceCalculator from './InsuranceCalculator';
import TaxCalendar from './TaxCalendar';
import FAQ from './FAQ';
import PressSection from './PressSection';
import PaymentSystem from './PaymentSystem';
import CallToAction from './CallToAction';
import AdvancedChatbot from './AdvancedChatbot';
import Footer from './Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <InsuranceCalculator />
      <TaxCalendar />
      <PaymentSystem />
      <PressSection />
      <FAQ />
      <CallToAction />
      <AdvancedChatbot />
      <Footer />
    </main>
  );
}
