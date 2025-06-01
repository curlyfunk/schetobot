'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left column - Text content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-8">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Всички ваши <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-purple-600">документи.</span> Лесно и бързо.
            </motion.h1>
            
            <motion.p 
              className="text-xl text-dark-gray mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Автоматизирайте създаването на всички необходими документи за НАП, НОИ и общините. Спестете време и избегнете грешки с нашата интуитивна платформа.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                href="/documents" 
                className="bg-electric-blue hover:bg-electric-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Започнете безплатно
              </Link>
              <Link 
                href="/how-it-works" 
                className="border border-electric-blue text-electric-blue hover:bg-electric-blue/5 px-6 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Как работи?
              </Link>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-dark-gray font-medium mb-4">Доверяват ни се:</p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                        {i}
                      </div>
                    ))}
                  </div>
                  <span className="ml-3 text-dark-gray">5000+ потребители</span>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-dark-gray">4.9/5 рейтинг</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Image */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100 rounded-full opacity-70 z-0"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-70 z-0"></div>
              
              <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <Image
                  src="/dashboard-preview.png"
                  alt="e-doc.bg платформа"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
