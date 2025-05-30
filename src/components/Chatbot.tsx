import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatbotMessage from './ChatbotMessage';

interface ChatbotProps {
  initialMessage?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ initialMessage = "Здравейте! Аз съм вашият AI счетоводен асистент. Как мога да ви помогна днес?" }) => {
  const [messages, setMessages] = useState<Array<{text: string; isUser: boolean; timestamp: string}>>([
    { 
      text: initialMessage, 
      isUser: false, 
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample responses for demo purposes
  const demoResponses: {[key: string]: string} = {
    'гфо': 'За генериране на ГФО за фирма без дейност, ще ви трябват следните документи: 1) ЕИК на фирмата, 2) Данни за управителя, 3) Информация за последния подаден отчет. Мога да ви помогна с попълването на всички необходими формуляри.',
    'осигуровки': 'За изчисляване на осигуровки за самоосигуряващо се лице, трябва да знам: 1) Месечен осигурителен доход, 2) Вид дейност, 3) Дали сте избрали да се осигурявате във фонд "Пенсия". Стандартната осигурителна тежест е около 27-30% от декларирания доход.',
    'фактура': 'Мога да ви помогна с генерирането на фактура. Ще ми трябват следните данни: 1) Информация за вашата фирма, 2) Данни за клиента, 3) Описание на стоките/услугите, 4) Единични цени и количества, 5) Начин на плащане.',
    'ддс': 'Стандартната ставка на ДДС в България е 20%. Има и намалена ставка от 9% за хотелско настаняване. От 2023 година има и нулева ставка за определени стоки от първа необходимост. Мога да ви помогна да определите правилната ставка за вашия бизнес.',
    'декларация': 'За попълване на годишна данъчна декларация ще ви трябват: 1) Данни за всички доходи през годината, 2) Информация за внесените авансови данъци, 3) Данни за ползваните данъчни облекчения. Крайният срок за подаване обикновено е 30 април.',
    'срок': 'Важни срокове: 1) ГФО - до 30 юни, 2) Годишна данъчна декларация - до 30 април, 3) Авансов корпоративен данък - до 15-то число на месеца, следващ тримесечието, 4) Декларация по ЗДДС - до 14-то число на следващия месец.',
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      let botResponse = 'За съжаление, не мога да отговоря на този въпрос. Моля, задайте въпрос, свързан със счетоводство, данъци или финанси.';
      
      // Check for keywords in the user's message
      const userMessageLower = inputValue.toLowerCase();
      
      for (const [keyword, response] of Object.entries(demoResponses)) {
        if (userMessageLower.includes(keyword)) {
          botResponse = response;
          break;
        }
      }

      setIsTyping(false);
      setMessages(prev => [...prev, {
        text: botResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-blue text-white p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold">AI Счетоводен Асистент</h3>
          <p className="text-xs text-blue-100">Онлайн</p>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto bg-white/5 backdrop-blur-sm">
        {messages.map((msg, index) => (
          <ChatbotMessage 
            key={index}
            message={msg.text}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}
        
        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center space-x-2 text-gray-500 text-sm ml-2 mb-4"
            >
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.25 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.25, delay: 0.1 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.25, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              </div>
              <span>СчетоBot пише...</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Invisible element for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Въведете вашия въпрос..."
            className="input-field flex-1 mr-2"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-primary text-white p-3 rounded-xl"
            disabled={isTyping}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Пробвайте да зададете въпроси за: ГФО, осигуровки, фактура, ДДС, декларация, срок
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
