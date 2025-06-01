'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PressSection = () => {
  const pressItems = [
    {
      logo: '/images/press/capital.png',
      name: 'Капитал',
      quote: 'e-doc.bg революционизира начина, по който малкият и среден бизнес работи с административни документи.',
      link: '#'
    },
    {
      logo: '/images/press/manager.png',
      name: 'Мениджър',
      quote: 'Платформата спестява до 70% от времето, необходимо за подготовка на документи за държавната администрация.',
      link: '#'
    },
    {
      logo: '/images/press/forbes.png',
      name: 'Forbes България',
      quote: 'Един от най-обещаващите български стартъпи в сферата на административните технологии за 2025 година.',
      link: '#'
    },
    {
      logo: '/images/press/investor.png',
      name: 'Investor.bg',
      quote: 'Иновативно решение, което значително улеснява комуникацията между бизнеса и институциите.',
      link: '#'
    }
  ];

  return (
    <section id="press" className="py-16 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Медиите за нас</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Вижте какво казват водещите бизнес издания за нашата платформа.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pressItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="h-16 flex items-center justify-center mb-4">
                  <div className="w-full h-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="font-bold text-dark-blue">{item.name}</span>
                  </div>
                </div>
                <blockquote className="italic text-dark-gray mb-4">"{item.quote}"</blockquote>
                <a href={item.link} className="text-electric-blue font-medium hover:underline">Прочетете повече</a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="py-2 px-4 bg-white rounded-full shadow-sm flex items-center">
            <span className="text-dark-gray font-medium">Над 10,000 активни потребители</span>
          </div>
          <div className="py-2 px-4 bg-white rounded-full shadow-sm flex items-center">
            <span className="text-dark-gray font-medium">Повече от 50,000 генерирани документа</span>
          </div>
          <div className="py-2 px-4 bg-white rounded-full shadow-sm flex items-center">
            <span className="text-dark-gray font-medium">Спестени над 100,000 часа</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PressSection;
