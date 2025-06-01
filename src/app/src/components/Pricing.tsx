'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  
  const plans = [
    {
      name: 'Базов',
      description: 'За индивидуални потребители и малки фирми',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        'До 10 документа месечно',
        'Достъп до основни шаблони',
        'Експорт в PDF формат',
        'Имейл поддръжка'
      ],
      highlighted: false
    },
    {
      name: 'Професионален',
      description: 'За счетоводители и средни фирми',
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      features: [
        'До 50 документа месечно',
        'Достъп до всички шаблони',
        'Експорт в PDF и Word формат',
        'Приоритетна поддръжка',
        'Данъчни калкулатори',
        'Съхранение на документи'
      ],
      highlighted: true
    },
    {
      name: 'Бизнес',
      description: 'За големи фирми и организации',
      monthlyPrice: 99.99,
      yearlyPrice: 999.99,
      features: [
        'Неограничен брой документи',
        'Достъп до всички шаблони',
        'Експорт във всички формати',
        'Приоритетна поддръжка 24/7',
        'Всички калкулатори',
        'Разширено съхранение',
        'API интеграция',
        'Персонализирани шаблони'
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Прозрачно ценообразуване</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Изберете план, който отговаря на вашите нужди. Всички планове включват достъп до нашата платформа и основни функции.
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="bg-white p-1 rounded-lg shadow-sm inline-flex">
              <button
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingPeriod === 'monthly' ? 'bg-electric-blue text-white' : 'text-dark-gray hover:bg-gray-100'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Месечно
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${
                  billingPeriod === 'yearly' ? 'bg-electric-blue text-white' : 'text-dark-gray hover:bg-gray-100'
                }`}
                onClick={() => setBillingPeriod('yearly')}
              >
                Годишно <span className="text-xs font-medium text-green-500">Спести 20%</span>
              </button>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                plan.highlighted ? 'ring-2 ring-electric-blue' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.highlighted && (
                <div className="bg-electric-blue text-white text-center py-2 text-sm font-medium">
                  Най-популярен избор
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-dark-blue mb-2">{plan.name}</h3>
                <p className="text-dark-gray mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-dark-blue">
                      {billingPeriod === 'monthly' 
                        ? `${plan.monthlyPrice.toFixed(2)} лв.` 
                        : `${plan.yearlyPrice.toFixed(2)} лв.`}
                    </span>
                    <span className="text-dark-gray ml-2">
                      / {billingPeriod === 'monthly' ? 'месец' : 'година'}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <p className="text-green-600 text-sm mt-1">
                      Спестявате {(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(2)} лв. годишно
                    </p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-electric-blue text-white hover:bg-electric-blue-dark'
                      : 'border border-electric-blue text-electric-blue hover:bg-electric-blue/5'
                  }`}
                >
                  Избери план
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-white rounded-xl shadow-sm p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-dark-blue mb-4">Нуждаете се от персонализирано решение?</h3>
              <p className="text-dark-gray mb-6">
                Свържете се с нас за индивидуална оферта, съобразена с конкретните нужди на вашия бизнес. Предлагаме гъвкави решения за всякакви организации.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Персонализирани шаблони за документи',
                  'Интеграция с вашите системи',
                  'Обучение на екипа',
                  'Специализирана поддръжка'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-electric-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-dark-blue text-white font-medium rounded-lg hover:bg-dark-blue/90 transition-colors">
                Свържете се с нас
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-[300px]">
                {/* Placeholder for custom solution illustration */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-purple-600/10 rounded-2xl flex items-center justify-center">
                  <div className="w-24 h-24 bg-electric-blue/20 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-electric-blue/30 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-12 text-center">
          <p className="text-dark-gray">
            Всички цени са без включен ДДС. За повече информация относно нашите планове и услуги, моля, свържете се с нас.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
