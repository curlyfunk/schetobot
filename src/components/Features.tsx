'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: '/icons/document.svg',
      title: 'Електронни документи',
      description: 'Генерирайте всички необходими документи за НАП, НОИ и общините с няколко клика.',
    },
    {
      icon: '/icons/calculator.svg',
      title: 'Данъчни калкулатори',
      description: 'Изчислете точно дължимите данъци и осигуровки с нашите интуитивни калкулатори.',
    },
    {
      icon: '/icons/calendar.svg',
      title: 'Данъчен календар',
      description: 'Никога повече не пропускайте важни срокове с нашия интерактивен данъчен календар.',
    },
    {
      icon: '/icons/chat.svg',
      title: 'AI Асистент',
      description: 'Получете отговори на всички ваши въпроси от нашия интелигентен AI асистент.',
    },
    {
      icon: '/icons/shield.svg',
      title: 'Гарантирана точност',
      description: 'Всички документи са проверени от експерти и гарантирано съответстват на актуалното законодателство.',
    },
    {
      icon: '/icons/cloud.svg',
      title: 'Сигурно съхранение',
      description: 'Съхранявайте всички ваши документи на едно място с максимална сигурност и GDPR съответствие.',
    },
  ];

  return (
    <section className="py-16 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Всичко, от което се нуждаете</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            e-doc.bg предлага пълен набор от инструменти за управление на вашите документи и данъчни задължения.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-4">
                <div className="text-electric-blue">
                  {/* Placeholder for icon - in production would use actual SVG or Image component */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-dark-blue mb-2">{feature.title}</h3>
              <p className="text-dark-gray">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-dark-gray mb-6">
            Присъединете се към хилядите потребители, които вече използват e-doc.bg за своите документи и данъчни задължения.
          </p>
          <div className="inline-flex items-center justify-center bg-electric-blue/10 px-4 py-2 rounded-full">
            <span className="text-electric-blue font-medium">Над 50,000 генерирани документа</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
