'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly');
  };
  
  const plans = [
    {
      name: 'Безплатен',
      description: 'За лична употреба и опознаване на платформата',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        'До 3 документа месечно',
        'Достъп до основни документи',
        'Базови калкулатори',
        'Данъчен календар',
        'Имейл поддръжка',
      ],
      cta: 'Започнете безплатно',
      highlighted: false,
    },
    {
      name: 'Стандартен',
      description: 'За малки фирми и самоосигуряващи се лица',
      price: {
        monthly: 19.99,
        yearly: 199.99,
      },
      features: [
        'До 20 документа месечно',
        'Достъп до всички документи',
        'Всички калкулатори',
        'Данъчен календар с известия',
        'Съхранение на документи',
        'Приоритетна поддръжка',
      ],
      cta: 'Изберете план',
      highlighted: true,
    },
    {
      name: 'Бизнес',
      description: 'За счетоводни къщи и по-големи компании',
      price: {
        monthly: 49.99,
        yearly: 499.99,
      },
      features: [
        'Неограничен брой документи',
        'Достъп до всички документи',
        'Всички калкулатори',
        'Данъчен календар с известия',
        'Съхранение на документи',
        'Приоритетна поддръжка',
        'API интеграция',
        'Множество потребители',
      ],
      cta: 'Изберете план',
      highlighted: false,
    },
  ];
  
  return (
    <section className="py-16 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Прозрачно ценообразуване</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Изберете план, който отговаря на вашите нужди. Без скрити такси, без изненади.
          </p>
        </motion.div>
        
        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 inline-flex items-center shadow-sm">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-electric-blue text-white'
                  : 'text-dark-gray hover:text-electric-blue'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Месечно
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-electric-blue text-white'
                  : 'text-dark-gray hover:text-electric-blue'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Годишно <span className="text-xs font-normal">(-17%)</span>
            </button>
          </div>
        </div>
        
        {/* Pricing cards */}
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
                  Най-популярен
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark-blue mb-2">{plan.name}</h3>
                <p className="text-dark-gray mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-dark-blue">
                      {plan.price[billingPeriod]} лв.
                    </span>
                    <span className="text-dark-gray ml-2">
                      {billingPeriod === 'monthly' ? '/ месец' : '/ година'}
                    </span>
                  </div>
                  {billingPeriod === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      Спестявате {(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)} лв. годишно
                    </p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-electric-blue mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-dark-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-electric-blue hover:bg-electric-blue-dark text-white'
                      : 'bg-white border border-electric-blue text-electric-blue hover:bg-electric-blue/5'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Enterprise section */}
        <motion.div 
          className="mt-16 bg-white rounded-xl shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-dark-blue mb-2">Нуждаете се от персонализирано решение?</h3>
              <p className="text-dark-gray max-w-2xl">
                Свържете се с нас за индивидуална оферта, съобразена с нуждите на вашия бизнес.
              </p>
            </div>
            <button className="mt-6 md:mt-0 bg-white border border-electric-blue text-electric-blue hover:bg-electric-blue/5 px-6 py-3 rounded-lg font-medium transition-colors">
              Свържете се с нас
            </button>
          </div>
        </motion.div>
        
        {/* FAQ */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-dark-blue mb-6 text-center">Често задавани въпроси</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'Мога ли да сменя плана си по-късно?',
                answer: 'Да, можете да надградите или понижите своя план по всяко време. Промените влизат в сила от следващия период на таксуване.'
              },
              {
                question: 'Има ли скрити такси?',
                answer: 'Не, всички цени са крайни и включват ДДС. Няма допълнителни или скрити такси.'
              },
              {
                question: 'Какви методи на плащане приемате?',
                answer: 'Приемаме плащания с кредитни/дебитни карти (Visa, Mastercard), банков превод и PayPal.'
              },
              {
                question: 'Мога ли да получа фактура?',
                answer: 'Да, автоматично издаваме фактура за всяко плащане, която можете да изтеглите от вашия профил.'
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <h4 className="text-lg font-semibold text-dark-blue mb-2">{faq.question}</h4>
                <p className="text-dark-gray">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
