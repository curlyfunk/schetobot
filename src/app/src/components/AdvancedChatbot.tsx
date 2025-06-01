'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { callChatbotAPI } from '../utils/chatbotService';

const AdvancedChatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Здравейте! Аз съм AI асистентът на e-doc.bg. Как мога да ви помогна днес?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const newUserMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, newUserMessage]);
    
    // Clear input
    setMessage('');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Call chatbot API
      const response = await callChatbotAPI(message, chatHistory);
      
      // Add assistant response to chat
      const newAssistantMessage = { role: 'assistant', content: response };
      setChatHistory(prev => [...prev, newAssistantMessage]);
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      
      // Add error message
      const errorMessage = { 
        role: 'assistant', 
        content: 'Извинявам се, възникна грешка при обработката на вашето запитване. Моля, опитайте отново по-късно.' 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">AI Асистент</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Нашият интелигентен асистент е тук, за да отговори на всички ваши въпроси относно документи, данъци и законодателство.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Chat header */}
            <div className="bg-electric-blue text-white p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">e-doc.bg Асистент</h3>
                  <div className="flex items-center text-xs">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="ml-1">Онлайн</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {chatHistory.map((chat, index) => (
                <div 
                  key={index} 
                  className={`mb-4 flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {chat.role === 'assistant' && (
                    <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  )}
                  <div 
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      chat.role === 'user' 
                        ? 'bg-electric-blue text-white rounded-br-none' 
                        : 'bg-white text-dark-gray shadow-sm rounded-bl-none'
                    }`}
                  >
                    <p>{chat.content}</p>
                  </div>
                  {chat.role === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="bg-white text-dark-gray shadow-sm rounded-lg rounded-bl-none px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Chat input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Напишете вашето съобщение..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-electric-blue text-white rounded-r-lg hover:bg-electric-blue-dark transition-colors disabled:bg-electric-blue/70"
                  disabled={isLoading || !message.trim()}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-8 bg-light-gray rounded-lg p-6">
            <h3 className="text-xl font-semibold text-dark-blue mb-4">Какво може да прави нашият AI асистент?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-dark-blue mb-1">Информация за документи</h4>
                  <p className="text-dark-gray text-sm">Получете подробна информация за всички видове документи и формуляри.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-dark-blue mb-1">Данъчни съвети</h4>
                  <p className="text-dark-gray text-sm">Разберете повече за данъчното законодателство и получете съвети.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-dark-blue mb-1">Срокове и дати</h4>
                  <p className="text-dark-gray text-sm">Получете информация за важни срокове и дати за подаване на документи.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-6 h-6 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-dark-blue mb-1">Често задавани въпроси</h4>
                  <p className="text-dark-gray text-sm">Получете отговори на най-често задаваните въпроси за нашите услуги.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedChatbot;
