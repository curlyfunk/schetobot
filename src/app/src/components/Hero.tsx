'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white to-light-gray overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-accent mb-6">
              <span className="text-dark-blue">Електронни документи</span>
              <br />
              <span className="bg-gradient-to-r from-electric-blue to-purple-600 bg-clip-text text-transparent">
                без усложнения
              </span>
            </h1>
            <p className="text-xl text-dark-gray mb-8 max-w-lg">
              Генерирайте всички необходими документи за НАП, НОИ и общините бързо, лесно и без грешки.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#documents" 
                className="px-6 py-3 rounded-lg bg-electric-blue text-white font-medium hover:bg-electric-blue-dark transition-colors text-center"
              >
                Започнете сега
              </a>
              <a 
                href="#how-it-works" 
                className="px-6 py-3 rounded-lg border border-electric-blue text-electric-blue font-medium hover:bg-electric-blue/5 transition-colors text-center"
              >
                Научете повече
              </a>
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                    {/* Placeholder for user avatars */}
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-dark-gray">
                  <span className="font-semibold">4.9/5</span> от над 1000 потребители
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Image/Illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] md:h-[500px] w-full">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Document illustration */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white rounded-lg shadow-xl p-6">
                    <div className="w-full h-4 bg-electric-blue/20 rounded mb-4"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="absolute bottom-6 right-6 w-16 h-16 bg-electric-blue/20 rounded-full flex items-center justify-center">
                      <div className="w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-yellow-400/20 rounded-full"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-purple-600/20 rounded-full"></div>
                  <div className="absolute top-1/3 left-1/5 w-8 h-8 bg-electric-blue/20 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <motion.div 
              className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 flex items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark-blue">100% съответствие</p>
                <p className="text-xs text-dark-gray">с актуалното законодателство</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-blue">Бързо и лесно</p>
                  <p className="text-xs text-dark-gray">готово за минути</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
