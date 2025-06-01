import Image from "next/image";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import InsuranceCalculator from "@/components/InsuranceCalculator";
import TaxCalendar from "@/components/TaxCalendar";
import DocumentGenerator from "@/components/DocumentGenerator";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <DocumentGenerator />
      <InsuranceCalculator />
      <TaxCalendar />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
}
