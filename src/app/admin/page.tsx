'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { FoodItem } from '@/types/item';
import { getFoodItems, deleteFoodItem, updateFoodItem } from '@/firebase/db';
import { formatCurrency } from '@/utils/formatCurrency';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    try {
      const items = await getFoodItems();
      setFoodItems(items);
    } catch (error) {
      console.error('Error loading food items:', error);
      toast.error('Failed to load food items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await deleteFoodItem(id);
      setFoodItems(items => items.filter(item => item.id !== id));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await updateFoodItem(id, { available: !currentStatus });
      setFoodItems(items =>
        items.map(item =>
          item.id === id ? { ...item, available: !currentStatus } : item
        )
      );
      toast.success(`Item ${!currentStatus ? 'enabled' : 'disabled'} successfully`);
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Food Items Management</h1>
          <p className="text-gray-600 mt-1">Manage your restaurant menu items</p>
        </div>
        <Link
          href="/admin/add"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Item</span>
        </Link>
      </div>

      {foodItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No food items found</p>
          <Link
            href="/admin/add"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Your First Item</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {foodItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.image && (
                          <img
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                            src={item.image}
                            alt={item.name}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleAvailability(item.id, item.available)}
                          className={`p-2 rounded-lg transition-colors ${
                            item.available
                              ? 'text-yellow-600 hover:bg-yellow-50'
                              : 'text-green-600 hover:bg-green-50'
                          }`}
                          title={item.available ? 'Disable item' : 'Enable item'}
                        >
                          {item.available ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <Link
                          href={`/admin/edit/${item.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit item"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Items</h3>
          <p className="text-3xl font-bold text-blue-600">{foodItems.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Items</h3>
          <p className="text-3xl font-bold text-green-600">
            {foodItems.filter(item => item.available).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unavailable Items</h3>
          <p className="text-3xl font-bold text-red-600">
            {foodItems.filter(item => !item.available).length}
          </p>
        </div>
      </div>
    </div>
  );
}