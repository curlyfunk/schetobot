'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InsuranceCalculator = () => {
  const [employmentType, setEmploymentType] = useState('employee');
  const [grossSalary, setGrossSalary] = useState('');
  const [calculationResults, setCalculationResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    
    const salary = parseFloat(grossSalary);
    
    if (isNaN(salary) || salary <= 0) {
      alert('Моля, въведете валидна сума.');
      return;
    }
    
    let results = {};
    
    if (employmentType === 'employee') {
      // Изчисления за трудов договор
      const minInsuranceThreshold = 850; // Минимален осигурителен праг
      const maxInsuranceThreshold = 3500; // Максимален осигурителен праг
      
      const insuranceBase = Math.min(Math.max(salary, minInsuranceThreshold), maxInsuranceThreshold);
      
      // Осигуровки за сметка на работника
      const pensionEmployee = insuranceBase * 0.1065; // 10.65% за пенсия
      const healthEmployee = insuranceBase * 0.032; // 3.2% здравно
      const additionalEmployee = insuranceBase * 0.0078; // 0.78% допълнително
      const totalEmployeeInsurance = pensionEmployee + healthEmployee + additionalEmployee;
      
      // Осигуровки за сметка на работодателя
      const pensionEmployer = insuranceBase * 0.1365; // 13.65% за пенсия
      const healthEmployer = insuranceBase * 0.048; // 4.8% здравно
      const additionalEmployer = insuranceBase * 0.0282; // 2.82% допълнително
      const totalEmployerInsurance = pensionEmployer + healthEmployer + additionalEmployer;
      
      // Данък общ доход
      const taxBase = salary - totalEmployeeInsurance;
      const incomeTax = taxBase * 0.1; // 10% данък общ доход
      
      // Нетна заплата
      const netSalary = salary - totalEmployeeInsurance - incomeTax;
      
      results = {
        grossSalary: salary.toFixed(2),
        insuranceBase: insuranceBase.toFixed(2),
        employeeInsurance: {
          pension: pensionEmployee.toFixed(2),
          health: healthEmployee.toFixed(2),
          additional: additionalEmployee.toFixed(2),
          total: totalEmployeeInsurance.toFixed(2)
        },
        employerInsurance: {
          pension: pensionEmployer.toFixed(2),
          health: healthEmployer.toFixed(2),
          additional: additionalEmployer.toFixed(2),
          total: totalEmployerInsurance.toFixed(2)
        },
        taxBase: taxBase.toFixed(2),
        incomeTax: incomeTax.toFixed(2),
        netSalary: netSalary.toFixed(2),
        totalCost: (salary + totalEmployerInsurance).toFixed(2)
      };
    } else if (employmentType === 'selfEmployed') {
      // Изчисления за самоосигуряващо се лице
      const minInsuranceThreshold = 710; // Минимален осигурителен праг
      const maxInsuranceThreshold = 3500; // Максимален осигурителен праг
      
      const insuranceBase = Math.min(Math.max(salary, minInsuranceThreshold), maxInsuranceThreshold);
      
      // Осигуровки
      const pension = insuranceBase * 0.243; // 24.3% за пенсия
      const health = insuranceBase * 0.08; // 8% здравно
      const totalInsurance = pension + health;
      
      // Данък общ доход
      const taxBase = salary - totalInsurance;
      const incomeTax = taxBase * 0.1; // 10% данък общ доход
      
      // Нетен доход
      const netIncome = salary - totalInsurance - incomeTax;
      
      results = {
        grossIncome: salary.toFixed(2),
        insuranceBase: insuranceBase.toFixed(2),
        insurance: {
          pension: pension.toFixed(2),
          health: health.toFixed(2),
          total: totalInsurance.toFixed(2)
        },
        taxBase: taxBase.toFixed(2),
        incomeTax: incomeTax.toFixed(2),
        netIncome: netIncome.toFixed(2)
      };
    }
    
    setCalculationResults(results);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setGrossSalary('');
    setCalculationResults(null);
    setShowResults(false);
  };

  return (
    <section id="insurance-calculator" className="py-16 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Калкулатор на осигуровки</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Изчислете точно вашите осигуровки и данъци с нашия лесен за използване калкулатор.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            {!showResults ? (
              <form onSubmit={handleCalculate}>
                <div className="mb-8">
                  <label className="block text-dark-blue font-medium mb-2">Изберете тип заетост</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="radio"
                        id="employee"
                        name="employmentType"
                        value="employee"
                        checked={employmentType === 'employee'}
                        onChange={() => setEmploymentType('employee')}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="employee"
                        className="flex items-center justify-center p-4 bg-light-gray border rounded-lg cursor-pointer transition-colors peer-checked:bg-electric-blue peer-checked:text-white peer-checked:border-electric-blue hover:bg-gray-100 peer-checked:hover:bg-electric-blue-dark"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Трудов договор
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="selfEmployed"
                        name="employmentType"
                        value="selfEmployed"
                        checked={employmentType === 'selfEmployed'}
                        onChange={() => setEmploymentType('selfEmployed')}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="selfEmployed"
                        className="flex items-center justify-center p-4 bg-light-gray border rounded-lg cursor-pointer transition-colors peer-checked:bg-electric-blue peer-checked:text-white peer-checked:border-electric-blue hover:bg-gray-100 peer-checked:hover:bg-electric-blue-dark"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Самоосигуряващо се лице
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="grossSalary" className="block text-dark-blue font-medium mb-2">
                    {employmentType === 'employee' ? 'Брутна заплата (лв.)' : 'Брутен доход (лв.)'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="grossSalary"
                      value={grossSalary}
                      onChange={(e) => setGrossSalary(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue pl-12"
                      placeholder="Въведете сума"
                      required
                      min="1"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <span className="text-gray-500">лв.</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {employmentType === 'employee' 
                      ? 'Въведете брутната заплата преди удръжки на данъци и осигуровки.' 
                      : 'Въведете брутния доход преди удръжки на данъци и осигуровки.'}
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-electric-blue text-white font-medium rounded-lg hover:bg-electric-blue-dark transition-colors"
                  >
                    Изчисли
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-dark-blue mb-6 text-center">Резултати от изчислението</h3>
                
                {employmentType === 'employee' ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-light-gray p-4 rounded-lg">
                        <h4 className="font-semibold text-dark-blue mb-2">Брутна заплата</h4>
                        <p className="text-2xl font-bold text-electric-blue">{calculationResults.grossSalary} лв.</p>
                      </div>
                      <div className="bg-light-gray p-4 rounded-lg">
                        <h4 className="font-semibold text-dark-blue mb-2">Нетна заплата</h4>
                        <p className="text-2xl font-bold text-green-600">{calculationResults.netSalary} лв.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-dark-blue mb-3">Осигуровки за сметка на работника</h4>
                      <div className="bg-light-gray p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-dark-gray">Пенсионни:</p>
                            <p className="font-medium">{calculationResults.employeeInsurance.pension} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Здравни:</p>
                            <p className="font-medium">{calculationResults.employeeInsurance.health} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Допълнителни:</p>
                            <p className="font-medium">{calculationResults.employeeInsurance.additional} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Общо осигуровки:</p>
                            <p className="font-medium">{calculationResults.employeeInsurance.total} лв.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-dark-blue mb-3">Осигуровки за сметка на работодателя</h4>
                      <div className="bg-light-gray p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-dark-gray">Пенсионни:</p>
                            <p className="font-medium">{calculationResults.employerInsurance.pension} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Здравни:</p>
                            <p className="font-medium">{calculationResults.employerInsurance.health} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Допълнителни:</p>
                            <p className="font-medium">{calculationResults.employerInsurance.additional} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Общо осигуровки:</p>
                            <p className="font-medium">{calculationResults.employerInsurance.total} лв.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-dark-blue mb-3">Данъци</h4>
                      <div className="bg-light-gray p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-dark-gray">Данъчна основа:</p>
                            <p className="font-medium">{calculationResults.taxBase} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Данък общ доход (10%):</p>
                            <p className="font-medium">{calculationResults.incomeTax} лв.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-dark-blue mb-2">Обща цена за работодателя</h4>
                      <p className="text-xl font-bold text-dark-blue">{calculationResults.totalCost} лв.</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Това е общата сума, която работодателят плаща (брутна заплата + осигуровки за сметка на работодателя).
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-light-gray p-4 rounded-lg">
                        <h4 className="font-semibold text-dark-blue mb-2">Брутен доход</h4>
                        <p className="text-2xl font-bold text-electric-blue">{calculationResults.grossIncome} лв.</p>
                      </div>
                      <div className="bg-light-gray p-4 rounded-lg">
                        <h4 className="font-semibold text-dark-blue mb-2">Нетен доход</h4>
                        <p className="text-2xl font-bold text-green-600">{calculationResults.netIncome} лв.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-dark-blue mb-3">Осигуровки</h4>
                      <div className="bg-light-gray p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-dark-gray">Осигурителна база:</p>
                            <p className="font-medium">{calculationResults.insuranceBase} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Общо осигуровки:</p>
                            <p className="font-medium">{calculationResults.insurance.total} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Пенсионни (24.3%):</p>
                            <p className="font-medium">{calculationResults.insurance.pension} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Здравни (8%):</p>
                            <p className="font-medium">{calculationResults.insurance.health} лв.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-dark-blue mb-3">Данъци</h4>
                      <div className="bg-light-gray p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-dark-gray">Данъчна основа:</p>
                            <p className="font-medium">{calculationResults.taxBase} лв.</p>
                          </div>
                          <div>
                            <p className="text-sm text-dark-gray">Данък общ доход (10%):</p>
                            <p className="font-medium">{calculationResults.incomeTax} лв.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                      <p className="text-sm text-gray-600">
                        Забележка: Изчисленията са приблизителни и се базират на актуалните данъчни ставки и осигурителни прагове. За точни изчисления, моля, консултирайте се с професионален счетоводител.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={resetCalculator}
                    className="px-6 py-3 border border-electric-blue text-electric-blue font-medium rounded-lg hover:bg-electric-blue/5 transition-colors"
                  >
                    Ново изчисление
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-dark-blue mb-4">Как работи калкулаторът?</h3>
            <p className="text-dark-gray mb-4">
              Нашият калкулатор използва актуалните данъчни ставки и осигурителни прагове, за да изчисли точно вашите осигуровки и данъци. Изчисленията се базират на следните параметри:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-dark-gray">
              <li>Минимален осигурителен праг: 850 лв. за трудов договор, 710 лв. за самоосигуряващи се лица</li>
              <li>Максимален осигурителен праг: 3500 лв.</li>
              <li>Данък общ доход: 10%</li>
              <li>Осигурителни вноски според актуалното законодателство</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceCalculator;
