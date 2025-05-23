export const formatCurrency = (amount: number, currency = 'INR'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};