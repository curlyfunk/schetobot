'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChatbotInterface = () => {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: 'Здравейте! Аз съм СчетоBot AI асистент. Как мога да ви помогна днес с вашите счетоводни въпроси?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "За да подадете ГФО за фирма без дейност, трябва да попълните декларация по чл. 38, ал. 9, т. 2 от ЗСч чрез системата на НАП. Мога да ви помогна с генерирането на този документ.",
        "Осигуровките за самоосигуряващо се лице за 2025 г. се изчисляват на база 25% от декларирания доход. Минималният осигурителен доход е 850 лв., а максималният - 3900 лв.",
        "Срокът за подаване на годишната данъчна декларация е 30 април. Ако я подадете онлайн, ползвате 5% отстъпка от данъка за довнасяне, но не повече от 1000 лв.",
        "Мога да ви помогна с изготвянето на фактура, трудов договор или друг документ. Просто ми кажете какво точно ви трябва и каква информация да включа."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        type: 'bot',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-primary-dark to-primary text-white p-4 rounded-full shadow-lg cursor-pointer ml-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.div>
      
      {/* Chat window */}
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md mt-4"
        initial={{ opacity: 0, y: 20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        transition={{ duration: 0.3 }}
      >
        {/* Chat header */}
        <div className="bg-gradient-to-r from-primary-dark to-primary p-4 text-white">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold">СчетоBot AI Асистент</h3>
              <p className="text-xs text-blue-100">Онлайн</p>
            </div>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="p-4 h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div 
              key={index}
              className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`max-w-xs rounded-2xl px-4 py-3 ${
                  message.type === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              className="flex justify-start mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Chat input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Въведете вашия въпрос..." 
              className="flex-grow bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSendMessage}
              className="ml-2 bg-primary text-white p-2 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            Powered by СчетоBot AI • Данните са защитени
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatbotInterface;
