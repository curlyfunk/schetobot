'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { generateDocument } from '../utils/pdfGenerator';

const DocumentGenerator = () => {
  const [documentType, setDocumentType] = useState('declaration');
  const [formData, setFormData] = useState({
    fullName: '',
    egn: '',
    address: '',
    email: '',
    phone: '',
    income: '',
    period: '',
    additionalInfo: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const documentTypes = [
    { id: 'declaration', name: 'Данъчна декларация' },
    { id: 'invoice', name: 'Фактура' },
    { id: 'contract', name: 'Договор' },
    { id: 'application', name: 'Заявление' },
    { id: 'certificate', name: 'Удостоверение' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // Simulate document generation process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate PDF document
      generateDocument(documentType, formData);
      
      setIsComplete(true);
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      egn: '',
      address: '',
      email: '',
      phone: '',
      income: '',
      period: '',
      additionalInfo: ''
    });
    setIsComplete(false);
  };

  return (
    <section id="document-generator" className="py-16 bg-white">
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
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-light-gray rounded-2xl p-6 md:p-8 shadow-sm">
            {!isComplete ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <label className="block text-dark-blue font-medium mb-2">Изберете тип документ</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {documentTypes.map((type) => (
                      <div key={type.id}>
                        <input
                          type="radio"
                          id={type.id}
                          name="documentType"
                          value={type.id}
                          checked={documentType === type.id}
                          onChange={() => setDocumentType(type.id)}
                          className="sr-only peer"
                        />
                        <label
                          htmlFor={type.id}
                          className="flex items-center justify-center p-3 bg-white border rounded-lg cursor-pointer transition-colors peer-checked:bg-electric-blue peer-checked:text-white peer-checked:border-electric-blue hover:bg-gray-50 peer-checked:hover:bg-electric-blue-dark text-center"
                        >
                          {type.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-dark-blue font-medium mb-2">Име и фамилия</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="egn" className="block text-dark-blue font-medium mb-2">ЕГН</label>
                      <input
                        type="text"
                        id="egn"
                        name="egn"
                        value={formData.egn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                        required
                        pattern="[0-9]{10}"
                        title="ЕГН трябва да съдържа 10 цифри"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-dark-blue font-medium mb-2">Адрес</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-dark-blue font-medium mb-2">Имейл</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-dark-blue font-medium mb-2">Телефон</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  {(documentType === 'declaration' || documentType === 'invoice') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="income" className="block text-dark-blue font-medium mb-2">Доход/Сума</label>
                        <input
                          type="number"
                          id="income"
                          name="income"
                          value={formData.income}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="period" className="block text-dark-blue font-medium mb-2">Период</label>
                        <input
                          type="text"
                          id="period"
                          name="period"
                          value={formData.period}
                          onChange={handleInputChange}
                          placeholder="напр. 01.01.2025 - 31.03.2025"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="additionalInfo" className="block text-dark-blue font-medium mb-2">Допълнителна информация</label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-electric-blue text-white font-medium rounded-lg hover:bg-electric-blue-dark transition-colors flex items-center"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Генериране...
                        </>
                      ) : (
                        'Генерирай документ'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-dark-blue mb-2">Документът е готов!</h3>
                <p className="text-dark-gray mb-6">
                  Вашият документ беше успешно генериран и е готов за изтегляне.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-electric-blue text-white font-medium rounded-lg hover:bg-electric-blue-dark transition-colors"
                  >
                    Изтегли PDF
                  </button>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-electric-blue text-electric-blue font-medium rounded-lg hover:bg-electric-blue/5 transition-colors"
                  >
                    Създай нов документ
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Всички генерирани документи са в съответствие с актуалното законодателство към момента на създаване. Моля, проверете информацията преди официално използване.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentGenerator;
