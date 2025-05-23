'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatCurrency';
import { buildWhatsAppMessage, buildWhatsAppURL } from '@/utils/buildWhatsAppMessage';
import CartItemRow from '@/components/CartItem';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleOrderNow = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    const message = buildWhatsAppMessage(items, customerName.trim(), customerPhone.trim(), notes.trim());
    const whatsappURL = buildWhatsAppURL(message);
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Clear cart after ordering
    clearCart();
    toast.success('Order sent via WhatsApp!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Menu</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map(item => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-800">Your Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or notes..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleOrderNow}
                className="w-full flex items-center justify-center space-x-2 bg-whatsapp-500 text-white py-3 rounded-lg hover:bg-whatsapp-600 transition-colors font-semibold"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Order via WhatsApp</span>
              </button>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                This will open WhatsApp with your order details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}