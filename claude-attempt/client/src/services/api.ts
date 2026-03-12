import axios from 'axios';
import { AuthResponse, Ingredient, Order, Pokebowl } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Ingredients API
export const ingredientsAPI = {
  getAll: async (): Promise<Record<string, Ingredient[]>> => {
    const response = await api.get('/ingredients');
    return response.data;
  },

  getByCategory: async (category: string): Promise<Ingredient[]> => {
    const response = await api.get(`/ingredients/${category}`);
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  create: async (items: Pokebowl[], totalPrice: number, customerNotes?: string): Promise<Order> => {
    const response = await api.post('/orders', { items, totalPrice, customerNotes });
    return response.data;
  },

  getUserOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrder: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

export default api;