'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import generateDocument from './pdfGenerator';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  fields: FormField[];
}

const DocumentGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'select' | 'fill' | 'preview'>('select');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Document templates
  const documentTemplates: DocumentTemplate[] = [
    {
      id: 'gfo-no-activity',
      name: 'ГФО за фирма без дейност',
      description: 'Годишен финансов отчет за фирма без дейност',
      category: 'accounting',
      icon: 'document',
      fields: [
        { id: 'companyName', label: 'Име на фирмата', type: 'text', required: true },
        { id: 'bulstat', label: 'ЕИК/БУЛСТАТ', type: 'text', required: true },
        { id: 'address', label: 'Адрес на фирмата', type: 'text', required: true },
        { id: 'managerName', label: 'Име на управителя', type: 'text', required: true },
        { id: 'year', label: 'Година', type: 'select', options: [
          { value: '2025', label: '2025' },
          { value: '2024', label: '2024' },
          { value: '2023', label: '2023' },
        ], required: true },
      ]
    },
    {
      id: 'service-contract',
      name: 'Договор за услуга',
      description: 'Стандартен договор за предоставяне на услуги',
      category: 'contracts',
      icon: 'contract',
      fields: [
        { id: 'providerName', label: 'Име на изпълнителя', type: 'text', required: true },
        { id: 'providerID', label: 'ЕИК/БУЛСТАТ/ЕГН на изпълнителя', type: 'text', required: true },
        { id: 'clientName', label: 'Име на възложителя', type: 'text', required: true },
        { id: 'clientID', label: 'ЕИК/БУЛСТАТ/ЕГН на възложителя', type: 'text', required: true },
        { id: 'serviceDescription', label: 'Описание на услугата', type: 'textarea', required: true },
        { id: 'price', label: 'Цена', type: 'text', required: true },
        { id: 'deadline', label: 'Краен срок', type: 'date', required: true },
      ]
    },
    {
      id: 'cv-template',
      name: 'Автобиография (CV)',
      description: 'Професионална автобиография в стандартен формат',
      category: 'personal',
      icon: 'cv',
      fields: [
        { id: 'fullName', label: 'Пълно име', type: 'text', required: true },
        { id: 'email', label: 'Имейл', type: 'text', required: true },
        { id: 'phone', label: 'Телефон', type: 'text', required: true },
        { id: 'address', label: 'Адрес', type: 'text' },
        { id: 'summary', label: 'Професионално резюме', type: 'textarea', required: true },
        { id: 'experience', label: 'Професионален опит', type: 'textarea', required: true },
        { id: 'education', label: 'Образование', type: 'textarea', required: true },
        { id: 'skills', label: 'Умения', type: 'textarea', required: true },
      ]
    },
    {
      id: 'invoice-template',
      name: 'Фактура',
      description: 'Стандартна фактура за стоки или услуги',
      category: 'accounting',
      icon: 'invoice',
      fields: [
        { id: 'invoiceNumber', label: 'Номер на фактура', type: 'text', required: true },
        { id: 'issueDate', label: 'Дата на издаване', type: 'date', required: true },
        { id: 'sellerName', label: 'Име на продавача', type: 'text', required: true },
        { id: 'sellerVAT', label: 'ЕИК/БУЛСТАТ на продавача', type: 'text', required: true },
        { id: 'sellerAddress', label: 'Адрес на продавача', type: 'text', required: true },
        { id: 'buyerName', label: 'Име на купувача', type: 'text', required: true },
        { id: 'buyerVAT', label: 'ЕИК/БУЛСТАТ/ЕГН на купувача', type: 'text', required: true },
        { id: 'buyerAddress', label: 'Адрес на купувача', type: 'text', required: true },
        { id: 'items', label: 'Описание на стоките/услугите', type: 'textarea', required: true },
        { id: 'totalAmount', label: 'Сума без ДДС', type: 'number', required: true },
        { id: 'vatAmount', label: 'ДДС', type: 'number', required: true },
        { id: 'totalWithVAT', label: 'Обща сума с ДДС', type: 'number', required: true },
      ]
    },
    {
      id: 'declaration-no-conflict',
      name: 'Декларация за липса на конфликт на интереси',
      description: 'Стандартна декларация за липса на конфликт на интереси',
      category: 'declarations',
      icon: 'declaration',
      fields: [
        { id: 'declaratorName', label: 'Име на декларатора', type: 'text', required: true },
        { id: 'declaratorID', label: 'ЕГН на декларатора', type: 'text', required: true },
        { id: 'position', label: 'Длъжност', type: 'text', required: true },
        { id: 'companyName', label: 'Име на фирмата/организацията', type: 'text', required: true },
        { id: 'projectName', label: 'Име на проекта/процедурата', type: 'text', required: true },
        { id: 'declarationDate', label: 'Дата на декларацията', type: 'date', required: true },
      ]
    },
  ];
  
  // Categories
  const categories = [
    { id: 'all', name: 'Всички' },
    { id: 'accounting', name: 'Счетоводство' },
    { id: 'contracts', name: 'Договори' },
    { id: 'declarations', name: 'Декларации' },
    { id: 'personal', name: 'Лични документи' },
  ];
  
  // Filter templates by search query and category
  const filteredTemplates = documentTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle template selection
  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setFormData({});
    setStep('fill');
  };
  
  // Handle form input change
  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };
  
  // Check if form is complete
  const isFormComplete = () => {
    if (!selectedTemplate) return false;
    
    return selectedTemplate.fields.every(field => {
      if (field.required) {
        return formData[field.id] && formData[field.id].trim() !== '';
      }
      return true;
    });
  };
  
  // Generate document
  const handleGenerateDocument = () => {
    if (!selectedTemplate) return;
    
    try {
      const doc = generateDocument(selectedTemplate.id, formData);
      doc.save(`${selectedTemplate.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Възникна грешка при генерирането на документа. Моля, опитайте отново.');
    }
  };
  
  // Reset to template selection
  const handleReset = () => {
    setSelectedTemplate(null);
    setFormData({});
    setStep('select');
  };
  
  // Render template selection step
  const renderTemplateSelection = () => (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark-blue mb-4">Изберете документ</h2>
        <p className="text-dark-gray mb-6">
          Разгледайте нашата библиотека от документи и изберете този, от който се нуждаете.
        </p>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Търсете по име или описание..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
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
        
        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => handleSelectTemplate(template)}
            >
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-4">
                <div className="text-electric-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-dark-blue mb-2">{template.name}</h3>
              <p className="text-dark-gray mb-4">{template.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-electric-blue">{categories.find(c => c.id === template.category)?.name}</span>
                <span className="text-sm text-dark-gray">{template.fields.length} полета</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-gray">Не са намерени документи, отговарящи на вашето търсене.</p>
          </div>
        )}
      </div>
    </div>
  );
  
  // Render form step
  const renderForm = () => {
    if (!selectedTemplate) return null;
    
    return (
      <div>
        <div className="mb-8">
          <button
            onClick={handleReset}
            className="flex items-center text-electric-blue hover:text-electric-blue-dark transition-colors mb-4"
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад към всички документи
          </button>
          
          <h2 className="text-2xl font-bold text-dark-blue mb-2">{selectedTemplate.name}</h2>
          <p className="text-dark-gray mb-6">{selectedTemplate.description}</p>
          
          <form className="space-y-6">
            {selectedTemplate.fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-dark-gray mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                    required={field.required}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.id}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                    required={field.required}
                  >
                    <option value="">Изберете...</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                    required={field.required}
                  />
                )}
              </div>
            ))}
            
            <div className="pt-4">
              <button
                type="button"
                onClick={handleGenerateDocument}
                disabled={!isFormComplete()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isFormComplete()
                    ? 'bg-electric-blue hover:bg-electric-blue-dark text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Генерирай документ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <section className="py-16 bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Генератор на документи</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Създайте професионални документи бързо и лесно с нашия интуитивен генератор.
          </p>
        </motion.div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            {step === 'select' && renderTemplateSelection()}
            {step === 'fill' && renderForm()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentGenerator;
