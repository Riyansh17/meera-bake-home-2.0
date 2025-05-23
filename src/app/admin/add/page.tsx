'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { addFoodItem } from '@/firebase/db';
import { Category } from '@/types/item';
import toast from 'react-hot-toast';

const categories: { value: Category; label: string }[] = [
  { value: 'cake', label: 'cake' },
  { value: 'cheesecake', label: 'Cheese Cake' },
  { value: 'brownie', label: 'Brownie' },
  { value: 'cakeslice', label: 'Cake Slice' },
  { value: 'other', label: 'Other' },
];

export default function AddFoodItemPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'cake' as Category,
    available: true,
  });
  
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setLoading(true);

    try {
      const newItem = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: price,
        category: formData.category,
        image: image || undefined,
        available: formData.available,
      };

      await addFoodItem(newItem);
      toast.success('Food item added successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error adding food item:', error);
      toast.error('Failed to add food item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Food Item</h1>
        <p className="text-gray-600 mt-1">Add a new item to your bakery menu</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              {image ? (
                <div className="relative">
                  <img
                    src={image}
                    alt="Preview"
                    className="max-h-48 rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        ref={fileInputRef}
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Item Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Chocolate Cupcake"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your delicious bakery item..."
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (INR) *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                id="price"
                name="price"
                required
                value={formData.price}
                onChange={handleInputChange}
                className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="flex items-center">
            <input
              id="available"
              name="available"
              type="checkbox"
              checked={formData.available}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
              Available for order
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <Link
              href="/admin"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding...
                </div>
              ) : (
                'Add Item'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}