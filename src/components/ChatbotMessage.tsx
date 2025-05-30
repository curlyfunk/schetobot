import React from 'react';
import { motion } from 'framer-motion';

interface ChatbotMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({ message, isUser, timestamp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[80%] rounded-2xl p-4 ${
        isUser 
          ? 'bg-primary text-white rounded-tr-none' 
          : 'bg-light-gray text-dark-gray rounded-tl-none'
      }`}>
        <p className="text-sm md:text-base">{message}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>{timestamp}</p>
      </div>
    </motion.div>
  );
};

export default ChatbotMessage;
