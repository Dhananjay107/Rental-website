import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart, ShoppingCart, User, MapPin } from 'lucide-react';
import { useRental } from '../../context/RentalContext';
import SearchBar from '../ui/SearchBar';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { cart, favorites } = useRental();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-teal-600 font-bold text-xl md:text-2xl flex items-center"
          >
            <span className="inline-block mr-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
                <path d="M8 9h7" />
                <path d="M8 13h5" />
                <path d="M8 5h8" />
              </svg>
            </span>
            RentHub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/products"
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              Browse
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/list-item"
              className="text-gray-700 hover:text-teal-600 transition-colors"
            >
              List Your Item
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-teal-600 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/favorites"
              className="p-2 text-gray-700 hover:text-teal-600 transition-colors relative"
              aria-label="Favorites"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="p-2 text-gray-700 hover:text-teal-600 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cart && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  1
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="ml-2 flex items-center justify-center px-4 py-2 border border-transparent 
                text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 
                transition-colors"
            >
              <User size={18} className="mr-1" />
              <span>Account</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search bar overlay - visible when search is clicked */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 bg-white shadow-md p-4 animate-slideDown">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </div>

      {/* Mobile menu - full screen overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-50 h-screen animate-fadeIn">
          <div className="px-4 py-6 space-y-6">
            <Link
              to="/products"
              className="block text-gray-700 hover:text-teal-600 transition-colors py-2 text-lg"
            >
              Browse
            </Link>
            <Link
              to="/how-it-works"
              className="block text-gray-700 hover:text-teal-600 transition-colors py-2 text-lg"
            >
              How It Works
            </Link>
            <Link
              to="/list-item"
              className="block text-gray-700 hover:text-teal-600 transition-colors py-2 text-lg"
            >
              List Your Item
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 py-2">
                <Link
                  to="/favorites"
                  className="flex items-center text-gray-700"
                >
                  <Heart size={18} className="mr-2" />
                  <span>Favorites</span>
                  {favorites.length > 0 && (
                    <span className="ml-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              </div>
              <div className="flex items-center space-x-4 py-2">
                <Link to="/cart" className="flex items-center text-gray-700">
                  <ShoppingCart size={18} className="mr-2" />
                  <span>Cart</span>
                  {cart && (
                    <span className="ml-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      1
                    </span>
                  )}
                </Link>
              </div>
              <div className="flex items-center space-x-4 py-2">
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700"
                >
                  <User size={18} className="mr-2" />
                  <span>Account</span>
                </Link>
              </div>
            </div>
            <div className="pt-4">
              <SearchBar onClose={() => {}} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;