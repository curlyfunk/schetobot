import axios from 'axios';

// Конфигурация за Runpod serverless endpoint
const API_URL = 'https://api.runpod.ai/v2/llama3-70b-chat/run';
const API_KEY = process.env.RUNPOD_API_KEY;

// Интерфейс за съобщение в чата
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Извиква AI чатбот API за генериране на отговор
 * @param message Съобщение от потребителя
 * @param history История на чата
 * @returns Отговор от AI асистента
 */
export const callChatbotAPI = async (message: string, history: ChatMessage[]): Promise<string> => {
  try {
    // Форматиране на историята на чата за API заявката
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Добавяне на текущото съобщение
    const messages = [
      ...formattedHistory,
      { role: 'user', content: message }
    ];

    // Заявка към Runpod serverless endpoint
    const response = await axios.post(
      API_URL,
      {
        input: {
          messages,
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 0.9,
          stream: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Проверка за успешен отговор
    if (response.data && response.data.output) {
      return response.data.output;
    } else {
      throw new Error('Невалиден отговор от API');
    }
  } catch (error) {
    console.error('Грешка при извикване на чатбот API:', error);
    throw error;
  }
};

/**
 * Проверява дали съобщението съдържа забранено съдържание
 * @param message Съобщение за проверка
 * @returns true ако съобщението е безопасно, false ако съдържа забранено съдържание
 */
export const validateMessage = (message: string): boolean => {
  // Списък с ключови думи за проверка
  const forbiddenKeywords = [
    'хакване', 'измама', 'незаконен', 'пиратство', 'порно',
    'оръжие', 'наркотици', 'терористичен', 'заплаха'
  ];

  // Проверка за забранени ключови думи
  const lowerCaseMessage = message.toLowerCase();
  return !forbiddenKeywords.some(keyword => lowerCaseMessage.includes(keyword));
};

/**
 * Форматира отговора от AI за показване в интерфейса
 * @param response Отговор от AI
 * @returns Форматиран отговор
 */
export const formatResponse = (response: string): string => {
  // Премахване на излишни нови редове
  let formatted = response.replace(/\n{3,}/g, '\n\n');
  
  // Добавяне на HTML форматиране за по-добра четимост
  formatted = formatted
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
  
  return formatted;
};
