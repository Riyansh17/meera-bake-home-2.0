import { CartItem } from '@/types/item';
import { formatCurrency } from './formatCurrency';

interface OrderData {
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  occasion?: string;
  orderType: 'takeaway' | 'delivery';
  specialNotes?: string;
  deliveryCharge?: number;
  totalAmount: number;
}

export const buildWhatsAppMessage = (
  items: CartItem[],
  customerName: string = '',
  customerPhone: string = '',
  additionalInfo: string = ''
): string => {
  const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let message = `🛒 *New Order Request*\n\n`;
  
  if (customerName) {
    message += `👤 *Customer:* ${customerName}\n`;
  }
  
  if (customerPhone) {
    message += `📱 *Phone:* ${customerPhone}\n`;
  }
  
  message += `\n📋 *Order Details:*\n`;
  message += `${'-'.repeat(30)}\n`;
  
  items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Qty: ${item.quantity} × ${formatCurrency(item.price)}\n`;
    message += `   Subtotal: ${formatCurrency(item.price * item.quantity)}\n\n`;
  });
  
  message += `${'-'.repeat(30)}\n`;
  message += `💰 *Items Total: ${formatCurrency(itemsTotal)}*\n`;
  
  if (additionalInfo) {
    message += `\n📋 *Order Information:*\n${additionalInfo}\n`;
  }
  
  message += `\n⏰ *Order Time:* ${new Date().toLocaleString()}\n\n`;
  message += `Please confirm this order and let us know the estimated preparation time. Thank you! 🙏`;
  
  return message;
};

// Alternative function for structured order data
export const buildStructuredWhatsAppMessage = (orderData: OrderData): string => {
  let message = `🛒 *New Order Request*\n\n`;
  
  // Customer Information
  message += `👤 *Customer Details:*\n`;
  message += `• Name: ${orderData.customerName}\n`;
  message += `• Phone: ${orderData.customerPhone}\n`;
  
  // Order Type and Address
  message += `• Order Type: ${orderData.orderType.charAt(0).toUpperCase() + orderData.orderType.slice(1)}\n`;
  if (orderData.orderType === 'delivery' && orderData.customerAddress) {
    message += `• Delivery Address: ${orderData.customerAddress}\n`;
  }
  
  // Occasion
  if (orderData.occasion && orderData.occasion !== 'Not specified') {
    message += `• Occasion: ${orderData.occasion}\n`;
  }
  
  message += `\n📋 *Order Details:*\n`;
  message += `${'-'.repeat(35)}\n`;
  
  // Items
  orderData.items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Qty: ${item.quantity} × ${formatCurrency(item.price)}\n`;
    message += `   Subtotal: ${formatCurrency(item.price * item.quantity)}\n\n`;
  });
  
  message += `${'-'.repeat(35)}\n`;
  
  // Pricing breakdown
  const itemsTotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `💰 *Items Total: ${formatCurrency(itemsTotal)}*\n`;
  
  if (orderData.orderType === 'delivery' && orderData.deliveryCharge) {
    message += `🚚 *Delivery Charge: ${formatCurrency(orderData.deliveryCharge)}*\n`;
  }
  
  message += `🏆 *Final Total: ${formatCurrency(orderData.totalAmount)}*\n\n`;
  
  // Special Notes
  if (orderData.specialNotes && orderData.specialNotes !== 'None') {
    message += `📝 *Special Notes:*\n${orderData.specialNotes}\n\n`;
  }
  
  message += `⏰ *Order Time:* ${new Date().toLocaleString()}\n\n`;
  message += `Please confirm this order and let us know:\n`;
  message += `• Availability of items\n`;
  message += `• Estimated preparation time\n`;
  if (orderData.orderType === 'delivery') {
    message += `• Delivery time estimate\n`;
  }
  message += `\nThank you! 🙏`;
  
  return message;
};

export const buildWhatsAppURL = (message: string, phoneNumber?: string): string => {
  const defaultNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const number = phoneNumber || defaultNumber;
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/917073301913?text=${encodedMessage}`;
};