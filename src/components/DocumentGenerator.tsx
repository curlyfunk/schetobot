'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  isPremium: boolean;
  fields: {
    id: string;
    label: string;
    type: string;
    required: boolean;
    placeholder?: string;
    options?: string[];
  }[];
}

const DocumentGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatingDocument, setGeneratingDocument] = useState(false);
  const [documentGenerated, setDocumentGenerated] = useState(false);
  
  // Document templates
  const templates: DocumentTemplate[] = [
    {
      id: 'gfo-no-activity',
      title: 'ГФО за фирма без дейност',
      description: 'Годишен финансов отчет за фирма без дейност през отчетния период',
      category: 'business',
      isPremium: false,
      fields: [
        { id: 'companyName', label: 'Име на фирмата', type: 'text', required: true, placeholder: 'Пълно юридическо наименование' },
        { id: 'bulstat', label: 'ЕИК/БУЛСТАТ', type: 'text', required: true, placeholder: '123456789' },
        { id: 'year', label: 'Отчетна година', type: 'number', required: true, placeholder: '2025' },
        { id: 'managerName', label: 'Име на управител', type: 'text', required: true, placeholder: 'Име Презиме Фамилия' },
        { id: 'address', label: 'Адрес на управление', type: 'text', required: true, placeholder: 'гр. София, ул. Примерна 1' }
      ]
    },
    {
      id: 'service-contract',
      title: 'Договор за услуги',
      description: 'Стандартен договор за предоставяне на услуги между две страни',
      category: 'legal',
      isPremium: false,
      fields: [
        { id: 'providerName', label: 'Име на изпълнител', type: 'text', required: true, placeholder: 'Име на фирма или физическо лице' },
        { id: 'providerID', label: 'ЕИК/БУЛСТАТ/ЕГН на изпълнител', type: 'text', required: true, placeholder: '123456789' },
        { id: 'clientName', label: 'Име на възложител', type: 'text', required: true, placeholder: 'Име на фирма или физическо лице' },
        { id: 'clientID', label: 'ЕИК/БУЛСТАТ/ЕГН на възложител', type: 'text', required: true, placeholder: '987654321' },
        { id: 'serviceDescription', label: 'Описание на услугата', type: 'textarea', required: true, placeholder: 'Детайлно описание на предоставяната услуга' },
        { id: 'price', label: 'Цена', type: 'text', required: true, placeholder: '1000 лв.' },
        { id: 'deadline', label: 'Срок за изпълнение', type: 'date', required: true }
      ]
    },
    {
      id: 'cv-template',
      title: 'Професионална автобиография (CV)',
      description: 'Модерен шаблон за CV с акцент върху професионалния опит',
      category: 'career',
      isPremium: false,
      fields: [
        { id: 'fullName', label: 'Пълно име', type: 'text', required: true, placeholder: 'Име Презиме Фамилия' },
        { id: 'email', label: 'Имейл адрес', type: 'email', required: true, placeholder: 'example@mail.com' },
        { id: 'phone', label: 'Телефон', type: 'tel', required: true, placeholder: '+359 88 888 8888' },
        { id: 'address', label: 'Адрес', type: 'text', required: false, placeholder: 'гр. София' },
        { id: 'summary', label: 'Професионално резюме', type: 'textarea', required: true, placeholder: 'Кратко описание на вашия професионален профил' },
        { id: 'experience', label: 'Професионален опит', type: 'textarea', required: true, placeholder: 'Опишете вашия професионален опит' },
        { id: 'education', label: 'Образование', type: 'textarea', required: true, placeholder: 'Опишете вашето образование' },
        { id: 'skills', label: 'Умения', type: 'textarea', required: true, placeholder: 'Изброете вашите ключови умения' }
      ]
    },
    // Нови шаблони
    {
      id: 'invoice-template',
      title: 'Фактура',
      description: 'Стандартна фактура за продажба на стоки или услуги',
      category: 'business',
      isPremium: false,
      fields: [
        { id: 'invoiceNumber', label: 'Номер на фактура', type: 'text', required: true, placeholder: '0000000001' },
        { id: 'issueDate', label: 'Дата на издаване', type: 'date', required: true },
        { id: 'sellerName', label: 'Име на продавач', type: 'text', required: true, placeholder: 'Име на фирма' },
        { id: 'sellerVAT', label: 'ЕИК/БУЛСТАТ на продавач', type: 'text', required: true, placeholder: '123456789' },
        { id: 'sellerAddress', label: 'Адрес на продавач', type: 'text', required: true, placeholder: 'гр. София, ул. Примерна 1' },
        { id: 'buyerName', label: 'Име на купувач', type: 'text', required: true, placeholder: 'Име на фирма или физическо лице' },
        { id: 'buyerVAT', label: 'ЕИК/БУЛСТАТ/ЕГН на купувач', type: 'text', required: true, placeholder: '987654321' },
        { id: 'buyerAddress', label: 'Адрес на купувач', type: 'text', required: true, placeholder: 'гр. Пловдив, ул. Друга 2' },
        { id: 'items', label: 'Описание на стоките/услугите', type: 'textarea', required: true, placeholder: 'Стока 1 - 2 бр. x 50 лв. = 100 лв.' },
        { id: 'totalAmount', label: 'Обща сума', type: 'text', required: true, placeholder: '100.00 лв.' },
        { id: 'vatAmount', label: 'ДДС', type: 'text', required: true, placeholder: '20.00 лв.' },
        { id: 'totalWithVAT', label: 'Обща сума с ДДС', type: 'text', required: true, placeholder: '120.00 лв.' }
      ]
    },
    {
      id: 'declaration-no-conflict',
      title: 'Декларация за липса на конфликт на интереси',
      description: 'Официална декларация за липса на конфликт на интереси',
      category: 'legal',
      isPremium: false,
      fields: [
        { id: 'declaratorName', label: 'Име на декларатор', type: 'text', required: true, placeholder: 'Име Презиме Фамилия' },
        { id: 'declaratorID', label: 'ЕГН', type: 'text', required: true, placeholder: '0000000000' },
        { id: 'position', label: 'Длъжност', type: 'text', required: true, placeholder: 'Управител' },
        { id: 'companyName', label: 'Име на фирмата/организацията', type: 'text', required: true, placeholder: 'Име на фирма' },
        { id: 'projectName', label: 'Име на проекта/процедурата', type: 'text', required: true, placeholder: 'Наименование на проекта' },
        { id: 'declarationDate', label: 'Дата на деклариране', type: 'date', required: true }
      ]
    },
    {
      id: 'employment-contract',
      title: 'Трудов договор',
      description: 'Стандартен трудов договор между работодател и служител',
      category: 'legal',
      isPremium: true,
      fields: [
        { id: 'employerName', label: 'Име на работодател', type: 'text', required: true, placeholder: 'Име на фирма' },
        { id: 'employerID', label: 'ЕИК/БУЛСТАТ на работодател', type: 'text', required: true, placeholder: '123456789' },
        { id: 'employerAddress', label: 'Адрес на работодател', type: 'text', required: true, placeholder: 'гр. София, ул. Примерна 1' },
        { id: 'employerRepresentative', label: 'Представител на работодателя', type: 'text', required: true, placeholder: 'Име Презиме Фамилия' },
        { id: 'employeeName', label: 'Име на служител', type: 'text', required: true, placeholder: 'Име Презиме Фамилия' },
        { id: 'employeeID', label: 'ЕГН на служител', type: 'text', required: true, placeholder: '0000000000' },
        { id: 'employeeAddress', label: 'Адрес на служител', type: 'text', required: true, placeholder: 'гр. София, ул. Друга 2' },
        { id: 'position', label: 'Длъжност', type: 'text', required: true, placeholder: 'Специалист маркетинг' },
        { id: 'salary', label: 'Основна заплата', type: 'text', required: true, placeholder: '2000 лв.' },
        { id: 'startDate', label: 'Начална дата', type: 'date', required: true },
        { id: 'contractType', label: 'Вид на договора', type: 'select', required: true, options: ['Безсрочен', 'Срочен', 'Изпитателен срок'] },
        { id: 'workingHours', label: 'Работно време', type: 'select', required: true, options: ['Пълно (8 часа)', 'Непълно (4 часа)', 'Друго'] }
      ]
    },
    {
      id: 'power-of-attorney',
      title: 'Пълномощно',
      description: 'Официално пълномощно за представителство пред институции',
      category: 'legal',
      isPremium: true,
      fields: [
        { id: 'authorName', label: 'Име на упълномощител', type: 'text', required: true, placeholder: 'Име Презиме Фамилия' },
        { id: 'authorID', label: 'ЕГН/ЕИК на упълномощител', type: 'text', required: true, placeholder: '0000000000' },
        { id: 'authorAddress', label: 'Адрес на упълномощител', type: 'text', required: true, placeholder: 'гр. София, ул. Примерна 1' },
        { id: 'proxyName', label: 'Име на упълномощен', type: 'text', required: true, placeholder: 'Име Презиме Фамилия' },
        { id: 'proxyID', label: 'ЕГН/ЕИК на упълномощен', type: 'text', required: true, placeholder: '0000000000' },
        { id: 'proxyAddress', label: 'Адрес на упълномощен', type: 'text', required: true, placeholder: 'гр. София, ул. Друга 2' },
        { id: 'purposeOfAttorney', label: 'Цел на пълномощното', type: 'textarea', required: true, placeholder: 'Детайлно описание на правата, които се предоставят' },
        { id: 'validUntil', label: 'Валидно до', type: 'date', required: false },
        { id: 'issueDate', label: 'Дата на издаване', type: 'date', required: true }
      ]
    },
    {
      id: 'rental-agreement',
      title: 'Договор за наем',
      description: 'Договор за наем на недвижим имот',
      category: 'legal',
      isPremium: true,
      fields: [
        { id: 'landlordName', label: 'Име на наемодател', type: 'text', required: true, placeholder: 'Име Презиме Фамилия' },
        { id: 'landlordID', label: 'ЕГН/ЕИК на наемодател', type: 'text', required: true, placeholder: '0000000000' },
        { id: 'landlordAddress', label: 'Адрес на наемодател', type: 'text', required: true, placeholder: 'гр. София, ул. Примерна 1' },
        { id: 'tenantName', label: 'Име на наемател', type: 'text', required: true, placeholder: 'Име Презиме Фамилия' },
        { id: 'tenantID', label: 'ЕГН/ЕИК на наемател', type: 'text', required: true, placeholder: '0000000000' },
        { id: 'tenantAddress', label: 'Адрес на наемател', type: 'text', required: true, placeholder: 'гр. София, ул. Друга 2' },
        { id: 'propertyAddress', label: 'Адрес на имота', type: 'text', required: true, placeholder: 'гр. София, ул. Наемна 3' },
        { id: 'propertyDescription', label: 'Описание на имота', type: 'textarea', required: true, placeholder: 'Детайлно описание на имота' },
        { id: 'rentalPrice', label: 'Наемна цена', type: 'text', required: true, placeholder: '500 лв.' },
        { id: 'depositAmount', label: 'Депозит', type: 'text', required: true, placeholder: '1000 лв.' },
        { id: 'startDate', label: 'Начална дата', type: 'date', required: true },
        { id: 'endDate', label: 'Крайна дата', type: 'date', required: true },
        { id: 'additionalTerms', label: 'Допълнителни условия', type: 'textarea', required: false, placeholder: 'Допълнителни условия по договора' }
      ]
    }
  ];
  
  // Filter templates based on category and search query
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'Всички' },
    { id: 'business', name: 'Бизнес документи' },
    { id: 'legal', name: 'Правни документи' },
    { id: 'career', name: 'Кариера' }
  ];
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  // Handle document generation
  const handleGenerateDocument = () => {
    setGeneratingDocument(true);
    
    // Simulate document generation
    setTimeout(() => {
      setGeneratingDocument(false);
      setDocumentGenerated(true);
    }, 2000);
  };
  
  // Reset form and go back to template selection
  const handleReset = () => {
    setSelectedTemplate(null);
    setFormData({});
    setDocumentGenerated(false);
  };
  
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Генератор на документи</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Създайте професионални документи за минути. Изберете шаблон, попълнете данните и изтеглете готовия документ.
          </p>
        </motion.div>
        
        {!selectedTemplate ? (
          <>
            {/* Template selection */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                {/* Category filter */}
                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                
                {/* Search */}
                <div className="w-full md:w-auto">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Търсене на шаблони..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-64 bg-white rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Templates grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border ${
                      template.isPremium ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    {template.isPremium && (
                      <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full absolute top-4 right-4">
                        Premium
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{template.title}</h3>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    <button
                      className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                      }}
                    >
                      Избери
                    </button>
                  </motion.div>
                ))}
              </div>
              
              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">Не са намерени шаблони, отговарящи на критериите.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Document form */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">{selectedTemplate.title}</h3>
                <button
                  onClick={handleReset}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              
              {!documentGenerated ? (
                <>
                  <p className="text-gray-600 mb-6">{selectedTemplate.description}</p>
                  
                  <form className="space-y-6">
                    {selectedTemplate.fields.map((field) => (
                      <div key={field.id} className="space-y-1">
                        <label
                          htmlFor={field.id}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        
                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.id}
                            value={formData[field.id] || ''}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            rows={4}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            id={field.id}
                            value={formData[field.id] || ''}
                            onChange={handleInputChange}
                            required={field.required}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="">Изберете...</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={field.id}
                            type={field.type}
                            value={formData[field.id] || ''}
                            onChange={handleInputChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        )}
                      </div>
                    ))}
                    
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleGenerateDocument}
                        className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
                        disabled={generatingDocument}
                      >
                        {generatingDocument ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Генериране...
                          </>
                        ) : (
                          'Генерирай документ'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <svg
                      className="mx-auto h-16 w-16 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Документът е готов!</h3>
                  <p className="text-gray-600 mb-6">
                    Вашият документ беше успешно генериран и е готов за изтегляне.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center">
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                      </svg>
                      Изтегли PDF
                    </button>
                    <button className="border border-primary text-primary py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Изпрати по имейл
                    </button>
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-8 text-gray-500 hover:text-gray-700 underline"
                  >
                    Създай нов документ
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentGenerator;
