'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqs = [
    {
      question: 'Какви документи мога да генерирам чрез e-doc.bg?',
      answer: 'Чрез e-doc.bg можете да генерирате широк спектър от документи, включително данъчни декларации, фактури, договори, заявления, удостоверения и много други документи, необходими за комуникация с НАП, НОИ и общините. Нашата библиотека от шаблони постоянно се разширява, за да отговори на всички ваши нужди.'
    },
    {
      question: 'Законово валидни ли са генерираните документи?',
      answer: 'Да, всички документи, генерирани чрез нашата платформа, са в пълно съответствие с актуалното българско законодателство. Нашият екип от експерти редовно актуализира шаблоните според промените в законодателството, за да гарантира, че получавате винаги валидни документи.'
    },
    {
      question: 'Как се заплащат услугите на e-doc.bg?',
      answer: 'Предлагаме различни планове за абонамент, както и опция за еднократно заплащане на конкретни документи. Можете да изберете месечен или годишен абонамент според вашите нужди. Плащането може да се извърши чрез кредитна/дебитна карта, банков превод или PayPal.'
    },
    {
      question: 'Мога ли да редактирам вече генериран документ?',
      answer: 'Да, всички генерирани документи могат да бъдат редактирани преди финализиране. След като документът е генериран, имате възможност да прегледате и коригирате информацията, преди да го изтеглите или запазите. За абонати от плановете Професионален и Бизнес, предлагаме и опция за редактиране на вече запазени документи.'
    },
    {
      question: 'Как се съхраняват моите данни и документи?',
      answer: 'Сигурността на вашите данни е наш основен приоритет. Всички данни се съхраняват на сигурни сървъри с криптиране и са защитени съгласно най-високите стандарти за сигурност. Ние спазваме изискванията на GDPR и никога не споделяме вашите данни с трети страни без вашето изрично съгласие.'
    },
    {
      question: 'Какво представлява AI асистентът и как може да ми помогне?',
      answer: 'Нашият AI асистент е интелигентен чатбот, който може да отговаря на въпроси относно документи, данъчно законодателство, срокове и процедури. Той може да ви помогне с избора на подходящ документ, да обясни как да попълните определени полета и да предостави информация за законовите изисквания. Асистентът е достъпен 24/7 и постоянно се обучава, за да предоставя все по-точни и полезни отговори.'
    },
    {
      question: 'Мога ли да използвам e-doc.bg на мобилно устройство?',
      answer: 'Да, нашата платформа е напълно отзивчива и може да се използва на всяко устройство - компютър, таблет или смартфон. Интерфейсът автоматично се адаптира към размера на екрана, осигурявайки оптимално потребителско изживяване на всяко устройство.'
    },
    {
      question: 'Какво да направя, ако имам проблем или въпрос, който не е обхванат тук?',
      answer: 'Можете да се свържете с нашия екип за поддръжка чрез формата за контакт на сайта, по имейл на support@e-doc.bg или по телефона на +359 2 123 4567. Нашите специалисти са на разположение в работни дни от 9:00 до 18:00 часа и ще ви помогнат с всякакви въпроси или проблеми.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Често задавани въпроси</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Намерете отговори на най-често задаваните въпроси за нашите услуги и как можем да ви помогнем.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full flex justify-between items-center p-4 md:p-6 text-left bg-light-gray hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-dark-blue">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-electric-blue transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-4 md:p-6 bg-white">
                    <p className="text-dark-gray">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-dark-gray mb-6">
              Не намерихте отговор на вашия въпрос? Свържете се с нашия екип за поддръжка.
            </p>
            <a
              href="/contacts"
              className="inline-flex items-center px-6 py-3 bg-electric-blue text-white font-medium rounded-lg hover:bg-electric-blue-dark transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Свържете се с нас
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
