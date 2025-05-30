'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import DocumentGenerator from '../components/DocumentGenerator';
import HowItWorks from '../components/HowItWorks';
import SubmissionInstruction from '../components/SubmissionInstruction';
import UserGuide from '../components/UserGuide';
import Testimonials from '../components/Testimonials';
import PaymentSystem from '../components/PaymentSystem';
import Footer from '../components/Footer';
import AdvancedChatbot from '../components/AdvancedChatbot';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <DocumentGenerator />
      <HowItWorks />
      <SubmissionInstruction documentType="gfo" />
      <UserGuide />
      <Testimonials />
      <PaymentSystem />
      <Footer />
      <AdvancedChatbot />
    </main>
  );
}
