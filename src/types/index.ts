export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  images: string[];
  pricePerDay: number;
  pricePerWeek: number | null;
  deposit: number;
  owner: User;
  availability: DateRange[];
  reviews: Review[];
  avgRating: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone?: string;
  isVerified: boolean;
  joinedDate: string;
}

export interface Review {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Booking {
  id: string;
  product: Product;
  user: User;
  rental: DateRange;
  totalPrice: number;
  deposit: number;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
}