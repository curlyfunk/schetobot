'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InsuranceCalculatorProps {
  className?: string;
}

// Constants for 2025 insurance rates in Bulgaria
const INSURANCE_CONSTANTS = {
  MIN_INCOME: 1000, // Minimum monthly insurance income
  MAX_INCOME: 3500, // Maximum monthly insurance income
  HEALTH_INSURANCE_RATE: 8, // Health insurance rate (%)
  PENSION_FUND_RATE: 19.8, // Pension fund rate (%)
  ADDITIONAL_PENSION_RATE: 5, // Additional mandatory pension insurance (%)
  INCOME_TAX_RATE: 10, // Income tax rate (%)
};

const InsuranceCalculator: React.FC<InsuranceCalculatorProps> = ({ className }) => {
  // Form state
  const [monthlyIncome, setMonthlyIncome] = useState<number>(INSURANCE_CONSTANTS.MIN_INCOME);
  const [birthYear, setBirthYear] = useState<number>(1980);
  const [isRegisteredByDDS, setIsRegisteredByDDS] = useState<boolean>(false);
  const [hasMainEmployment, setHasMainEmployment] = useState<boolean>(false);
  
  // Results state
  const [results, setResults] = useState<{
    healthInsurance: number;
    pensionInsurance: number;
    additionalPensionInsurance: number;
    totalInsurance: number;
    incomeTax: number;
    netIncome: number;
  } | null>(null);
  
  // Calculate insurance amounts when inputs change
  useEffect(() => {
    calculateInsurance();
  }, [monthlyIncome, birthYear, isRegisteredByDDS, hasMainEmployment, calculateInsurance]);
  
  // Calculate insurance amounts
  const calculateInsurance = () => {
    // Validate income is within limits
    const validIncome = Math.max(
      INSURANCE_CONSTANTS.MIN_INCOME,
      Math.min(monthlyIncome, INSURANCE_CONSTANTS.MAX_INCOME)
    );
    
    // Calculate health insurance
    const healthInsurance = hasMainEmployment 
      ? 0 
      : (validIncome * INSURANCE_CONSTANTS.HEALTH_INSURANCE_RATE / 100);
    
    // Calculate pension insurance
    const pensionInsurance = hasMainEmployment 
      ? 0 
      : (validIncome * INSURANCE_CONSTANTS.PENSION_FUND_RATE / 100);
    
    // Calculate additional pension insurance (only for people born after 1959)
    const additionalPensionInsurance = hasMainEmployment || birthYear <= 1959
      ? 0
      : (validIncome * INSURANCE_CONSTANTS.ADDITIONAL_PENSION_RATE / 100);
    
    // Calculate total insurance
    const totalInsurance = healthInsurance + pensionInsurance + additionalPensionInsurance;
    
    // Calculate income tax (10% of income after insurance deductions)
    const taxableIncome = validIncome - totalInsurance;
    const incomeTax = taxableIncome * INSURANCE_CONSTANTS.INCOME_TAX_RATE / 100;
    
    // Calculate net income
    const netIncome = validIncome - totalInsurance - incomeTax;
    
    // Update results
    setResults({
      healthInsurance,
      pensionInsurance,
      additionalPensionInsurance,
      totalInsurance,
      incomeTax,
      netIncome
    });
  };
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return amount.toFixed(2) + ' лв.';
  };
  
  // Handle income change
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setMonthlyIncome(value);
    }
  };
  
  // Handle birth year change
  const handleBirthYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setBirthYear(value);
    }
  };
  
  // Generate years for dropdown
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 80; year <= currentYear - 18; year++) {
      years.push(year);
    }
    return years;
  };
  
  return (
    <section className={`py-16 bg-light-gray ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Калкулатор за осигуровки</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Изчислете точно колко ще платите за осигуровки и данъци като самоосигуряващо се лице или на граждански договор.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Form inputs */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-dark-blue mb-4">Въведете данни</h3>
                  
                  {/* Monthly income */}
                  <div>
                    <label htmlFor="monthlyIncome" className="block text-dark-gray font-medium mb-1">
                      Месечен доход
                    </label>
                    <div className="relative">
                      <input
                        id="monthlyIncome"
                        type="number"
                        min={INSURANCE_CONSTANTS.MIN_INCOME}
                        max={INSURANCE_CONSTANTS.MAX_INCOME}
                        value={monthlyIncome}
                        onChange={handleIncomeChange}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                        aria-describedby="incomeHint"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">лв.</span>
                      </div>
                    </div>
                    <p id="incomeHint" className="mt-1 text-sm text-gray-500">
                      Минимален: {INSURANCE_CONSTANTS.MIN_INCOME} лв., Максимален: {INSURANCE_CONSTANTS.MAX_INCOME} лв.
                    </p>
                  </div>
                  
                  {/* Birth year */}
                  <div>
                    <label htmlFor="birthYear" className="block text-dark-gray font-medium mb-1">
                      Година на раждане
                    </label>
                    <select
                      id="birthYear"
                      value={birthYear}
                      onChange={handleBirthYearChange}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                    >
                      {generateYearOptions().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-500">
                      Влияе на изчислението на допълнително задължително пенсионно осигуряване.
                    </p>
                  </div>
                  
                  {/* DDS registration */}
                  <div>
                    <div className="flex items-center">
                      <input
                        id="isRegisteredByDDS"
                        type="checkbox"
                        checked={isRegisteredByDDS}
                        onChange={(e) => setIsRegisteredByDDS(e.target.checked)}
                        className="h-4 w-4 text-electric-blue focus:ring-electric-blue border-gray-300 rounded"
                      />
                      <label htmlFor="isRegisteredByDDS" className="ml-2 block text-dark-gray font-medium">
                        Регистриран по ДДС
                      </label>
                    </div>
                  </div>
                  
                  {/* Main employment */}
                  <div>
                    <div className="flex items-center">
                      <input
                        id="hasMainEmployment"
                        type="checkbox"
                        checked={hasMainEmployment}
                        onChange={(e) => setHasMainEmployment(e.target.checked)}
                        className="h-4 w-4 text-electric-blue focus:ring-electric-blue border-gray-300 rounded"
                      />
                      <label htmlFor="hasMainEmployment" className="ml-2 block text-dark-gray font-medium">
                        Имам основен трудов договор
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 ml-6">
                      Ако имате основен трудов договор, не дължите осигуровки на гражданския договор.
                    </p>
                  </div>
                </div>
                
                {/* Right column - Results */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-dark-blue mb-4">Резултати</h3>
                  
                  {results && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-dark-gray">Здравно осигуряване ({INSURANCE_CONSTANTS.HEALTH_INSURANCE_RATE}%):</span>
                        <span className="font-medium text-dark-blue">{formatCurrency(results.healthInsurance)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-dark-gray">Пенсионно осигуряване ({INSURANCE_CONSTANTS.PENSION_FUND_RATE}%):</span>
                        <span className="font-medium text-dark-blue">{formatCurrency(results.pensionInsurance)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-dark-gray">Допълнително задължително пенсионно осигуряване ({INSURANCE_CONSTANTS.ADDITIONAL_PENSION_RATE}%):</span>
                        <span className="font-medium text-dark-blue">{formatCurrency(results.additionalPensionInsurance)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200 font-medium">
                        <span className="text-dark-gray">Общо осигуровки:</span>
                        <span className="text-dark-blue">{formatCurrency(results.totalInsurance)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-dark-gray">Данък върху доходите ({INSURANCE_CONSTANTS.INCOME_TAX_RATE}%):</span>
                        <span className="font-medium text-dark-blue">{formatCurrency(results.incomeTax)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 mt-2 bg-electric-blue/10 rounded-lg px-3">
                        <span className="text-dark-blue font-semibold">Нетен доход:</span>
                        <span className="font-bold text-lg text-dark-blue">{formatCurrency(results.netIncome)}</span>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-500">
                        <p>* Калкулациите са приблизителни и базирани на данъчното законодателство за 2025 г.</p>
                        <p>* За точни изчисления, моля консултирайте се със счетоводител.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional information */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-dark-blue mb-4">Важна информация</h3>
            <div className="space-y-4 text-dark-gray">
              <p>
                <strong>Минимален осигурителен доход:</strong> От 1 януари 2025 г. минималният месечен осигурителен доход за самоосигуряващи се лица е {INSURANCE_CONSTANTS.MIN_INCOME} лв.
              </p>
              <p>
                <strong>Максимален осигурителен доход:</strong> Максималният месечен осигурителен доход е {INSURANCE_CONSTANTS.MAX_INCOME} лв.
              </p>
              <p>
                <strong>Срокове за внасяне:</strong> Осигурителните вноски се внасят до 25-то число на месеца, следващ месеца, за който се отнасят.
              </p>
              <p>
                <strong>Допълнително задължително пенсионно осигуряване:</strong> Дължи се само от лица родени след 1959 г.
              </p>
              <p>
                <strong>Граждански договор с основен трудов договор:</strong> Ако имате основен трудов договор, на гражданския договор дължите само данък върху доходите (10%).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceCalculator;
