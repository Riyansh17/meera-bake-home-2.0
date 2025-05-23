'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
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
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      )}
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600 capitalize">{item.category}</p>
        <p className="text-primary-600 font-semibold">
          {formatCurrency(item.price)}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div className="text-right">
        <p className="font-semibold text-gray-800">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors mt-1"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}