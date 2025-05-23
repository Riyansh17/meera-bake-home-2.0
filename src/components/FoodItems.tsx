'use client';

import { Plus } from 'lucide-react';
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
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {item.image && (
        <div className="h-48 bg-gray-200 relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <span className="text-lg font-bold text-primary-600">
            {formatCurrency(item.price)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
            {item.category}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={!item.available}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              item.available
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>{item.available ? 'Add to Cart' : 'Unavailable'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}