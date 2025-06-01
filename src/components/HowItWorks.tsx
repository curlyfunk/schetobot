'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Изберете документ',
      description: 'Разгледайте нашата библиотека от документи и изберете този, от който се нуждаете.',
      icon: '/icons/document-select.svg'
    },
    {
      number: '02',
      title: 'Попълнете данните',
      description: 'Въведете необходимата информация в нашия интуитивен формуляр с подсказки на всяка стъпка.',
      icon: '/icons/form-fill.svg'
    },
    {
      number: '03',
      title: 'Генерирайте документа',
      description: 'Системата автоматично генерира вашия документ в PDF формат, готов за печат или електронно подаване.',
      icon: '/icons/document-generate.svg'
    },
    {
      number: '04',
      title: 'Изтеглете или съхранете',
      description: 'Изтеглете документа веднага или го съхранете в профила си за бъдеща употреба.',
      icon: '/icons/download-save.svg'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Как работи e-doc.bg?</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Генерирането на документи никога не е било по-лесно. Само четири прости стъпки ви делят от готовия документ.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-electric-blue/20 -translate-y-1/2 z-0"></div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-white border-2 border-electric-blue flex items-center justify-center mb-6 relative">
                  <span className="text-xl font-bold text-electric-blue">{step.number}</span>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-dark-blue mb-3">{step.title}</h3>
                  <p className="text-dark-gray">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Demo section */}
        <motion.div 
          className="mt-20 bg-light-gray rounded-xl overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-dark-blue mb-4">Вижте как работи в действие</h3>
              <p className="text-dark-gray mb-6">
                Нашата платформа е проектирана да бъде максимално интуитивна и лесна за използване. Вижте демонстрация на процеса за генериране на документ.
              </p>
              <ul className="space-y-3 mb-6">
                {['Интуитивен интерфейс', 'Подробни инструкции', 'Автоматични изчисления', 'Проверка за грешки'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-electric-blue mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-dark-gray">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="flex items-center text-electric-blue font-medium hover:text-electric-blue-dark transition-colors">
                <span>Гледайте видео демонстрация</span>
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <div className="relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-electric-blue/10 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Placeholder for video thumbnail or screenshot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-electric-blue flex items-center justify-center cursor-pointer hover:bg-electric-blue-dark transition-colors">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
