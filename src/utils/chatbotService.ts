'use client';

import axios from 'axios';

// Типове за чатбот заявки и отговори
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Конфигурация на API
const API_ENDPOINT = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://api.e-doc.bg/chatbot';
const RUNPOD_ENDPOINT = process.env.NEXT_PUBLIC_RUNPOD_ENDPOINT || 'https://api.runpod.ai/v2/e-doc-chatbot/run';
const API_KEY = process.env.NEXT_PUBLIC_CHATBOT_API_KEY || '';

// Основен клас за чатбот услугата
export class ChatbotService {
  private session: ChatSession | null = null;

  constructor() {
    // Инициализиране на сесия от localStorage, ако има такава
    this.loadSession();
  }

  // Зареждане на сесия от localStorage
  private loadSession(): void {
    if (typeof window !== 'undefined') {
      const savedSession = localStorage.getItem('chatSession');
      if (savedSession) {
        try {
          this.session = JSON.parse(savedSession);
        } catch (error) {
          console.error('Грешка при зареждане на чат сесия:', error);
          this.createNewSession();
        }
      } else {
        this.createNewSession();
      }
    }
  }

  // Създаване на нова сесия
  private createNewSession(): void {
    this.session = {
      id: this.generateSessionId(),
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.saveSession();
  }

  // Генериране на уникален ID за сесия
  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Запазване на сесията в localStorage
  private saveSession(): void {
    if (typeof window !== 'undefined' && this.session) {
      localStorage.setItem('chatSession', JSON.stringify(this.session));
    }
  }

  // Добавяне на съобщение към сесията
  public addMessage(message: ChatMessage): void {
    if (!this.session) {
      this.createNewSession();
    }
    
    message.timestamp = new Date();
    this.session!.messages.push(message);
    this.session!.updatedAt = new Date();
    this.saveSession();
  }

  // Изпращане на съобщение към AI и получаване на отговор
  public async sendMessage(content: string): Promise<ChatMessage> {
    if (!content.trim()) {
      throw new Error('Съобщението не може да бъде празно');
    }

    // Добавяне на съобщението на потребителя към сесията
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date()
    };
    this.addMessage(userMessage);

    try {
      // Подготовка на контекста за AI модела
      const context = this.prepareContext();
      
      // Изпращане на заявка към Runpod serverless endpoint
      const response = await axios.post(RUNPOD_ENDPOINT, {
        input: {
          messages: context,
          max_tokens: 1000,
          temperature: 0.7,
          stream: false
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      // Обработка на отговора
      if (response.data && response.data.output) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.data.output.text || 'Извинете, не успях да генерирам отговор.',
          timestamp: new Date()
        };
        
        // Добавяне на отговора на асистента към сесията
        this.addMessage(assistantMessage);
        return assistantMessage;
      } else {
        throw new Error('Невалиден отговор от API');
      }
    } catch (error) {
      console.error('Грешка при комуникация с чатбот API:', error);
      
      // Добавяне на съобщение за грешка
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Извинете, възникна грешка при обработката на вашето запитване. Моля, опитайте отново по-късно.',
        timestamp: new Date()
      };
      this.addMessage(errorMessage);
      return errorMessage;
    }
  }

  // Подготовка на контекста за AI модела
  private prepareContext(): any[] {
    if (!this.session) {
      return [{
        role: 'system',
        content: 'Ти си AI асистент на e-doc.bg, платформа за генериране на електронни документи, декларации и формуляри за български институции (НАП, НОИ, Общини). Помагаш на потребителите с въпроси относно данъци, осигуровки, счетоводство и административни процедури в България. Отговаряй на български език, освен ако изрично не бъдеш помолен за друго.'
      }];
    }

    // Системно съобщение за контекст
    const systemMessage = {
      role: 'system',
      content: 'Ти си AI асистент на e-doc.bg, платформа за генериране на електронни документи, декларации и формуляри за български институции (НАП, НОИ, Общини). Помагаш на потребителите с въпроси относно данъци, осигуровки, счетоводство и административни процедури в България. Отговаряй на български език, освен ако изрично не бъдеш помолен за друго.'
    };

    // Вземане на последните N съобщения за контекст (ограничаване на размера)
    const maxContextMessages = 10;
    const recentMessages = this.session.messages.slice(-maxContextMessages);

    // Форматиране на съобщенията за API
    const formattedMessages = recentMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Връщане на пълния контекст
    return [systemMessage, ...formattedMessages];
  }

  // Изчистване на текущата сесия
  public clearSession(): void {
    this.createNewSession();
  }

  // Връщане на всички съобщения от текущата сесия
  public getMessages(): ChatMessage[] {
    return this.session ? [...this.session.messages] : [];
  }
}

// Експортиране на singleton инстанция
const chatbotService = new ChatbotService();
export default chatbotService;
