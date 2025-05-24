'use client';

import Link from 'next/link';
import { ShoppingCart, Cookie, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // Ensure we render consistently

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const baseClass = 'bg-brand-dark/90 backdrop-blur-md';
  const scrolledClass = 'bg-brand-dark/95 backdrop-blur-xl shadow-2xl border-b border-coral-500/20';

  return (
    <nav className={`w-full z-50 transition-all duration-500 ${hasMounted && isScrolled ? scrolledClass : baseClass}`}>
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral-500 via-gold-500 to-coral-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 z-10">
            <Link href="/menu" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-coral-500/30 to-gold-500/30 rounded-full scale-150 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-coral-500 to-gold-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Cookie className="h-6 w-6 text-brand-dark animate-pulse" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-transparent bg-gradient-to-r from-cream-500 to-gold-500 bg-clip-text tracking-wide">
                  MEERA
                </span>
                <span className="text-sm text-coral-500 font-bold -mt-1 tracking-widest">
                  BAKE HOME
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group px-6 py-3 rounded-full transition-all duration-300 hover:bg-coral-500/10"
              >
                <span className="relative text-cream-500 group-hover:text-gold-500 font-medium transition-colors duration-300">
                  {link.label}
                </span>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-coral-500 to-gold-500 group-hover:w-8 transition-all duration-300 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-coral-500/0 via-gold-500/0 to-coral-500/0 group-hover:from-coral-500/10 group-hover:via-gold-500/20 group-hover:to-coral-500/10 rounded-full transition-all duration-300 blur-sm"></div>
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            {/* Cart Icon */}
            <Link href="/cart" className="relative group">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-coral-500/20 to-gold-500/20 backdrop-blur-sm border border-coral-500/30 group-hover:from-coral-500/30 group-hover:to-gold-500/30 transition-all duration-300 group-hover:scale-110">
                <ShoppingCart className="h-5 w-5 text-cream-500 group-hover:text-gold-500 transition-colors duration-300" />
                {totalItems > 0 && (
                  <>
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-coral-500 to-gold-500 text-brand-dark text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-bounce">
                      {totalItems > 99 ? '99+' : totalItems}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-coral-500/20 animate-ping"></div>
                  </>
                )}
              </div>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gold-500/20 to-coral-500/20 backdrop-blur-sm border border-gold-500/30 group-hover:from-gold-500/30 group-hover:to-coral-500/30 transition-all duration-300">
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 text-cream-500 group-hover:text-coral-500 transition-all duration-300 rotate-90" />
                  ) : (
                    <Menu className="h-5 w-5 text-cream-500 group-hover:text-gold-500 transition-all duration-300" />
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-80 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}>
          <div className="relative bg-brand-dark/95 backdrop-blur-xl border-t border-coral-500/20 rounded-b-2xl mx-4 mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-coral-500/5 to-gold-500/5 rounded-2xl"></div>
            <div className="relative px-6 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block group transition-all duration-300 ${
                    isMobileMenuOpen ? 'animate-slideInFromLeft' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="relative px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-coral-500/10 hover:to-gold-500/10 transition-all duration-300 group-hover:scale-102">
                    <span className="text-cream-500 group-hover:text-gold-500 font-medium transition-colors duration-300">
                      {link.label}
                    </span>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-coral-500 to-gold-500 group-hover:h-6 transition-all duration-300 rounded-full"></div>
                  </div>
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
        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.4s ease-out;
        }
      `}</style>
    </nav>
  );
}
