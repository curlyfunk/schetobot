'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  delay?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, isPopular = false, delay = 0 }) => {
  return (
    <motion.div 
      className={`rounded-2xl overflow-hidden shadow-xl ${isPopular ? 'border-2 border-primary scale-105' : 'border border-gray-200'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {isPopular && (
        <div className="bg-primary text-white text-center py-2 font-medium">
          Най-популярен
        </div>
      )}
      
      <div className="p-8 bg-white">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          {price !== 'Безплатно' && <span className="text-gray-500 ml-1">/месец</span>}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 rounded-xl font-medium ${
            isPopular 
              ? 'bg-gradient-to-r from-primary-dark to-primary text-white shadow-md' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {isPopular ? 'Започнете сега' : 'Изберете план'}
        </motion.button>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const plans = [
    {
      title: "Безплатен",
      price: "Безплатно",
      features: [
        "Генератор на ГФО за фирми без дейност",
        "Базов калкулатор на осигуровки",
        "AI чатбот (ограничен брой въпроси)",
        "Достъп до 3 базови шаблона",
        "Без реклами"
      ],
      isPopular: false
    },
    {
      title: "Стандартен",
      price: "19.99 лв",
      features: [
        "Всичко от Безплатния план",
        "Неограничен брой документи",
        "Пълен достъп до AI чатбот",
        "Достъп до всички шаблони",
        "Автоматични напомняния",
        "Приоритетна поддръжка"
      ],
      isPopular: true
    },
    {
      title: "Бизнес",
      price: "49.99 лв",
      features: [
        "Всичко от Стандартния план",
        "Множество потребителски акаунти",
        "Персонализирани шаблони",
        "Интеграция с други системи",
        "Експортиране на данни",
        "Премиум поддръжка 24/7"
      ],
      isPopular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Прости и прозрачни цени</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Изберете план, който отговаря на вашите нужди. Всички планове включват достъп до основните функционалности.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard 
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              delay={index * 0.1}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600">
            Всички цени са без ДДС. Таксуването е месечно, без дългосрочен ангажимент.
            <br />
            <a href="#" className="text-primary font-medium hover:underline">
              Вижте пълните условия →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
