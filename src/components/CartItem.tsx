'use client';

import { Minus, Plus, Trash2, Sparkles } from 'lucide-react';
import { CartItem } from '@/types/item';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="group relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-coral-500/10 to-gold-500/10 rounded-xl md:rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      <div className="relative bg-brand-dark/60 backdrop-blur-md border border-coral-500/20 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 hover:border-gold-500/40 transition-all duration-300 group-hover:scale-[1.01] md:group-hover:scale-[1.02]">
        
        {/* Mobile Layout (< 768px) */}
        <div className="block md:hidden space-y-4">
          {/* Top Row: Image, Name, and Remove Button */}
          <div className="flex items-start space-x-3">
            {/* Item Image */}
            {item.image && (
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-lg blur-sm"></div>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-gold-500/30">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>
            )}
            
            {/* Item Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg sm:text-xl text-cream-500 group-hover:text-gold-500 transition-colors duration-300 truncate">
                {item.name}
              </h3>
              <div className="mt-1">
                <span className="inline-block px-2 py-1 bg-gradient-to-r from-coral-500/20 to-gold-500/20 text-coral-500 text-xs sm:text-sm rounded-full border border-coral-500/30 capitalize font-medium">
                  {item.category}
                </span>
              </div>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.id)}
              className="group/remove flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:scale-110 flex-shrink-0"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-400 group-hover/remove:text-red-300 transition-colors duration-300" />
            </button>
          </div>
          
          {/* Bottom Row: Price, Quantity, and Total */}
          <div className="flex items-center justify-between">
            {/* Unit Price */}
            <div>
              <p className="text-xs text-cream-400 font-medium mb-1">Unit Price</p>
              <p className="text-lg sm:text-xl font-black text-transparent bg-gradient-to-r from-coral-500 to-gold-500 bg-clip-text">
                {formatCurrency(item.price)}
              </p>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3 bg-brand-dark/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-1 sm:p-2 border border-coral-500/20">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="group/btn flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-coral-500/20 to-gold-500/20 hover:from-coral-500/40 hover:to-gold-500/40 border border-coral-500/30 hover:border-coral-500/50 transition-all duration-300 hover:scale-110"
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-cream-500 group-hover/btn:text-coral-500 transition-colors duration-300" />
              </button>
              
              <div className="w-8 sm:w-12 text-center">
                <span className="text-lg sm:text-xl font-bold text-gold-500">{item.quantity}</span>
              </div>
              
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="group/btn flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-coral-500/20 hover:from-gold-500/40 hover:to-coral-500/40 border border-gold-500/30 hover:border-gold-500/50 transition-all duration-300 hover:scale-110"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-cream-500 group-hover/btn:text-gold-500 transition-colors duration-300" />
              </button>
            </div>
            
            {/* Total Price */}
            <div className="text-right">
              <p className="text-xs text-cream-400 font-medium mb-1">Total</p>
              <p className="text-lg sm:text-xl font-black text-transparent bg-gradient-to-r from-gold-500 to-coral-500 bg-clip-text">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout (≥ 768px) */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {/* Item Image */}
          {item.image && (
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-xl blur-sm"></div>
              <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 border-gold-500/30">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </div>
          )}
          
          {/* Item Details */}
          <div className="flex-1 space-y-2 min-w-0">
            <h3 className="font-bold text-lg lg:text-xl text-cream-500 group-hover:text-gold-500 transition-colors duration-300 truncate">
              {item.name}
            </h3>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-gradient-to-r from-coral-500/20 to-gold-500/20 text-coral-500 text-sm rounded-full border border-coral-500/30 capitalize font-medium">
                {item.category}
              </span>
            </div>
            <p className="text-xl lg:text-2xl font-black text-transparent bg-gradient-to-r from-coral-500 to-gold-500 bg-clip-text">
              {formatCurrency(item.price)}
            </p>
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="flex items-center space-x-2 lg:space-x-3 bg-brand-dark/80 backdrop-blur-sm rounded-xl p-2 border border-coral-500/20">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="group/btn flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-coral-500/20 to-gold-500/20 hover:from-coral-500/40 hover:to-gold-500/40 border border-coral-500/30 hover:border-coral-500/50 transition-all duration-300 hover:scale-110"
              >
                <Minus className="h-3 w-3 lg:h-4 lg:w-4 text-cream-500 group-hover/btn:text-coral-500 transition-colors duration-300" />
              </button>
              
              <div className="w-10 lg:w-12 text-center">
                <span className="text-lg lg:text-xl font-bold text-gold-500">{item.quantity}</span>
              </div>
              
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="group/btn flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-coral-500/20 hover:from-gold-500/40 hover:to-coral-500/40 border border-gold-500/30 hover:border-gold-500/50 transition-all duration-300 hover:scale-110"
              >
                <Plus className="h-3 w-3 lg:h-4 lg:w-4 text-cream-500 group-hover/btn:text-gold-500 transition-colors duration-300" />
              </button>
            </div>
          </div>
          
          {/* Total Price and Remove */}
          <div className="flex flex-col items-end space-y-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-sm text-cream-400 font-medium mb-1">Total</p>
              <p className="text-xl lg:text-2xl font-black text-transparent bg-gradient-to-r from-gold-500 to-coral-500 bg-clip-text">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
            
            <button
              onClick={() => removeItem(item.id)}
              className="group/remove flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:scale-110"
            >
              <Trash2 className="h-3 w-3 lg:h-4 lg:w-4 text-red-400 group-hover/remove:text-red-300 transition-colors duration-300" />
            </button>
          </div>
        </div>
        
        {/* Decorative border animation */}
        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-coral-500/0 via-gold-500/0 to-coral-500/0 group-hover:from-coral-500/20 group-hover:via-gold-500/40 group-hover:to-coral-500/20 transition-all duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
}