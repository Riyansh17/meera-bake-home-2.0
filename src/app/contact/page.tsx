"use client";

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Heart } from 'lucide-react';

export default function ContactUsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-coral-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gold-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cream-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-coral-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-coral-500/30 mb-8">
            <Heart className="w-4 h-4 text-gold-500" />
            <span className="text-cream-500 text-sm font-medium tracking-wide">GET IN TOUCH</span>
            <Heart className="w-4 h-4 text-gold-500" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-coral-500 via-gold-500 to-coral-500 bg-clip-text mb-4">
            CONTACT US
          </h1>
          <p className="text-xl text-cream-400 max-w-2xl mx-auto font-light leading-relaxed">
            We'd love to hear from you! Reach out for orders, questions, or just to say hello
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className={`mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Location */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-brand-dark/80 backdrop-blur-md border border-coral-500/30 rounded-2xl p-8 text-center group-hover:border-gold-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-coral-500/30">
                  <MapPin className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-xl font-bold text-cream-500 mb-3">Visit Us</h3>
                <p className="text-cream-400 leading-relaxed">
                  Outside Chandpole,<br />
                  Bhinder ki Haveli,<br />
                  Udaipur (Raj) (313001)<br />
                  <span className="text-coral-500 font-medium">Home Based Bakery</span>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-coral-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-brand-dark/80 backdrop-blur-md border border-gold-500/30 rounded-2xl p-8 text-center group-hover:border-coral-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-500/20 to-coral-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-gold-500/30">
                  <Phone className="w-8 h-8 text-coral-500" />
                </div>
                <h3 className="text-xl font-bold text-cream-500 mb-3">Call Us</h3>
                <p className="text-cream-400 leading-relaxed">
                  <a href="tel:917073301913" className="text-gold-500 hover:text-gold-400 transition-colors font-medium text-lg">
                    (707) 330-1913
                  </a><br />
                  <span className="text-sm">For orders & inquiries</span>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="relative group md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-2xl blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-brand-dark/80 backdrop-blur-md border border-coral-500/30 rounded-2xl p-8 text-center group-hover:border-gold-500/50 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-coral-500/30">
                  <Mail className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-xl font-bold text-cream-500 mb-3">Email Us</h3>
                <p className="text-cream-400 leading-relaxed">
                  <a href="mailto:hello@meerabakehome.com" className="text-coral-500 hover:text-coral-400 transition-colors font-medium">
                    hello@meerabakehome.com
                  </a><br />
                  <span className="text-sm">We'll get back to you soon!</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours & WhatsApp */}
        <div className={`mb-16 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Hours */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-coral-500/20 rounded-3xl blur-sm"></div>
              <div className="relative bg-brand-dark/80 backdrop-blur-md border border-gold-500/30 rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-500/20 to-coral-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-gold-500/30">
                    <Clock className="w-6 h-6 text-coral-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-cream-500">Business Hours</h3>
                </div>

                <div className="space-y-3 text-cream-400">
                  <div className="flex justify-between items-center py-2 border-b border-coral-500/20">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-gold-500">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-coral-500/20">
                    <span className="font-medium">Saturday</span>
                    <span className="text-gold-500">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sunday</span>
                    <span className="text-coral-500">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Contact */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-3xl blur-sm"></div>
              <div className="relative bg-brand-dark/80 backdrop-blur-md border border-coral-500/30 rounded-3xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-coral-500/30">
                    <MessageCircle className="w-6 h-6 text-gold-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-cream-500">Quick Orders</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-cream-400 leading-relaxed">
                    Need something urgently? Message us on WhatsApp for quick orders and instant responses!
                  </p>

                  <a
                    href="https://wa.me/7073301913?text=Hi%20Meera%20Bake%20Home,%20I'd%20like%20to%20place%20an%20order!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Notice */}
        <div className={`mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-coral-500/10 to-gold-500/10 rounded-2xl blur-sm"></div>
            <div className="relative bg-brand-dark/60 backdrop-blur-md border border-coral-500/20 rounded-2xl p-6">
              <div className="text-center">
                <h4 className="text-lg font-bold text-cream-500 mb-2">📦 Order in Advance</h4>
                <p className="text-cream-400">
                  For custom cakes and large orders, please contact us <span className="text-coral-500 font-semibold">24-48 hours</span> in advance to ensure availability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action 
        <div className={`text-center transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-coral-500/30 to-gold-500/30 rounded-2xl blur-lg"></div>
            <div className="relative bg-gradient-to-r from-coral-500/20 to-gold-500/20 backdrop-blur-md border border-coral-500/40 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-cream-500 mb-4">Ready to Order?</h3>
              <p className="text-cream-400 text-lg mb-6 max-w-2xl">
                Don't wait! Contact us today and let us create something delicious just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-coral-500 to-gold-500 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                  <div className="relative bg-gradient-to-r from-coral-500 to-gold-500 text-brand-dark font-bold py-4 px-8 rounded-xl transform group-hover:scale-105 transition-all flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </div>
                </button>

                <button className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-coral-500 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
                  <div className="relative bg-gradient-to-r from-gold-500 to-coral-500 text-brand-dark font-bold py-4 px-8 rounded-xl transform group-hover:scale-105 transition-all flex items-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Send Email</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>*/}
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