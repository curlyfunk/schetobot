'use client';

import React from 'react';
import { motion } from 'framer-motion';

const UserGuide = () => {
  const guides = [
    {
      title: "Как да генерирам ГФО за фирма без дейност?",
      content: "За да генерирате Годишен финансов отчет за фирма без дейност, изберете опцията \"Генератор на ГФО\" от нашите услуги. Въведете данните на вашата фирма, включително ЕИК/Булстат, име на фирма, адрес и представляващ. Системата автоматично ще генерира необходимите документи, които можете да изтеглите и подадете към НАП.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Как да изчисля осигуровките си като самоосигуряващо се лице?",
      content: "Използвайте нашия калкулатор на осигуровки, като въведете вашия месечен доход и изберете вида осигуряване (само за пенсия или пълно осигуряване). Системата автоматично ще изчисли дължимите осигуровки за ДОО, ДЗПО, здравно осигуряване и данък общ доход. Можете да видите разбивка по месеци и да изтеглите справка за цялата година.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Как да използвам AI чатбота за счетоводни въпроси?",
      content: "Нашият AI чатбот е достъпен 24/7 за отговор на вашите счетоводни въпроси. Просто кликнете на иконата за чат в долния десен ъгъл на екрана и въведете вашия въпрос. Чатботът може да отговаря на въпроси относно данъчно законодателство, срокове за подаване на документи, изчисляване на осигуровки и много други. За по-сложни въпроси, ще ви насочи към подходящи ресурси или експерти.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ръководство за потребителя</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Научете как да използвате СчетоBot максимално ефективно с нашите подробни ръководства.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {guides.map((guide, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="bg-primary-light/10 text-primary p-3 rounded-lg mr-4">
                      {guide.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{guide.title}</h3>
                      <p className="text-gray-600">{guide.content}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
              Вижте всички ръководства
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UserGuide;
