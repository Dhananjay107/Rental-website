import React, { createContext, useContext, useState } from 'react';
import { Product, DateRange, Booking, User } from '../types';
import { mockProducts, mockCategories, mockUser } from '../data/mockData';

interface RentalContextType {
  products: Product[];
  favorites: string[];
  bookings: Booking[];
  cart: { product: Product; dateRange: DateRange } | null;
  currentUser: User | null;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  addToCart: (product: Product, dateRange: DateRange) => void;
  removeFromCart: () => void;
  searchProducts: (query: string, filters: any) => Product[];
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookings] = useState<Booking[]>([]);
  const [cart, setCart] = useState<{ product: Product; dateRange: DateRange } | null>(null);
  const [currentUser] = useState<User | null>(mockUser);

  const addToFavorites = (productId: string) => {
    setFavorites((prev) => [...prev, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== productId));
  };

  const addToCart = (product: Product, dateRange: DateRange) => {
    setCart({ product, dateRange });
  };

  const removeFromCart = () => {
    setCart(null);
  };

  const searchProducts = (query: string, filters: any) => {
    let filtered = [...products];
    
    if (query) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(product => product.pricePerDay >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.pricePerDay <= filters.maxPrice);
    }
    
    if (filters.location) {
      filtered = filtered.filter(product => 
        product.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    return filtered;
  };

  return (
    <RentalContext.Provider
      value={{
        products,
        favorites,
        bookings,
        cart,
        currentUser,
        addToFavorites,
        removeFromFavorites,
        addToCart,
        removeFromCart,
        searchProducts,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => {
  const context = useContext(RentalContext);
  if (context === undefined) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};