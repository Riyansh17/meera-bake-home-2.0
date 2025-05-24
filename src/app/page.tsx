"use client";

import React, { useState, useEffect } from 'react';
import { Cookie, Sparkles, ArrowRight } from 'lucide-react';

export default function MeeraBakeHome() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-brand-dark">
      {/* Dynamic background with mouse interaction */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(248, 171, 172, 0.3) 0%, rgba(252, 214, 128, 0.2) 30%, transparent 70%)`
        }}
      />
      
      {/* Geometric shapes */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-coral-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gold-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cream-500 rounded-full opacity-5 blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className={`transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            
            {/* Decorative text above */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-coral-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-coral-500/30">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span className="text-cream-500 text-sm font-medium tracking-wide">EST. 2024</span>
                <Sparkles className="w-4 h-4 text-gold-500" />
              </div>
            </div>

            {/* Main brand name with creative layout */}
            <div className="text-center mb-12">
              <div className="relative">
                <h1 className="text-8xl md:text-9xl font-black tracking-tight">
                  <span className="block text-cream-500 leading-none">MEERA</span>
                  <span className="block text-transparent bg-gradient-to-r from-coral-500 via-gold-500 to-coral-500 bg-clip-text leading-none -mt-4">BAKE</span>
                </h1>
                
                {/* Decorative cookie icon */}
                <div className="absolute -top-8 -right-8 md:-right-16">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold-500 to-coral-500 rounded-full flex items-center justify-center animate-spin-slow shadow-2xl">
                    <Cookie className="w-8 h-8 md:w-10 md:h-10 text-brand-dark" />
                  </div>
                </div>
              </div>
              
              {/* Subtitle with modern typography */}
              <div className="mt-8 space-y-2">
                <p className="text-2xl md:text-3xl text-gold-500 font-light tracking-widest">H O M E</p>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-coral-500 to-transparent mx-auto"></div>
              </div>
            </div>

            {/* Description */}
            <div className={`text-center mb-16 transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-lg md:text-xl text-cream-400 max-w-2xl mx-auto font-light leading-relaxed">
                Artisanal baked goods crafted with passion, served with love from our kitchen to your table
              </p>
            </div>

            {/* CTA with modern design */}
            <div className={`text-center transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <a href="/menu" className="group relative inline-flex items-center">
                {/* Button background */}
                <div className="absolute inset-0 bg-gradient-to-r from-coral-500 to-gold-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button content */}
                <div className="relative bg-gradient-to-r from-coral-500 to-gold-500 text-brand-dark px-12 py-4 rounded-full font-bold text-lg tracking-wide hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
                  EXPLORE MENU
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </a>
            </div>

            {/* Bottom decorative element */}
            <div className={`text-center mt-20 transform transition-all duration-1500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex justify-center space-x-4">
                <div className="w-2 h-2 bg-coral-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse delay-300"></div>
                <div className="w-2 h-2 bg-cream-500 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom CSS for slow spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}