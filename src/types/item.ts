export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export type Category = 'cake' | 'cheesecake' | 'brownie' | 'cakeslice' | 'other';