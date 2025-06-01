'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('bg');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bg' ? 'en' : 'bg');
  };

  const menuItems = [
    { name: 'Начало', href: '/' },
    { name: 'Документи', href: '/documents' },
    { name: 'Калкулатори', href: '/calculators' },
    { name: 'Данъчен календар', href: '/tax-calendar' },
    { name: 'Цени', href: '/pricing' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакти', href: '/contacts' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-electric-blue">e-doc.bg</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-dark-gray hover:text-electric-blue transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-dark-gray hover:text-electric-blue transition-colors"
            >
              {language === 'bg' ? 'EN' : 'БГ'}
            </button>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-electric-blue text-electric-blue hover:bg-electric-blue/5 transition-colors"
            >
              Вход
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-electric-blue text-white hover:bg-electric-blue-dark transition-colors"
            >
              Регистрация
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-dark-gray hover:text-electric-blue transition-colors"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-2 space-y-1 bg-white border-t border-gray-200">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block py-2 text-dark-gray hover:text-electric-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 pb-4 border-t border-gray-200 mt-2 flex flex-col space-y-2">
            <button
              onClick={toggleLanguage}
              className="py-2 text-dark-gray hover:text-electric-blue transition-colors text-left"
            >
              {language === 'bg' ? 'English' : 'Български'}
            </button>
            <Link
              href="/login"
              className="py-2 text-electric-blue hover:underline transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Вход
            </Link>
            <Link
              href="/register"
              className="py-2 px-4 rounded-lg bg-electric-blue text-white hover:bg-electric-blue-dark transition-colors text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Регистрация
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
