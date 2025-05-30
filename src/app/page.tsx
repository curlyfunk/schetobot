import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import DocumentGenerator from '@/components/DocumentGenerator';
import InsuranceCalculator from '@/components/InsuranceCalculator';
import TaxCalendar from '@/components/TaxCalendar';
import PaymentSystem from '@/components/PaymentSystem';
import HowItWorks from '@/components/HowItWorks';
import SubmissionInstruction from '@/components/SubmissionInstruction';
import UserGuide from '@/components/UserGuide';
import Footer from '@/components/Footer';
import AdvancedChatbot from '@/components/AdvancedChatbot';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <DocumentGenerator />
      <InsuranceCalculator />
      <TaxCalendar />
      <PaymentSystem />
      <HowItWorks />
      <SubmissionInstruction documentType="invoice" />
      <UserGuide />
      <Footer />
      <AdvancedChatbot />
    </main>
  );
}
