'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PressSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-16">Споменати в медиите</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {/* Press logos */}
          <Link href="#" className="grayscale hover:grayscale-0 transition-all">
            <Image 
              src="/press/capital.png" 
              alt="Капитал" 
              width={120} 
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          
          <Link href="#" className="grayscale hover:grayscale-0 transition-all">
            <Image 
              src="/press/dnevnik.png" 
              alt="Дневник" 
              width={120} 
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          
          <Link href="#" className="grayscale hover:grayscale-0 transition-all">
            <Image 
              src="/press/manager.png" 
              alt="Мениджър" 
              width={120} 
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          
          <Link href="#" className="grayscale hover:grayscale-0 transition-all">
            <Image 
              src="/press/forbes.png" 
              alt="Forbes България" 
              width={120} 
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          
          <Link href="#" className="grayscale hover:grayscale-0 transition-all">
            <Image 
              src="/press/investor.png" 
              alt="Investor.bg" 
              width={120} 
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          
          <Link href="#" className="grayscale hover:grayscale-0 transition-all">
            <Image 
              src="/press/digitalk.png" 
              alt="DigitalK" 
              width={120} 
              height={60}
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
