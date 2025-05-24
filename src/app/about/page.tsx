"use client";

import { useState, useEffect } from 'react';
import { Heart, Cookie, Users, Award, Sparkles, ChefHat, Clock, Star } from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-coral-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gold-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cream-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-coral-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-coral-500/30 mb-8">
            <Heart className="w-4 h-4 text-gold-500" />
            <span className="text-cream-500 text-sm font-medium tracking-wide">BAKED WITH LOVE</span>
            <Heart className="w-4 h-4 text-gold-500" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-coral-500 via-gold-500 to-coral-500 bg-clip-text mb-4">
            ABOUT US
          </h1>
          <p className="text-xl text-cream-400 max-w-2xl mx-auto font-light leading-relaxed">
            Meet the heart and soul behind every delicious creation at Meera Bake Home
          </p>
        </div>

        {/* Main Story Section */}
        <div className={`mb-20 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-coral-500/20 to-gold-500/20 rounded-3xl blur-sm"></div>
                <div className="relative bg-brand-dark/80 backdrop-blur-md border border-coral-500/30 rounded-3xl p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-coral-500/30">
                      <ChefHat className="w-6 h-6 text-gold-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-cream-500">Our Story</h2>
                  </div>

                  <div className="space-y-4 text-cream-400 leading-relaxed">
                    <p className="text-lg">
                      Welcome to <span className="text-coral-500 font-semibold">Meera Bake Home</span>, where every treat tells a story of passion, dedication, and love for the art of baking.
                    </p>

                    <p>
                      Founded in <span className="text-gold-500 font-semibold">2023</span> by <span className="text-coral-500 font-semibold">Gouri Kumawat</span>, our home bakery began as a dream to share the joy of freshly baked goods with our community. What started as a personal passion for creating delicious treats has blossomed into a beloved local bakery that brings smiles to faces every day.
                    </p>

                    <p>
                      From our cozy home kitchen, we craft each item with the finest ingredients and time-honored techniques. Every cookie, cake, and pastry is made with the same care and attention we'd give to treats for our own family.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Highlight */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-coral-500/20 rounded-3xl blur-sm"></div>
              <div className="relative bg-brand-dark/80 backdrop-blur-md border border-gold-500/30 rounded-3xl p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-coral-500/30 to-gold-500/30 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border-2 border-coral-500/40">
                  <Cookie className="w-12 h-12 text-gold-500" />
                </div>

                <h3 className="text-2xl font-bold text-cream-500 mb-2">Gouri Kumawat</h3>
                <p className="text-coral-500 font-medium mb-4">Founder & Head Baker</p>

                <div className="space-y-3 text-cream-400">
                  <p className="italic">"Baking isn't just my profession, it's my passion. Every creation that leaves our kitchen carries a piece of my heart."</p>

                  <div className="flex items-center justify-center space-x-2 pt-4">
                    <Clock className="w-4 h-4 text-gold-500" />
                    <span className="text-sm text-cream-500">Baking since 2015</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`mb-20 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-coral-500 to-gold-500 bg-clip-text mb-4">
              What Makes Us Special
            </h2>
            <p className="text-cream-400 text-lg max-w-2xl mx-auto">
              Our commitment to quality, freshness, and customer satisfaction sets us apart
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Made with Love",
                description: "Every item is crafted with genuine care and passion for baking excellence"
              },
              {
                icon: Sparkles,
                title: "Fresh Daily",
                description: "All our treats are baked fresh daily using the finest quality ingredients"
              },
              {
                icon: Users,
                title: "Community First",
                description: "We're proud to serve our local community with personalized service"
              },
              {
                icon: Award,
                title: "Quality Promise",
                description: "We never compromise on quality, ensuring every bite is perfect"
              }
            ].map((value, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 hover:scale-105"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
                  <div className="relative bg-brand-dark/80 backdrop-blur-md border border-coral-500/30 rounded-2xl p-6 text-center group-hover:border-gold-500/50 transition-all">
                    <div className="w-16 h-16 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-coral-500/30">
                      <value.icon className="w-8 h-8 text-gold-500" />
                    </div>
                    <h3 className="text-xl font-bold text-cream-500 mb-3">{value.title}</h3>
                    <p className="text-cream-400 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-coral-500/10 to-gold-500/10 rounded-3xl blur-sm"></div>
            <div className="relative bg-brand-dark/60 backdrop-blur-md border border-coral-500/20 rounded-3xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "2023", label: "Est. Year", icon: Clock },
                  { number: "500+", label: "Happy Customers", icon: Users },
                  { number: "1000+", label: "Treats Baked", icon: Cookie },
                  { number: "100%", label: "Love Added", icon: Heart }
                ].map((stat, index) => (
                  <div key={index} className="space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-coral-500/30">
                      <stat.icon className="w-6 h-6 text-gold-500" />
                    </div>
                    <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-coral-500 to-gold-500 bg-clip-text">
                      {stat.number}
                    </div>
                    <div className="text-cream-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-coral-500/30 to-gold-500/30 rounded-2xl blur-lg"></div>
            <div className="relative bg-gradient-to-r from-coral-500/20 to-gold-500/20 backdrop-blur-md border border-coral-500/40 rounded-2xl p-8">

              <h3 className="text-3xl font-bold text-cream-500 mb-4">Ready to Taste the Magic?</h3>
              <p className="text-cream-400 text-lg mb-6 max-w-2xl">
                Experience the difference that passion and quality make. Order your favorite treats today!
              </p>

              <Link href="/menu">
                <button className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-coral-500 to-gold-500 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                  <div className="relative bg-gradient-to-r from-coral-500 to-gold-500 text-brand-dark font-bold py-4 px-8 rounded-xl transform group-hover:scale-105 transition-all flex items-center space-x-2">
                    <span>Explore Our Menu</span>
                    <Star className="w-5 h-5" />
                  </div>
                </button>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}