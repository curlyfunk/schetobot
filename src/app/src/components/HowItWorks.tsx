'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Изберете документ',
      description: 'Разгледайте нашата библиотека от документи и изберете този, който ви е необходим.',
      icon: 'document'
    },
    {
      number: '02',
      title: 'Попълнете данните',
      description: 'Въведете необходимата информация в нашия интуитивен формуляр с подсказки на всяка стъпка.',
      icon: 'form'
    },
    {
      number: '03',
      title: 'Генерирайте документа',
      description: 'Нашата система автоматично генерира документа според актуалните изисквания и формати.',
      icon: 'generate'
    },
    {
      number: '04',
      title: 'Изтеглете и използвайте',
      description: 'Изтеглете готовия документ в PDF формат, подпишете го и го използвайте според нуждите си.',
      icon: 'download'
    }
  ];

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'document':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'form':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'generate':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'download':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-electric-blue"></div>
                </div>
              )}
              
              {/* Step content */}
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-electric-blue font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-dark-blue">{step.title}</h3>
                </div>
                <p className="text-dark-gray mb-6">{step.description}</p>
                <div className="text-electric-blue">
                  {renderIcon(step.icon)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Illustration */}
        <motion.div 
          className="mt-16 bg-light-gray rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-dark-blue mb-4">Интуитивен и удобен интерфейс</h3>
              <p className="text-dark-gray mb-6">
                Нашият интерфейс е проектиран да бъде максимално интуитивен и лесен за използване. Всяка стъпка е придружена от ясни инструкции и подсказки, за да сте сигурни, че попълвате правилната информация.
              </p>
              <ul className="space-y-3">
                {[
                  'Интелигентни формуляри с автоматично попълване',
                  'Проверка за грешки в реално време',
                  'Запазване на прогреса и продължаване по-късно',
                  'Персонализирани шаблони за често използвани документи'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[300px] md:h-[400px]">
              {/* Placeholder for interface illustration */}
              <div className="absolute inset-0 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-12 bg-electric-blue flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="w-full h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-10 bg-gray-100 rounded"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                  </div>
                  <div className="w-full h-10 bg-gray-100 rounded mb-4"></div>
                  <div className="w-full h-32 bg-gray-100 rounded mb-4"></div>
                  <div className="flex justify-end">
                    <div className="w-32 h-10 bg-electric-blue rounded"></div>
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
