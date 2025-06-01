'use client';

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import InsuranceCalculator from '../components/InsuranceCalculator';
import TaxCalendar from '../components/TaxCalendar';
import FAQ from '../components/FAQ';
import PressSection from '../components/PressSection';
import PaymentSystem from '../components/PaymentSystem';
import CallToAction from '../components/CallToAction';
import AdvancedChatbot from '../components/AdvancedChatbot';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <DocumentGenerator />
      <InsuranceCalculator />
      <TaxCalendar />
      <Pricing />
      <FAQ />
      <PressSection />
      <PaymentSystem />
      <CallToAction />
      <AdvancedChatbot />
      <Footer />
    </main>
  );
}
