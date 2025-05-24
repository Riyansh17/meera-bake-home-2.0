'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, ShoppingBag, Sparkles, Cookie, MapPin, Package, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatCurrency';
import { buildWhatsAppMessage, buildWhatsAppURL } from '@/utils/buildWhatsAppMessage';
import CartItemRow from '@/components/CartItem';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [occasion, setOccasion] = useState('');
  const [orderType, setOrderType] = useState('takeaway'); // 'takeaway' or 'delivery'
  const [specialNotes, setSpecialNotes] = useState('');

  const deliveryCharge = 50; // Fixed delivery charge
  const finalTotal = orderType === 'delivery' ? totalPrice + deliveryCharge : totalPrice;

  const occasionOptions = [
    'Birthday',
    'Anniversary',
    'Wedding',
    'Corporate Event',
    'Festival',
    'Housewarming',
    'Baby Shower',
    'Graduation',
    'Valentine\'s Day',
    'Mother\'s Day',
    'Father\'s Day',
    'Christmas',
    'New Year',
    'Diwali',
    'Eid',
    'Other'
  ];

  const handleOrderNow = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!customerPhone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    if (orderType === 'delivery' && !customerAddress.trim()) {
      toast.error('Please enter your delivery address');
      return;
    }

    const orderData = {
      items,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: orderType === 'delivery' ? customerAddress.trim() : 'Takeaway',
      occasion: occasion || 'Not specified',
      orderType,
      specialNotes: specialNotes.trim() || 'None',
      deliveryCharge: orderType === 'delivery' ? deliveryCharge : 0,
      totalAmount: finalTotal
    };

    const message = buildWhatsAppMessage(orderData.items, orderData.customerName, orderData.customerPhone, `
Order Type: ${orderData.orderType.charAt(0).toUpperCase() + orderData.orderType.slice(1)}
${orderData.orderType === 'delivery' ? `Delivery Address: ${orderData.customerAddress}` : ''}
Occasion: ${orderData.occasion}
Special Notes: ${orderData.specialNotes}
${orderData.orderType === 'delivery' ? `Delivery Charge: ${formatCurrency(orderData.deliveryCharge)}` : ''}
Total Amount: ${formatCurrency(orderData.totalAmount)}
    `.trim());
    
    const whatsappURL = buildWhatsAppURL(message);
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Clear cart after ordering
    clearCart();
    toast.success('Order sent via WhatsApp!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-dark relative overflow-hidden">
        
        {/* Background effects */}
        <div className="absolute top-20 left-20 w-32 h-32 sm:w-64 sm:h-64 bg-coral-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 sm:w-80 sm:h-80 bg-gold-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16">
          <div className="text-center py-12 sm:py-20">
            <div className="relative inline-block mb-6 sm:mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-coral-500/30">
                <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gold-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-coral-500 rounded-full flex items-center justify-center">
                <Cookie className="w-3 h-3 sm:w-4 sm:h-4 text-brand-dark" />
              </div>
            </div>
            
            <div className="inline-flex items-center space-x-2 bg-coral-500/20 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-coral-500/30 mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-500" />
              <span className="text-cream-500 text-xs sm:text-sm font-medium tracking-wide">EMPTY CART</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-500" />
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-gradient-to-r from-coral-500 via-gold-500 to-coral-500 bg-clip-text mb-3 sm:mb-4">
              Your cart is empty
            </h2>
            <p className="text-lg sm:text-xl text-cream-400 mb-8 sm:mb-10 font-light px-4">
              Add some delicious artisanal treats to get started!
            </p>
            
            <Link
              href="/menu"
              className="group relative inline-flex items-center space-x-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-coral-500 to-gold-500 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-gradient-to-r from-coral-500 to-gold-500 text-brand-dark px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 group-hover:scale-105">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 inline mr-2" />
                Continue Shopping
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark relative overflow-hidden">
      
      {/* Background effects - Responsive */}
      <div className="absolute top-20 left-10 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-coral-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-gold-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cream-500 rounded-full opacity-5 blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <Link
            href="/"
            className="group inline-flex items-center space-x-2 sm:space-x-3 text-cream-400 hover:text-coral-500 transition-colors mb-4 sm:mb-6"
          >
            <div className="p-1.5 sm:p-2 rounded-full bg-coral-500/10 group-hover:bg-coral-500/20 transition-colors">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="font-medium text-sm sm:text-base">Back to Menu</span>
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-coral-500/20 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-coral-500/30 mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-500" />
              <span className="text-cream-500 text-xs sm:text-sm font-medium tracking-wide">REVIEW ORDER</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold-500" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-coral-500 via-gold-500 to-coral-500 bg-clip-text mb-3 sm:mb-4">
              YOUR CART
            </h1>
            <p className="text-lg sm:text-xl text-cream-400 font-light px-4">
              Ready to order your delicious treats?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2">
            <div className="space-y-4 sm:space-y-6">
              {items.map(item => (
                <div key={item.id} className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-coral-500/10 to-gold-500/10 rounded-xl sm:rounded-2xl blur-sm"></div>
                  <div className="relative bg-brand-dark/80 backdrop-blur-md border border-coral-500/20 rounded-xl sm:rounded-2xl p-1">
                    <CartItemRow item={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="xl:sticky xl:top-24">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-coral-500/20 to-gold-500/20 rounded-2xl sm:rounded-3xl blur-sm"></div>
                <div className="relative bg-brand-dark/90 backdrop-blur-md border border-coral-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
                  
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center space-x-2 bg-gold-500/20 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-gold-500/30 mb-3 sm:mb-4">
                      <Cookie className="w-3 h-3 sm:w-4 sm:h-4 text-coral-500" />
                      <span className="text-cream-500 text-xs sm:text-sm font-medium">ORDER SUMMARY</span>
                    </div>
                  </div>
                  
                  {/* Order Type Selection */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-bold text-cream-500 text-center mb-4">Order Type</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setOrderType('takeaway')}
                        className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                          orderType === 'takeaway'
                            ? 'border-coral-500 bg-coral-500/10'
                            : 'border-coral-500/30 bg-transparent hover:border-coral-500/50'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-coral-500" />
                          <span className="text-xs sm:text-sm font-medium text-cream-500">Takeaway</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setOrderType('delivery')}
                        className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                          orderType === 'delivery'
                            ? 'border-gold-500 bg-gold-500/10'
                            : 'border-gold-500/30 bg-transparent hover:border-gold-500/50'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-gold-500" />
                          <span className="text-xs sm:text-sm font-medium text-cream-500">Delivery</span>
                        </div>
                      </button>
                    </div>
                    {orderType === 'delivery' && (
                      <div className="mt-3 p-3 bg-gold-500/10 rounded-lg border border-gold-500/30">
                        <div className="flex items-center space-x-2 text-gold-500">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs sm:text-sm font-medium">
                            Delivery charge: {formatCurrency(deliveryCharge)} (Applied to location)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Price Summary */}
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    <div className="flex justify-between items-center text-cream-400 text-sm sm:text-base">
                      <span className="font-medium">Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                      <span className="text-gold-500 font-semibold">{formatCurrency(totalPrice)}</span>
                    </div>
                    {orderType === 'delivery' && (
                      <div className="flex justify-between items-center text-cream-400 text-sm sm:text-base">
                        <span className="font-medium">Delivery Charge</span>
                        <span className="text-gold-500 font-semibold">{formatCurrency(deliveryCharge)}</span>
                      </div>
                    )}
                    <div className="border-t border-coral-500/20 pt-3 sm:pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-xl font-bold text-cream-500">Total</span>
                        <span className="text-xl sm:text-2xl font-black text-transparent bg-gradient-to-r from-coral-500 to-gold-500 bg-clip-text">
                          {formatCurrency(finalTotal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-bold text-cream-500 text-center">Your Information</h3>
                    
                    {/* Name - Required */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-cream-400 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-coral-500/20 to-gold-500/20 rounded-lg sm:rounded-xl blur-sm"></div>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter your full name"
                          className="relative w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-brand-dark/80 backdrop-blur-md border border-coral-500/30 rounded-lg sm:rounded-xl text-cream-500 placeholder-cream-400/70 focus:outline-none focus:ring-2 focus:ring-coral-500/50 focus:border-coral-500/50 transition-all text-sm sm:text-base"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Phone - Required */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-cream-400 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-coral-500/20 rounded-lg sm:rounded-xl blur-sm"></div>
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Enter your phone number"
                          className="relative w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-brand-dark/80 backdrop-blur-md border border-gold-500/30 rounded-lg sm:rounded-xl text-cream-500 placeholder-cream-400/70 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all text-sm sm:text-base"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Address - Required for delivery */}
                    {orderType === 'delivery' && (
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-cream-400 mb-2">
                          Delivery Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-cream-500/20 to-vanilla-500/20 rounded-lg sm:rounded-xl blur-sm"></div>
                          <textarea
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            placeholder="Enter your complete delivery address"
                            rows={3}
                            className="relative w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-brand-dark/80 backdrop-blur-md border border-cream-500/30 rounded-lg sm:rounded-xl text-cream-500 placeholder-cream-400/70 focus:outline-none focus:ring-2 focus:ring-cream-500/50 focus:border-cream-500/50 transition-all resize-none text-sm sm:text-base"
                            required
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Occasion - Select */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-cream-400 mb-2">
                        Occasion (optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-vanilla-500/20 to-gold-500/20 rounded-lg sm:rounded-xl blur-sm"></div>
                        <select
                          value={occasion}
                          onChange={(e) => setOccasion(e.target.value)}
                          className="relative w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-brand-dark/80 backdrop-blur-md border border-vanilla-500/30 rounded-lg sm:rounded-xl text-cream-500 focus:outline-none focus:ring-2 focus:ring-vanilla-500/50 focus:border-vanilla-500/50 transition-all text-sm sm:text-base"
                        >
                          <option value="">Select occasion (optional)</option>
                          {occasionOptions.map((occ) => (
                            <option key={occ} value={occ} className="bg-brand-dark text-cream-500">
                              {occ}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Special Notes */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-cream-400 mb-2">
                        Special Notes (optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cream-500/20 to-vanilla-500/20 rounded-lg sm:rounded-xl blur-sm"></div>
                        <textarea
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          placeholder="Any special requests, dietary requirements, or notes..."
                          rows={3}
                          className="relative w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-brand-dark/80 backdrop-blur-md border border-cream-500/30 rounded-lg sm:rounded-xl text-cream-500 placeholder-cream-400/70 focus:outline-none focus:ring-2 focus:ring-cream-500/50 focus:border-cream-500/50 transition-all resize-none text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <button
                      onClick={handleOrderNow}
                      className="group relative w-full overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 rounded-xl sm:rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-whatsapp-500 to-whatsapp-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 group-hover:scale-105">
                        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span>Order via WhatsApp</span>
                      </div>
                    </button>
                    
                    <p className="text-xs text-cream-400/70 text-center leading-relaxed px-2">
                      This will open WhatsApp with your order details.<br />
                      We'll confirm availability and delivery details with you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}