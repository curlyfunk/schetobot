'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "СчетоBot спести часове от моето време всеки месец. Вече не се налага да чакам счетоводителя си за прости документи и изчисления.",
      author: "Мария Иванова",
      position: "Собственик на малък бизнес",
      image: "/testimonial-1.jpg"
    },
    {
      quote: "Като самоосигуряващо се лице, винаги съм се притеснявал от данъчните декларации. СчетоBot направи процеса толкова лесен, че вече нямам никакви притеснения.",
      author: "Георги Петров",
      position: "Фрийлансър",
      image: "/testimonial-2.jpg"
    },
    {
      quote: "Интуитивният интерфейс и мигновените отговори на AI чатбота са невероятни. Получавам експертни съвети по всяко време на денонощието.",
      author: "Елена Димитрова",
      position: "Стартъп предприемач",
      image: "/testimonial-3.jpg"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Какво казват нашите клиенти</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Хиляди потребители вече се доверяват на СчетоBot за своите счетоводни нужди.
            Ето какво споделят някои от тях.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="inline-block w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 italic mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-primary-dark to-primary flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#" className="text-primary font-medium hover:underline">
            Вижте всички отзиви от нашите клиенти →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
