'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navItems = [
    { name: 'Начало', href: '/' },
    { name: 'Документи', href: '/documents' },
    { name: 'Цени', href: '/pricing' },
    { name: 'Как работи?', href: '/how-it-works' },
    { name: 'Помощ', href: '/help' },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-electric-blue">e-doc.bg</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-dark-gray hover:text-electric-blue transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop CTA and Language */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center text-dark-gray hover:text-electric-blue transition-colors">
                <span>BG</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link href="#" className="block px-4 py-2 text-sm text-dark-gray hover:bg-gray-100">EN</Link>
              </div>
            </div>
            
            <Link 
              href="/login" 
              className="text-electric-blue hover:text-electric-blue-dark transition-colors font-medium"
            >
              Вход
            </Link>
            
            <Link 
              href="/register" 
              className="bg-electric-blue hover:bg-electric-blue-dark text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Започнете безплатно
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-dark-gray hover:text-electric-blue"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
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
      
      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden bg-white shadow-md overflow-hidden`}
        initial={{ height: 0 }}
        animate={{ height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="text-dark-gray hover:text-electric-blue transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Link 
                href="/login" 
                className="block text-electric-blue hover:text-electric-blue-dark transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Вход
              </Link>
              <Link 
                href="/register" 
                className="block bg-electric-blue hover:bg-electric-blue-dark text-white px-4 py-2 rounded-lg transition-colors font-medium mt-4 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Започнете безплатно
              </Link>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <button className="flex items-center text-dark-gray hover:text-electric-blue transition-colors py-2">
                <span>BG</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Link href="#" className="block text-dark-gray hover:text-electric-blue transition-colors py-2 pl-4">
                EN
              </Link>
            </div>
          </nav>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
