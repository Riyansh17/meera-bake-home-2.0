'use client';

import { Plus, Sparkles, Star } from 'lucide-react';
import { FoodItem } from '@/types/item';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface FoodItemProps {
  item: FoodItem;
}

export default function FoodItemCard({ item }: FoodItemProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item);
    toast.success(`${item.name} added to cart!`, {
      style: {
        background: '#134949',
        color: '#F5E6DA',
        border: '1px solid #F8ABAC',
      },
      iconTheme: {
        primary: '#FCD680',
        secondary: '#134949',
      },
    });
  };

  return (
    <div className="group relative w-full">
      {/* Hover glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-coral-500/0 via-gold-500/0 to-coral-500/0 group-hover:from-coral-500/20 group-hover:via-gold-500/30 group-hover:to-coral-500/20 rounded-xl md:rounded-2xl blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      
      <div className="relative bg-brand-dark/80 backdrop-blur-md border border-coral-500/20 rounded-xl md:rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-500 group-hover:scale-[1.02] md:group-hover:scale-105 h-full flex flex-col">
        
        {/* Image Section */}
        {item.image && (
          <div className="relative h-32 sm:h-40 md:h-48 lg:h-52 overflow-hidden flex-shrink-0">
            {/* Image background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 to-gold-500/20"></div>
            
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent"></div>
            
            {/* Availability badge */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4">
              {item.available ? (
                <div className="flex items-center space-x-1 bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold border border-green-400/50">
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                  <span className="hidden sm:inline">Available</span>
                  <span className="sm:hidden">✓</span>
                </div>
              ) : (
                <div className="bg-red-500/90 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold border border-red-400/50">
                  <span className="hidden sm:inline">Sold Out</span>
                  <span className="sm:hidden">✗</span>
                </div>
              )}
            </div>
            
            {/* Decorative sparkles */}
            <Sparkles className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-4 h-4 sm:w-5 sm:h-5 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          </div>
        )}
        
        {/* Content Section */}
        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 flex-1 flex flex-col">
          {/* Header */}
          <div className="space-y-2 flex-shrink-0">
            {/* Mobile Layout: Stacked */}
            <div className="block sm:hidden space-y-2">
              <h3 className="text-lg font-bold text-cream-500 group-hover:text-gold-500 transition-colors duration-300 leading-tight line-clamp-2">
                {item.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-gradient-to-r from-coral-500/20 to-gold-500/20 text-coral-500 text-xs rounded-full border border-coral-500/30 capitalize font-medium">
                  {item.category}
                </span>
                <div className="text-xl font-black text-transparent bg-gradient-to-r from-coral-500 to-gold-500 bg-clip-text">
                  {formatCurrency(item.price)}
                </div>
              </div>
            </div>
            
            {/* Tablet and Desktop Layout: Side by side */}
            <div className="hidden sm:block">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg md:text-xl font-bold text-cream-500 group-hover:text-gold-500 transition-colors duration-300 leading-tight flex-1 pr-2 line-clamp-2">
                  {item.name}
                </h3>
                <div className="text-xl md:text-2xl font-black text-transparent bg-gradient-to-r from-coral-500 to-gold-500 bg-clip-text flex-shrink-0">
                  {formatCurrency(item.price)}
                </div>
              </div>
              
              {/* Category badge */}
              <div className="flex items-center">
                <span className="px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-coral-500/20 to-gold-500/20 text-coral-500 text-xs md:text-sm rounded-full border border-coral-500/30 capitalize font-medium">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="flex-1">
            <p className="text-cream-400 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 group-hover:text-cream-300 transition-colors duration-300">
              {item.description}
            </p>
          </div>
          
          {/* Add to Cart Button */}
          <div className="pt-2 flex-shrink-0">
            <button
              onClick={handleAddToCart}
              disabled={!item.available}
              className={`group/btn relative w-full overflow-hidden rounded-lg md:rounded-xl transition-all duration-300 ${
                item.available
                  ? 'hover:scale-105 hover:shadow-2xl active:scale-95'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              {item.available ? (
                <>
                  {/* Button background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-coral-500 to-gold-500 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-coral-500 opacity-0 group-hover/btn:opacity-100 transition-all duration-300"></div>
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-center space-x-2 sm:space-x-3 px-4 py-3 sm:px-6 sm:py-4 text-brand-dark font-bold">
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5 group-hover/btn:rotate-90 transition-transform duration-300" />
                    <span className="text-sm sm:text-base md:text-lg">Add to Cart</span>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:translate-x-full transition-transform duration-700"></div>
                </>
              ) : (
                <>
                  {/* Unavailable button */}
                  <div className="absolute inset-0 bg-gray-600/50 backdrop-blur-sm"></div>
                  <div className="relative flex items-center justify-center space-x-2 sm:space-x-3 px-4 py-3 sm:px-6 sm:py-4 text-gray-400 font-bold">
                    <span className="text-sm sm:text-base md:text-lg text-center">
                      <span className="hidden sm:inline">Currently Unavailable</span>
                      <span className="sm:hidden">Unavailable</span>
                    </span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-bl from-gold-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}