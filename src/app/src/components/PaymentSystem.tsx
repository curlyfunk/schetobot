'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PaymentSystem = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };
  
  const resetPayment = () => {
    setIsComplete(false);
    setPaymentMethod('card');
  };

  return (
    <section id="payment" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-accent text-dark-blue mb-4">Сигурни плащания</h2>
          <p className="text-xl text-dark-gray max-w-3xl mx-auto">
            Бързо и сигурно заплащане на услуги с различни методи на плащане.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-light-gray rounded-2xl p-6 md:p-8 shadow-sm">
            {!isComplete ? (
              <form onSubmit={handlePayment}>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-dark-blue mb-4">Изберете метод на плащане</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="card"
                        className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg cursor-pointer transition-colors peer-checked:bg-electric-blue/10 peer-checked:border-electric-blue hover:bg-gray-50"
                      >
                        <svg className="w-8 h-8 text-electric-blue mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="font-medium">Кредитна карта</span>
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="bank"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="bank"
                        className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg cursor-pointer transition-colors peer-checked:bg-electric-blue/10 peer-checked:border-electric-blue hover:bg-gray-50"
                      >
                        <svg className="w-8 h-8 text-electric-blue mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <span className="font-medium">Банков превод</span>
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="paypal"
                        className="flex flex-col items-center justify-center p-4 bg-white border rounded-lg cursor-pointer transition-colors peer-checked:bg-electric-blue/10 peer-checked:border-electric-blue hover:bg-gray-50"
                      >
                        <svg className="w-8 h-8 text-electric-blue mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">PayPal</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="cardName" className="block text-dark-blue font-medium mb-2">Име на картодържателя</label>
                      <input
                        type="text"
                        id="cardName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                        placeholder="Име Фамилия"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-dark-blue font-medium mb-2">Номер на карта</label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-dark-blue font-medium mb-2">Срок на валидност</label>
                        <input
                          type="text"
                          id="expiryDate"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-dark-blue font-medium mb-2">CVV код</label>
                        <input
                          type="text"
                          id="cvv"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'bank' && (
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium text-dark-blue mb-2">Банкова информация</h4>
                      <p className="text-dark-gray mb-4">
                        Моля, използвайте следната информация за банков превод:
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Получател:</span>
                          <span className="font-medium">e-doc.bg ООД</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">IBAN:</span>
                          <span className="font-medium">BG80 BNBG 9661 1020 3456 78</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">BIC:</span>
                          <span className="font-medium">BNBGBGSF</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Банка:</span>
                          <span className="font-medium">Банка ДСК</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Основание:</span>
                          <span className="font-medium">Абонамент e-doc.bg</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="transferConfirmation" className="block text-dark-blue font-medium mb-2">Потвърждение за превод</label>
                      <input
                        type="file"
                        id="transferConfirmation"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                        accept="image/*,.pdf"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Опционално: Качете потвърждение за направения превод (скрийншот или PDF).
                      </p>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'paypal' && (
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border text-center">
                      <svg className="w-16 h-16 mx-auto text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-dark-gray mb-4">
                        Ще бъдете пренасочени към PayPal за завършване на плащането след натискане на бутона "Плати".
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-electric-blue text-white font-medium rounded-lg hover:bg-electric-blue-dark transition-colors flex items-center"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Обработка...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Плати
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-dark-blue mb-2">Плащането е успешно!</h3>
                <p className="text-dark-gray mb-6">
                  Вашето плащане беше обработено успешно. Благодарим ви за доверието!
                </p>
                <div className="bg-light-gray p-4 rounded-lg mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Номер на транзакция:</span>
                    <span className="font-medium">TXN-{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Дата:</span>
                    <span className="font-medium">{new Date().toLocaleDateString('bg-BG')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Метод на плащане:</span>
                    <span className="font-medium">
                      {paymentMethod === 'card' && 'Кредитна карта'}
                      {paymentMethod === 'bank' && 'Банков превод'}
                      {paymentMethod === 'paypal' && 'PayPal'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={resetPayment}
                  className="px-6 py-3 border border-electric-blue text-electric-blue font-medium rounded-lg hover:bg-electric-blue/5 transition-colors"
                >
                  Ново плащане
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-dark-gray">Сигурни плащания</span>
            </div>
            <div className="flex items-center">
              <svg className="w-8 h-8 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-dark-gray">SSL защита</span>
            </div>
            <div className="flex items-center">
              <svg className="w-8 h-8 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-dark-gray">Фактура</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSystem;
