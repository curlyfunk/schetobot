'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
}

const PaymentSystem: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  // Pricing plans
  const pricingPlans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Безплатен',
      price: billingPeriod === 'monthly' ? '0 лв.' : '0 лв.',
      description: 'Основни функции за малки бизнеси и самоосигуряващи се лица.',
      features: [
        'Генератор на документи (3 базови шаблона)',
        'Калкулатор за осигуровки',
        'Данъчен календар',
        'Ограничен достъп до AI чатбот (10 въпроса/месец)'
      ],
      isPopular: false,
      buttonText: 'Започнете безплатно'
    },
    {
      id: 'standard',
      name: 'Стандартен',
      price: billingPeriod === 'monthly' ? '19.99 лв.' : '199.90 лв.',
      description: 'Всичко необходимо за малки и средни предприятия.',
      features: [
        'Всички безплатни функции',
        'Генератор на документи (всички шаблони)',
        'Неограничен достъп до AI чатбот',
        'Приоритетна поддръжка',
        'Без реклами'
      ],
      isPopular: true,
      buttonText: 'Изберете Стандартен'
    },
    {
      id: 'premium',
      name: 'Премиум',
      price: billingPeriod === 'monthly' ? '39.99 лв.' : '399.90 лв.',
      description: 'Пълен набор от функции за счетоводни кантори и големи фирми.',
      features: [
        'Всички стандартни функции',
        'Персонализирани шаблони на документи',
        'Експортиране на данни',
        'API достъп',
        'Персонален акаунт мениджър',
        'Обучение и консултации'
      ],
      isPopular: false,
      buttonText: 'Изберете Премиум'
    }
  ];
  
  // Handle plan selection
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // In a real implementation, this would redirect to a checkout page
    setTimeout(() => {
      alert(`В момента функцията за абонамент е в процес на разработка. Скоро ще можете да се абонирате за план "${planId}".`);
      setSelectedPlan(null);
    }, 1000);
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Ценови планове</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Изберете план, който отговаря на вашите нужди. Всички планове включват достъп до основните функции на СчетоBot.
          </p>
          
          {/* Billing period toggle */}
          <div className="flex justify-center items-center mt-8">
            <span className={`mr-3 ${billingPeriod === 'monthly' ? 'text-dark-blue font-medium' : 'text-dark-gray'}`}>
              Месечно
            </span>
            <button
              onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2"
              role="switch"
              aria-checked={billingPeriod === 'yearly'}
            >
              <span
                className={`${
                  billingPeriod === 'yearly' ? 'translate-x-6 bg-electric-blue' : 'translate-x-1 bg-white'
                } inline-block h-4 w-4 transform rounded-full transition`}
              />
            </button>
            <span className={`ml-3 flex items-center ${billingPeriod === 'yearly' ? 'text-dark-blue font-medium' : 'text-dark-gray'}`}>
              Годишно
              <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                -17%
              </span>
            </span>
          </div>
        </motion.div>
        
        {/* Pricing plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-lg shadow-md overflow-hidden ${
                plan.isPopular ? 'border-2 border-electric-blue' : 'border border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-electric-blue text-white px-3 py-1 text-sm font-medium">
                  Най-популярен
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark-blue mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-dark-blue">{plan.price}</span>
                  {billingPeriod === 'monthly' ? (
                    <span className="text-dark-gray">/месец</span>
                  ) : (
                    <span className="text-dark-gray">/година</span>
                  )}
                </div>
                <p className="text-dark-gray mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-dark-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={selectedPlan !== null}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    plan.isPopular
                      ? 'bg-electric-blue text-white hover:bg-electric-blue-dark'
                      : 'bg-white border border-electric-blue text-electric-blue hover:bg-electric-blue/5'
                  } ${selectedPlan !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {selectedPlan === plan.id ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Обработване...
                    </div>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional information */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-dark-blue mb-4">Често задавани въпроси</h3>
          <div className="space-y-6 text-left">
            <div>
              <h4 className="font-medium text-dark-blue mb-2">Мога ли да сменя плана си по-късно?</h4>
              <p className="text-dark-gray">Да, можете да надградите или понижите вашия план по всяко време. Промените влизат в сила от следващия период на таксуване.</p>
            </div>
            <div>
              <h4 className="font-medium text-dark-blue mb-2">Какви методи на плащане приемате?</h4>
              <p className="text-dark-gray">Приемаме плащания с кредитни/дебитни карти (Visa, Mastercard) и банкови преводи.</p>
            </div>
            <div>
              <h4 className="font-medium text-dark-blue mb-2">Има ли скрити такси?</h4>
              <p className="text-dark-gray">Не, цената, която виждате, е крайна. Няма скрити такси или допълнителни разходи.</p>
            </div>
            <div>
              <h4 className="font-medium text-dark-blue mb-2">Мога ли да получа фактура за абонамента си?</h4>
              <p className="text-dark-gray">Да, автоматично издаваме фактура за всяко плащане, която можете да изтеглите от вашия акаунт.</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-light-gray rounded-lg">
            <p className="text-dark-gray">
              Имате въпроси относно нашите планове? <a href="#" className="text-electric-blue hover:underline">Свържете се с нас</a> и ще ви помогнем да изберете най-подходящия план за вашия бизнес.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSystem;
