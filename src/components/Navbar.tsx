'use client';

import Link from 'next/link';
import { ShoppingCart, ChefHat, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg' 
          : 'bg-brand-dark'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <ChefHat className="h-10 w-10 text-brand-gold transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand-gold/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-brand-cream tracking-wide">
                  MEERA
                </span>
                <span className="text-sm text-brand-gold font-medium -mt-1">
                  BAKE HOME
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-brand-cream hover:text-brand-gold font-medium transition-all duration-300 group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-12 h-12 text-brand-cream hover:bg-teal-700/50 rounded-full transition-all duration-300 group"
            >
              <ShoppingCart className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-coral text-brand-dark text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-12 h-12 text-brand-cream hover:bg-teal-700/50 rounded-full transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-teal-700 bg-brand-dark/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-brand-cream hover:bg-teal-700/50 hover:text-brand-gold rounded-lg font-medium transition-all duration-300 transform hover:translate-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isMobileMenuOpen ? 'slideInFromLeft 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}