'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TaxDeadline {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'tax' | 'vat' | 'insurance' | 'annual';
  isImportant: boolean;
}

const TaxCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Tax deadlines for 2025
  const taxDeadlines: TaxDeadline[] = [
    {
      id: '1',
      date: '2025-01-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период декември 2024 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '2',
      date: '2025-01-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за декември 2024 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '3',
      date: '2025-01-31',
      title: 'Подаване на декларации за дължими данъци',
      description: 'Краен срок за подаване на декларации за дължими данъци за четвърто тримесечие на 2024 г.',
      category: 'tax',
      isImportant: false
    },
    {
      id: '4',
      date: '2025-02-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период януари 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '5',
      date: '2025-02-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за януари 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '6',
      date: '2025-03-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период февруари 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '7',
      date: '2025-03-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за февруари 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '8',
      date: '2025-03-31',
      title: 'Подаване на годишен финансов отчет',
      description: 'Краен срок за подаване на годишен финансов отчет (ГФО) за 2024 г.',
      category: 'annual',
      isImportant: true
    },
    {
      id: '9',
      date: '2025-04-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период март 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '10',
      date: '2025-04-15',
      title: 'Внасяне на авансов корпоративен данък',
      description: 'Краен срок за внасяне на първа вноска за авансов корпоративен данък за 2025 г.',
      category: 'tax',
      isImportant: true
    },
    {
      id: '11',
      date: '2025-04-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за март 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '12',
      date: '2025-04-30',
      title: 'Подаване на годишна данъчна декларация',
      description: 'Краен срок за подаване на годишна данъчна декларация за доходите на физически лица за 2024 г.',
      category: 'annual',
      isImportant: true
    },
    {
      id: '13',
      date: '2025-05-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период април 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '14',
      date: '2025-05-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за април 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '15',
      date: '2025-06-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период май 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '16',
      date: '2025-06-15',
      title: 'Внасяне на авансов корпоративен данък',
      description: 'Краен срок за внасяне на втора вноска за авансов корпоративен данък за 2025 г.',
      category: 'tax',
      isImportant: true
    },
    {
      id: '17',
      date: '2025-06-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за май 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '18',
      date: '2025-07-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период юни 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '19',
      date: '2025-07-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за юни 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '20',
      date: '2025-07-31',
      title: 'Подаване на декларации за дължими данъци',
      description: 'Краен срок за подаване на декларации за дължими данъци за второ тримесечие на 2025 г.',
      category: 'tax',
      isImportant: false
    },
    {
      id: '21',
      date: '2025-08-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период юли 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '22',
      date: '2025-08-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за юли 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '23',
      date: '2025-09-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период август 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '24',
      date: '2025-09-15',
      title: 'Внасяне на авансов корпоративен данък',
      description: 'Краен срок за внасяне на трета вноска за авансов корпоративен данък за 2025 г.',
      category: 'tax',
      isImportant: true
    },
    {
      id: '25',
      date: '2025-09-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за август 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '26',
      date: '2025-10-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период септември 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '27',
      date: '2025-10-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за септември 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '28',
      date: '2025-10-31',
      title: 'Подаване на декларации за дължими данъци',
      description: 'Краен срок за подаване на декларации за дължими данъци за трето тримесечие на 2025 г.',
      category: 'tax',
      isImportant: false
    },
    {
      id: '29',
      date: '2025-11-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период октомври 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '30',
      date: '2025-11-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за октомври 2025 г.',
      category: 'insurance',
      isImportant: true
    },
    {
      id: '31',
      date: '2025-12-14',
      title: 'Подаване на справка-декларация по ДДС',
      description: 'Краен срок за подаване на справка-декларация по ДДС за данъчен период ноември 2025 г.',
      category: 'vat',
      isImportant: true
    },
    {
      id: '32',
      date: '2025-12-15',
      title: 'Внасяне на авансов корпоративен данък',
      description: 'Краен срок за внасяне на четвърта вноска за авансов корпоративен данък за 2025 г.',
      category: 'tax',
      isImportant: true
    },
    {
      id: '33',
      date: '2025-12-25',
      title: 'Внасяне на осигуровки',
      description: 'Краен срок за внасяне на осигурителни вноски за самоосигуряващи се лица за ноември 2025 г.',
      category: 'insurance',
      isImportant: true
    }
  ];
  
  // Filter deadlines by month and category
  const filteredDeadlines = taxDeadlines.filter(deadline => {
    const deadlineDate = new Date(deadline.date);
    const deadlineMonth = deadlineDate.getMonth();
    
    const matchesMonth = deadlineMonth === selectedMonth;
    const matchesCategory = selectedCategory === 'all' || deadline.category === selectedCategory;
    
    return matchesMonth && matchesCategory;
  });
  
  // Sort deadlines by date
  const sortedDeadlines = [...filteredDeadlines].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  // Format date to display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  // Get days remaining
  const getDaysRemaining = (dateString: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  // Get status badge based on days remaining
  const getStatusBadge = (dateString: string): { text: string; className: string } => {
    const daysRemaining = getDaysRemaining(dateString);
    
    if (daysRemaining < 0) {
      return { text: 'Изтекъл', className: 'bg-gray-500 text-white' };
    } else if (daysRemaining === 0) {
      return { text: 'Днес', className: 'bg-red-500 text-white' };
    } else if (daysRemaining <= 7) {
      return { text: `${daysRemaining} дни`, className: 'bg-amber-500 text-white' };
    } else {
      return { text: `${daysRemaining} дни`, className: 'bg-green-500 text-white' };
    }
  };
  
  // Get category badge
  const getCategoryBadge = (category: string): { text: string; className: string } => {
    switch (category) {
      case 'tax':
        return { text: 'Данъци', className: 'bg-blue-100 text-blue-800' };
      case 'vat':
        return { text: 'ДДС', className: 'bg-purple-100 text-purple-800' };
      case 'insurance':
        return { text: 'Осигуровки', className: 'bg-green-100 text-green-800' };
      case 'annual':
        return { text: 'Годишни', className: 'bg-red-100 text-red-800' };
      default:
        return { text: 'Други', className: 'bg-gray-100 text-gray-800' };
    }
  };
  
  // Month names
  const monthNames = [
    'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
    'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
  ];
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'Всички' },
    { id: 'tax', name: 'Данъци' },
    { id: 'vat', name: 'ДДС' },
    { id: 'insurance', name: 'Осигуровки' },
    { id: 'annual', name: 'Годишни' }
  ];
  
  // Add to calendar function (would integrate with actual calendar APIs in production)
  const addToCalendar = (deadline: TaxDeadline) => {
    alert(`Функцията за добавяне в календар ще бъде налична скоро!\n\nСъбитие: ${deadline.title}\nДата: ${formatDate(deadline.date)}`);
  };
  
  return (
    <section className="py-16 bg-light-gray">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Данъчен календар</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Не пропускайте важни срокове за данъци и осигуровки. Нашият календар ви напомня за всички ключови дати.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                {/* Month selector */}
                <div className="w-full md:w-auto">
                  <label htmlFor="month-select" className="block text-dark-gray font-medium mb-1">
                    Изберете месец
                  </label>
                  <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  >
                    {monthNames.map((month, index) => (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Category filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-electric-blue text-white'
                          : 'bg-gray-100 text-dark-gray hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Deadlines list */}
              <div className="space-y-4">
                {sortedDeadlines.length > 0 ? (
                  sortedDeadlines.map(deadline => {
                    const statusBadge = getStatusBadge(deadline.date);
                    const categoryBadge = getCategoryBadge(deadline.category);
                    
                    return (
                      <motion.div
                        key={deadline.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`border rounded-lg p-4 ${
                          deadline.isImportant ? 'border-electric-blue bg-electric-blue/5' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div className="flex items-center mb-2 md:mb-0">
                            <div className="mr-4 text-center">
                              <div className="text-2xl font-bold text-dark-blue">
                                {new Date(deadline.date).getDate()}
                              </div>
                              <div className="text-sm text-dark-gray">
                                {monthNames[selectedMonth]}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-dark-blue flex items-center">
                                {deadline.title}
                                {deadline.isImportant && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                )}
                              </h3>
                              <p className="text-dark-gray">{deadline.description}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryBadge.className}`}>
                                  {categoryBadge.text}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.className}`}>
                                  {statusBadge.text}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => addToCalendar(deadline)}
                            className="mt-3 md:mt-0 px-4 py-2 bg-white border border-electric-blue text-electric-blue rounded-md hover:bg-electric-blue/5 transition-colors text-sm flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Добави в календар
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-dark-blue">Няма срокове за този месец</h3>
                    <p className="mt-1 text-dark-gray">
                      Изберете друг месец или категория, за да видите съответните срокове.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Additional information */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-dark-blue mb-4">Важна информация</h3>
            <div className="space-y-4 text-dark-gray">
              <p>
                <strong>Данъчен календар:</strong> Този календар съдържа основните срокове за подаване на декларации и внасяне на данъци и осигуровки за 2025 г.
              </p>
              <p>
                <strong>Напомняне:</strong> В момента функцията за автоматични напомняния е в процес на разработка. Скоро ще можете да получавате известия по имейл за предстоящи срокове.
              </p>
              <p>
                <strong>Отговорност:</strong> Въпреки че полагаме всички усилия да поддържаме точна информация, винаги проверявайте официалните източници (НАП, НОИ) за потвърждение на сроковете.
              </p>
              <p>
                <strong>Персонализирани напомняния:</strong> За да получавате персонализирани напомняния, моля, регистрирайте се и попълнете вашия бизнес профил.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxCalendar;
