'use client';

import { useState, useEffect } from 'react';
import { FoodItem } from '@/types/item';
import { getAvailableFoodItems } from '@/firebase/db';
import FoodItemCard from '@/components/FoodItems';
import { Search, Filter, Sparkles, Cookie, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    loadFoodItems();
    setIsVisible(true);
  }, []);

  const loadFoodItems = async () => {
    try {
      const items = await getAvailableFoodItems();
      setFoodItems(items);
    } catch (error) {
      console.error('Error loading food items:', error);
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(foodItems.map(item => item.category)))];

  const clearSearch = () => {
    setSearchTerm('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setShowMobileFilters(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark relative overflow-hidden">
        {/* Background effects - responsive sizing */}
        <div className="absolute top-10 left-5 sm:top-20 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-coral-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-gold-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>

        <div className="flex items-center justify-center h-screen pt-16 sm:pt-20 px-4">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-brand-coral border-t-brand-gold rounded-full animate-spin"></div>
              <Cookie className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-brand-gold" />
            </div>
            <p className="text-brand-cream mt-4 font-medium text-sm sm:text-base">Loading delicious treats...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark relative overflow-hidden">

      {/* Background effects - responsive positioning and sizing */}
      <div className="absolute top-10 left-5 sm:top-20 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-coral-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-gold-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cream-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16">
        {/* Header Section - responsive text sizing */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-coral-500/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-coral-500/30 mb-4 sm:mb-6 md:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-500" />
            <span className="text-cream-500 text-xs sm:text-sm font-medium tracking-wide">FRESH DAILY</span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-500" />
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-coral-500 via-gold-500 to-coral-500 bg-clip-text mb-2 sm:mb-4 px-2">
            OUR MENU
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-cream-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Artisanal treats baked fresh daily with premium ingredients and endless love
          </p>
        </div>

        {/* Search and Filter Section - mobile-optimized */}
        <div className={`mb-8 sm:mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Desktop/Tablet Layout */}
          <div className="hidden sm:flex flex-col lg:flex-row gap-4 sm:gap-6 max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-0 bg-gradient-to-r from-coral-500/20 to-gold-500/20 rounded-2xl blur-sm"></div>
              <div className="relative bg-brand-dark/80 backdrop-blur-md border border-coral-500/30 rounded-2xl p-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-500 h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="text"
                    placeholder="Search for your favorite treats..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-6 py-3 sm:py-4 bg-transparent text-cream-500 placeholder-cream-400/70 focus:outline-none text-sm sm:text-lg"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cream-400 hover:text-coral-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative lg:w-64">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-coral-500/20 rounded-2xl blur-sm"></div>
              <div className="relative bg-brand-dark/80 backdrop-blur-md border border-gold-500/30 rounded-2xl p-1">
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-coral-500 h-4 w-4 sm:h-5 sm:w-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-8 py-3 sm:py-4 bg-transparent text-cream-500 focus:outline-none text-sm sm:text-lg appearance-none cursor-pointer"
                  >
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-brand-dark text-cream-500">
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-coral-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="sm:hidden space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-coral-500/20 to-gold-500/20 rounded-xl blur-sm"></div>
              <div className="relative bg-brand-dark/80 backdrop-blur-md border border-coral-500/30 rounded-xl p-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search treats..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-10 py-3 bg-transparent text-cream-500 placeholder-cream-400/70 focus:outline-none text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cream-400 hover:text-coral-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex-1 relative bg-brand-dark/80 backdrop-blur-md border border-gold-500/30 rounded-xl px-4 py-3 flex items-center justify-center space-x-2 hover:bg-gold-500/10 transition-colors"
              >
                <Filter className="h-4 w-4 text-coral-500" />
                <span className="text-cream-500 text-sm font-medium">
                  {selectedCategory === 'all' ? 'Filter' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </span>
              </button>
              
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-coral-500/20 border border-coral-500/30 rounded-xl text-coral-500 text-sm font-medium hover:bg-coral-500/30 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Mobile Category Filter Dropdown */}
            {showMobileFilters && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-coral-500/20 rounded-xl blur-sm"></div>
                <div className="relative bg-brand-dark/90 backdrop-blur-md border border-gold-500/30 rounded-xl p-4 space-y-2">
                  <h3 className="text-cream-500 font-medium text-sm mb-3">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowMobileFilters(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? 'bg-coral-500/20 text-coral-500 border border-coral-500/30'
                            : 'bg-brand-dark/50 text-cream-400 border border-cream-400/10 hover:border-coral-500/30 hover:text-coral-500'
                        }`}
                      >
                        {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 sm:py-20 px-4">
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-coral-500/30">
                  <Cookie className="w-8 h-8 sm:w-12 sm:h-12 text-gold-500" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-cream-500 mb-2">No treats found</h3>
              <p className="text-cream-400 text-sm sm:text-lg">Try adjusting your search or browse all categories</p>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="text-center mb-6 sm:mb-8">
                <p className="text-cream-400 text-sm sm:text-lg">
                  Found <span className="text-gold-500 font-semibold">{filteredItems.length}</span> delicious {filteredItems.length === 1 ? 'item' : 'items'}
                </p>
              </div>

              {/* Food Items Grid - responsive grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="transform transition-all duration-500 hover:scale-105 active:scale-95"
                    style={{
                      animationName: isVisible ? 'fadeInUp' : 'none',
                      animationDuration: '0.6s',
                      animationTimingFunction: 'ease-out',
                      animationFillMode: 'forwards',
                      animationDelay: `${index * 50}ms`, // Faster stagger on mobile
                    }}
                  >
                    <FoodItemCard item={item} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Custom animations and responsive breakpoints */}
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

        /* Extra small screens */
        @media (min-width: 475px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .xs\\:text-4xl {
            font-size: 2.25rem;
            line-height: 2.5rem;
          }
          .xs\\:gap-4 {
            gap: 1rem;
          }
        }

        /* Touch improvements */
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-105:hover {
            transform: none;
          }
          button:active {
            transform: scale(0.95);
          }
        }

        /* High DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .blur-3xl {
            backdrop-filter: blur(60px);
          }
        }
      `}</style>
    </div>
  );
}