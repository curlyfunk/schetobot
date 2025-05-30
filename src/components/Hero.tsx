'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-dark to-primary overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-1/4 -left-24 w-64 h-64 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-white opacity-5 rounded-full"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/grid-pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Floating Elements */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-16 h-16 bg-cyan-400 opacity-20 rounded-lg"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-blue-300 opacity-20 rounded-lg"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-24 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Автоматизирайте счетоводството си с <span className="text-cyan-300">изкуствен интелект</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Генерирайте документи, изчислявайте осигуровки и получавайте експертни съвети мигновено, без счетоводител.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-dark font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Започни безплатно
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white border-2 border-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all text-lg"
            >
              Виж демо
            </motion.button>
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-8"
        >
          {[
            { number: "100%", text: "Автоматизация" },
            { number: "24/7", text: "Достъпност" },
            { number: "50%", text: "По-ниска цена" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-blue-100">{stat.text}</p>
            </div>
          ))}
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-6 h-10 text-white/70" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="38" rx="11" stroke="currentColor" strokeWidth="2"/>
            <circle className="animate-bounce" cx="12" cy="12" r="4" fill="currentColor"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
