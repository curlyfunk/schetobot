'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaxCalendar = () => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  
  const months = [
    'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 
    'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
  ];
  
  const taxEvents = {
    0: [ // Януари
      { day: 14, title: 'Авансов данък за декември', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за декември.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец декември.' },
      { day: 31, title: 'Годишна данъчна декларация', description: 'Подаване на годишната данъчна декларация по чл. 50 от ЗДДФЛ за доходите от предходната година.' }
    ],
    1: [ // Февруари
      { day: 14, title: 'Авансов данък за януари', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за януари.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец януари.' }
    ],
    2: [ // Март
      { day: 14, title: 'Авансов данък за февруари', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за февруари.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец февруари.' },
      { day: 31, title: 'Годишна декларация по чл. 73', description: 'Подаване на годишната декларация по чл. 73 от ЗДДФЛ за изплатените доходи на физически лица през предходната година.' }
    ],
    3: [ // Април
      { day: 14, title: 'Авансов данък за март', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за март.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец март.' },
      { day: 30, title: 'Годишна данъчна декларация', description: 'Краен срок за подаване на годишната данъчна декларация по чл. 50 от ЗДДФЛ за доходите от предходната година и внасяне на дължимия данък.' }
    ],
    4: [ // Май
      { day: 14, title: 'Авансов данък за април', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за април.' },
      { day: 15, title: 'Авансови вноски за Q2', description: 'Внасяне на авансовите вноски за корпоративен данък за второ тримесечие.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец април.' }
    ],
    5: [ // Юни
      { day: 14, title: 'Авансов данък за май', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за май.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец май.' }
    ],
    6: [ // Юли
      { day: 14, title: 'Авансов данък за юни', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за юни.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец юни.' },
      { day: 31, title: 'Патентен данък', description: 'Внасяне на третата вноска на патентния данък за текущата година.' }
    ],
    7: [ // Август
      { day: 14, title: 'Авансов данък за юли', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за юли.' },
      { day: 15, title: 'Авансови вноски за Q3', description: 'Внасяне на авансовите вноски за корпоративен данък за трето тримесечие.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец юли.' }
    ],
    8: [ // Септември
      { day: 14, title: 'Авансов данък за август', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за август.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец август.' }
    ],
    9: [ // Октомври
      { day: 14, title: 'Авансов данък за септември', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за септември.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец септември.' },
      { day: 31, title: 'Патентен данък', description: 'Внасяне на четвъртата вноска на патентния данък за текущата година.' }
    ],
    10: [ // Ноември
      { day: 14, title: 'Авансов данък за октомври', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за октомври.' },
      { day: 15, title: 'Авансови вноски за Q4', description: 'Внасяне на авансовите вноски за корпоративен данък за четвърто тримесечие.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец октомври.' }
    ],
    11: [ // Декември
      { day: 14, title: 'Авансов данък за ноември', description: 'Внасяне на авансовия данък върху доходите от стопанска дейност за ноември.' },
      { day: 20, title: 'Авансови вноски за декември', description: 'Внасяне на месечните авансови вноски за корпоративен данък за декември.' },
      { day: 25, title: 'ДДС декларация', description: 'Подаване на справка-декларация по ЗДДС за данъчен период - месец ноември.' }
    ]
  };

  const renderCalendarDays = () => {
    const daysInMonth = new Date(new Date().getFullYear(), activeMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(new Date().getFullYear(), activeMonth, 1).getDay();
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday as first day
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const events = taxEvents[activeMonth]?.filter(event => event.day === day) || [];
      const hasEvents = events.length > 0;
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-1 ${hasEvents ? 'bg-blue-50' : 'bg-white'}`}
        >
          <div className="flex justify-between items-start">
            <span className={`font-medium ${hasEvents ? 'text-electric-blue' : ''}`}>{day}</span>
            {hasEvents && (
              <span className="bg-electric-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {events.length}
              </span>
            )}
          </div>
          {hasEvents && (
            <div className="mt-1">
              {events.map((event, index) => (
                <div 
                  key={index} 
                  className="text-xs bg-white p-1 rounded border border-blue-100 mb-1 truncate"
                  title={event.description}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <section id="tax-calendar" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Данъчен календар</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Не пропускайте важни срокове за данъци и осигуровки с нашия интерактивен данъчен календар.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-electric-blue text-white flex justify-between items-center">
              <button 
                onClick={() => setActiveMonth((activeMonth - 1 + 12) % 12)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-xl font-semibold">{months[activeMonth]} {new Date().getFullYear()}</h3>
              <button 
                onClick={() => setActiveMonth((activeMonth + 1) % 12)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-7 bg-gray-100">
              {['Пон', 'Вто', 'Сря', 'Чет', 'Пет', 'Съб', 'Нед'].map((day, index) => (
                <div key={index} className="py-2 text-center font-medium text-dark-gray">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7">
              {renderCalendarDays()}
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-dark-blue mb-4">Предстоящи срокове</h3>
            
            <div className="space-y-4">
              {taxEvents[activeMonth]?.map((event, index) => (
                <motion.div 
                  key={index}
                  className="bg-light-gray p-4 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-xl font-bold text-electric-blue">{event.day}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-blue">{event.title}</h4>
                      <p className="text-dark-gray">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {(!taxEvents[activeMonth] || taxEvents[activeMonth].length === 0) && (
                <div className="bg-light-gray p-4 rounded-lg text-center">
                  <p className="text-dark-gray">Няма предстоящи срокове за този месец.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Този календар е информативен. За официална информация относно сроковете, моля, консултирайте се с НАП или професионален счетоводител.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxCalendar;
