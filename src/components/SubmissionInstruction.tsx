'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SubmissionInstructionProps {
  documentType: string;
}

const SubmissionInstruction: React.FC<SubmissionInstructionProps> = ({ documentType }) => {
  // Different instructions based on document type
  const instructions = {
    gfo: {
      title: "Инструкции за подаване на ГФО",
      steps: [
        "Влезте в портала на НАП с вашия КЕП или ПИК",
        "Изберете меню 'Подаване на декларации и документи'",
        "Изберете 'Годишен финансов отчет'",
        "Прикачете генерирания PDF файл",
        "Подпишете с КЕП и изпратете"
      ],
      deadline: "31 март",
      link: "https://portal.nap.bg/"
    },
    declaration: {
      title: "Инструкции за подаване на данъчна декларация",
      steps: [
        "Влезте в портала на НАП с вашия КЕП или ПИК",
        "Изберете меню 'Подаване на декларации и документи'",
        "Изберете съответния вид декларация",
        "Прикачете генерирания PDF файл",
        "Проверете данните и изпратете"
      ],
      deadline: "30 април",
      link: "https://portal.nap.bg/"
    },
    contract: {
      title: "Инструкции за използване на договор",
      steps: [
        "Изтеглете генерирания PDF файл",
        "Разпечатайте в два екземпляра",
        "Подпишете от всички страни",
        "Запазете оригинал за вашия архив",
        "Предайте втория екземпляр на другата страна"
      ],
      deadline: "Няма краен срок",
      link: null
    }
  };

  // Default to GFO if type not found
  const currentInstructions = instructions[documentType as keyof typeof instructions] || instructions.gfo;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{currentInstructions.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Следвайте тези стъпки, за да подадете успешно вашия документ.
            Краен срок: <span className="font-semibold">{currentInstructions.deadline}</span>
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              {currentInstructions.steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 mr-4">
                    {index + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-gray-800">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {currentInstructions.link && (
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <a 
                  href={currentInstructions.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Отворете портала на НАП
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            )}
          </div>
          
          <motion.div 
            className="mt-12 bg-blue-50 rounded-2xl p-6 border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-start">
              <div className="text-primary mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Важна информация</h3>
                <p className="text-gray-700">
                  Подаването на документи чрез портала на НАП изисква валиден квалифициран електронен подпис (КЕП) или персонален идентификационен код (ПИК).
                  Ако нямате такъв, можете да подадете документите на място в офис на НАП.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-full h-64 rounded-xl shadow-lg mx-auto overflow-hidden">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Визуално ръководство за подаване на документи</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Визуално ръководство за подаване на документи
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SubmissionInstruction;
