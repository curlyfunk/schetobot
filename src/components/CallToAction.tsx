'use client';

import React from 'react';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-purple text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Готови ли сте да опростите вашето счетоводство?</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Присъединете се към хилядите самоосигуряващи се лица и малки бизнеси, които вече използват e-doc.bg за своите счетоводни нужди. Започнете безплатно днес!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/register" className="bg-white text-primary px-8 py-3 rounded-lg font-medium shadow-md hover:bg-accent transition-all">
            Започнете безплатно
          </Link>
          <Link href="/demo" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-all">
            Вижте демо
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
