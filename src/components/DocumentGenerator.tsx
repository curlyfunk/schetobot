'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import generateDocument from '@/utils/pdfGenerator';

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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generatingDocument, setGeneratingDocument] = useState(false);
  const [documentGenerated, setDocumentGenerated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
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
    
    // Clear error for this field if it exists
    if (formErrors[id]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    if (!selectedTemplate) return false;
    
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    selectedTemplate.fields.forEach(field => {
      if (field.required && (!formData[field.id] || formData[field.id].trim() === '')) {
        newErrors[field.id] = 'Това поле е задължително';
        isValid = false;
      }
    });
    
    setFormErrors(newErrors);
    
    // Scroll to first error on mobile
    if (!isValid && isMobile && formRef.current) {
      setTimeout(() => {
        const firstErrorField = document.querySelector('[aria-invalid="true"]');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (firstErrorField as HTMLElement).focus();
        }
      }, 100);
    }
    
    return isValid;
  };
  
  // Handle document generation
  const handleGenerateDocument = () => {
    if (!validateForm() || !selectedTemplate) {
      return;
    }
    
    setGeneratingDocument(true);
    
    try {
      // Generate PDF document
      setTimeout(() => {
        const doc = generateDocument(selectedTemplate.id, formData);
        
        // Save the PDF
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setDocumentUrl(pdfUrl);
        setGeneratingDocument(false);
        setDocumentGenerated(true);
      }, 1000);
    } catch (error) {
      console.error('Error generating document:', error);
      setGeneratingDocument(false);
      alert('Възникна грешка при генерирането на документа. Моля, опитайте отново.');
    }
  };
  
  // Reset form and go back to template selection
  const handleReset = () => {
    setSelectedTemplate(null);
    setFormData({});
    setFormErrors({});
    setDocumentGenerated(false);
    setDocumentUrl(null);
  };
  
  // Download generated document
  const handleDownloadDocument = () => {
    if (documentUrl && selectedTemplate) {
      const link = document.createElement('a');
      link.href = documentUrl;
      link.download = `${selectedTemplate.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  // Send document via email
  const handleEmailDocument = () => {
    if (documentUrl && selectedTemplate) {
      // In a real implementation, this would send the document to a server endpoint
      // that would handle the email sending with the attachment
      alert('Функцията за изпращане по имейл ще бъде налична скоро!');
    }
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
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Генератор на документи</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Създайте професионални документи за минути. Изберете шаблон, попълнете данните и изтеглете готовия документ.
          </p>
        </motion.div>
        
        {!selectedTemplate ? (
          <>
            {/* Template selection */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                {/* Category filter */}
                <div className="flex flex-wrap gap-2 mb-4 md:mb-0" role="tablist" aria-label="Категории документи">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-electric-blue text-white'
                          : 'bg-white text-dark-gray hover:bg-gray-100'
                      }`}
                      role="tab"
                      aria-selected={selectedCategory === category.id}
                      aria-controls={`category-${category.id}`}
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
                      className="w-full md:w-64 px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                      aria-label="Търсене на шаблони"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="tabpanel" id={`category-${selectedCategory}`}>
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-semibold font-accent text-dark-blue mb-2">{template.title}</h3>
                        <p className="text-dark-gray mb-4">{template.description}</p>
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            template.isPremium ? 'bg-gold/10 text-gold' : 'bg-electric-blue/10 text-electric-blue'
                          }`}>
                            {template.isPremium ? 'Премиум' : 'Безплатен'}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedTemplate(template);
                              setFormData({});
                              setFormErrors({});
                            }}
                            className="px-4 py-2 bg-electric-blue text-white rounded-md hover:bg-electric-blue-dark transition-colors"
                            aria-label={`Избери шаблон ${template.title}`}
                          >
                            Избери
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-dark-blue">Няма намерени шаблони</h3>
                    <p className="mt-1 text-dark-gray">
                      Опитайте с друга категория или ключова дума.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Document form */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold font-accent text-dark-blue">{selectedTemplate.title}</h3>
                  <button
                    onClick={handleReset}
                    className="text-electric-blue hover:text-electric-blue-dark transition-colors"
                    aria-label="Върни се към избор на шаблон"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                
                {documentGenerated ? (
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <svg
                        className="mx-auto h-12 w-12 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-dark-blue">Документът е готов!</h3>
                      <p className="mt-1 text-dark-gray">
                        Вашият документ беше успешно генериран и е готов за изтегляне.
                      </p>
                    </div>
                    
                    {documentUrl && (
                      <div className="mb-6">
                        <iframe
                          src={documentUrl}
                          className="w-full h-96 border border-gray-300 rounded-lg"
                          title="Преглед на документ"
                        />
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button
                        onClick={handleDownloadDocument}
                        className="px-6 py-3 bg-electric-blue text-white rounded-md hover:bg-electric-blue-dark transition-colors flex items-center justify-center"
                        aria-label="Изтегли документ"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Изтегли PDF
                      </button>
                      <button
                        onClick={handleEmailDocument}
                        className="px-6 py-3 bg-white border border-electric-blue text-electric-blue rounded-md hover:bg-electric-blue/5 transition-colors flex items-center justify-center"
                        aria-label="Изпрати по имейл"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Изпрати по имейл
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-white border border-gray-300 text-dark-gray rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                        aria-label="Създай нов документ"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Нов документ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div ref={formRef}>
                    <form onSubmit={(e) => { e.preventDefault(); handleGenerateDocument(); }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedTemplate.fields.map(field => (
                          <div
                            key={field.id}
                            className={field.type === 'textarea' ? 'col-span-full' : ''}
                          >
                            <label
                              htmlFor={field.id}
                              className="block text-dark-gray font-medium mb-1"
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
                                className={`w-full px-4 py-2 rounded-md border ${
                                  formErrors[field.id]
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-electric-blue'
                                } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                                rows={4}
                                aria-invalid={!!formErrors[field.id]}
                                aria-describedby={formErrors[field.id] ? `${field.id}-error` : undefined}
                              />
                            ) : field.type === 'select' ? (
                              <select
                                id={field.id}
                                value={formData[field.id] || ''}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 rounded-md border ${
                                  formErrors[field.id]
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-electric-blue'
                                } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                                aria-invalid={!!formErrors[field.id]}
                                aria-describedby={formErrors[field.id] ? `${field.id}-error` : undefined}
                              >
                                <option value="">Изберете...</option>
                                {field.options?.map(option => (
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
                                className={`w-full px-4 py-2 rounded-md border ${
                                  formErrors[field.id]
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:ring-electric-blue'
                                } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                                aria-invalid={!!formErrors[field.id]}
                                aria-describedby={formErrors[field.id] ? `${field.id}-error` : undefined}
                              />
                            )}
                            
                            {formErrors[field.id] && (
                              <p
                                id={`${field.id}-error`}
                                className="mt-1 text-sm text-red-500"
                                role="alert"
                              >
                                {formErrors[field.id]}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-electric-blue text-white rounded-md hover:bg-electric-blue-dark transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={generatingDocument}
                          aria-busy={generatingDocument}
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
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Генерирай документ
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DocumentGenerator;
