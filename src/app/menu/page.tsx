'use client';

import { useState, useEffect } from 'react';
import { FoodItem } from '@/types/item';
import { getAvailableFoodItems } from '@/firebase/db';
import FoodItemCard from '@/components/FoodItems';
import Navbar from '@/components/Navbar';
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadFoodItems();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Menu</h1>
          <p className="text-gray-600">Choose your favorite dishes and order through WhatsApp</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <FoodItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}