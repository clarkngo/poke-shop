// User interface
export interface User {
  id: number;
  username: string;
  email: string;
}

// Auth response interface
export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Ingredient interface
export interface Ingredient {
  id: number;
  name: string;
  category: 'base' | 'protein' | 'mixins' | 'sauce' | 'topping';
  priceExtra: number;
  inStock: boolean;
  description?: string;
}

// Pokebowl interface
export interface Pokebowl {
  base: string;
  proteins: string[];
  mixins: string[];
  sauces: string[];
  toppings: string[];
  quantity: number;
  itemPrice: number;
}

// Order interface
export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  customerNotes?: string;
  items: Pokebowl[];
  createdAt: string;
}