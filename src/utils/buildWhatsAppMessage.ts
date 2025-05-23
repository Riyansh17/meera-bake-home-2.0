import { CartItem } from '@/types/item';
import { formatCurrency } from './formatCurrency';

export const buildWhatsAppMessage = (
  cartItems: CartItem[],
  customerName: string = '',
  customerPhone: string = '',
  notes: string = ''
): string => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let message = `🛒 *New Order Request*\n\n`;
  
  if (customerName) {
    message += `👤 *Customer:* ${customerName}\n`;
  }
  
  if (customerPhone) {
    message += `📱 *Phone:* ${customerPhone}\n`;
  }
  
  message += `\n📋 *Order Details:*\n`;
  message += `${'-'.repeat(25)}\n`;
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Qty: ${item.quantity} × ${formatCurrency(item.price)}\n`;
    message += `   Subtotal: ${formatCurrency(item.price * item.quantity)}\n\n`;
  });
  
  message += `${'-'.repeat(25)}\n`;
  message += `💰 *Total: ${formatCurrency(total)}*\n\n`;
  
  if (notes) {
    message += `📝 *Special Notes:*\n${notes}\n\n`;
  }
  
  message += `⏰ *Order Time:* ${new Date().toLocaleString()}\n\n`;
  message += `Please confirm this order. Thank you! 🙏`;
  
  return message;
};

export const buildWhatsAppURL = (message: string, phoneNumber?: string): string => {
  const defaultNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const number = phoneNumber || defaultNumber;
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${number}?text=${encodedMessage}`;
};