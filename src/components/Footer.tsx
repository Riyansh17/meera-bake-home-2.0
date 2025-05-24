'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Cookie, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter,
  Heart,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-coral-500' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-gold-500' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-cream-500' },
  ];

  return (
    <footer id="footer" className="relative bg-brand-dark border-t border-coral-500/20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-coral-500 rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-gold-500 rounded-full opacity-5 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral-500 via-gold-500 to-coral-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 md:py-16">
          
          {/* Mobile Layout (< 768px) */}
          <div className="block md:hidden space-y-8">
            {/* Brand Section */}
            <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center justify-center space-x-3 mb-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-coral-500/30 to-gold-500/30 rounded-full scale-150 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-coral-500 to-gold-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Cookie className="h-5 w-5 text-brand-dark animate-pulse" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-2.5 h-2.5 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-transparent bg-gradient-to-r from-cream-500 to-gold-500 bg-clip-text tracking-wide">
                    MEERA
                  </span>
                  <span className="text-xs text-coral-500 font-bold -mt-1 tracking-widest">
                    BAKE HOME
                  </span>
                </div>
              </div>
              
              <p className="text-cream-400 text-sm leading-relaxed mb-4 px-4">
                Crafting moments of joy with every bite. Our artisanal treats are baked fresh daily.
              </p>
            </div>

            {/* Contact Info */}
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-base font-bold text-cream-500 mb-4 text-center">Contact Us</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4 text-gold-500" />
                  <a href="tel:+1234567890" className="text-sm text-cream-400 hover:text-gold-500 transition-colors duration-300">
                    (123) 456-7890
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4 text-cream-500" />
                  <a href="mailto:hello@meerabakehome.com" className="text-sm text-cream-400 hover:text-coral-500 transition-colors duration-300">
                    hello@meerabakehome.com
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4 text-gold-500" />
                  <div className="text-sm text-cream-400 text-center">
                    <p>Mon-Sat: 7AM-8PM</p>
                    <p>Sunday: 8AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet and Desktop Layout (≥ 768px) */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center space-x-4 mb-6 group">
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
              </div>
              
              <p className="text-cream-400 leading-relaxed text-sm lg:text-base">
                Crafting moments of joy with every bite. Our artisanal treats are baked fresh daily with premium ingredients.
              </p>
            </div>

            {/* Contact Info */}
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-lg font-bold text-cream-500 mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-cream-500 to-gold-500 rounded-full mr-3"></div>
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-full flex items-center justify-center group-hover:from-coral-500/30 group-hover:to-gold-500/30 transition-all duration-300">
                    <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-coral-500" />
                  </div>
                  <div>
                    <p className="text-cream-400 leading-relaxed text-sm lg:text-base">
                      123 Sweet Street<br />
                      Bakery District<br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 group">
                  <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-gold-500/20 to-coral-500/20 rounded-full flex items-center justify-center group-hover:from-gold-500/30 group-hover:to-coral-500/30 transition-all duration-300">
                    <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-gold-500" />
                  </div>
                  <a href="tel:+1234567890" className="text-cream-400 hover:text-gold-500 transition-colors duration-300 text-sm lg:text-base">
                    (123) 456-7890
                  </a>
                </div>

                <div className="flex items-center space-x-3 group">
                  <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-cream-500/20 to-coral-500/20 rounded-full flex items-center justify-center group-hover:from-cream-500/30 group-hover:to-coral-500/30 transition-all duration-300">
                    <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-cream-500" />
                  </div>
                  <a href="mailto:hello@meerabakehome.com" className="text-cream-400 hover:text-coral-500 transition-colors duration-300 text-sm lg:text-base">
                    hello@meerabakehome.com
                  </a>
                </div>

                <div className="flex items-center space-x-3 group">
                  <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-gold-500/20 to-cream-500/20 rounded-full flex items-center justify-center group-hover:from-gold-500/30 group-hover:to-cream-500/30 transition-all duration-300">
                    <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-gold-500" />
                  </div>
                  <div className="text-cream-400">
                    <p className="text-sm lg:text-base">Mon-Sat: 7AM-8PM</p>
                    <p className="text-sm lg:text-base">Sunday: 8AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-gold-500/20 py-6 sm:py-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="text-cream-400 text-xs sm:text-sm mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`group relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-coral-500/20 to-gold-500/20 backdrop-blur-sm border border-coral-500/30 rounded-full flex items-center justify-center hover:from-coral-500/30 hover:to-gold-500/30 transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-cream-400 group-hover:text-current transition-colors duration-300" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-cream-400 text-xs sm:text-sm text-center sm:text-left">
              <span>© 2024 Meera Bake Home. Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-coral-500 animate-pulse" />
              <span>for sweet moments.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;