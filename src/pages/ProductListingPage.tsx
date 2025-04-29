import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { useRental } from '../context/RentalContext';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';

const ProductListingPage: React.FC = () => {
  const { products, searchProducts } = useRental();
  const [searchParams] = useSearchParams();
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('relevant');

  // Get search parameters
  const searchQuery = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const locationParam = searchParams.get('location') || '';

  useEffect(() => {
    // Initialize filters from URL params
    setSelectedCategory(categoryParam);
    setSelectedLocation(locationParam);
    
    // Filter products based on search params
    filterProducts();
  }, [searchQuery, categoryParam, locationParam]);

  const filterProducts = () => {
    const filters = {
      category: selectedCategory,
      location: selectedLocation,
      minPrice: priceRange.min ? parseInt(priceRange.min) : undefined,
      maxPrice: priceRange.max ? parseInt(priceRange.max) : undefined,
    };
    
    const filtered = searchProducts(searchQuery, filters);
    
    // Sort products
    let sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'rating':
        sorted.sort((a, b) => b.avgRating - a.avgRating);
        break;
      default:
        // Default sorting (by relevance) - no change
        break;
    }
    
    setDisplayedProducts(sorted);
  };

  const handleApplyFilters = () => {
    filterProducts();
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    setPriceRange({ min: '', max: '' });
    setSortBy('relevant');
  };

  const categories = [...new Set(products.map(product => product.category))];
  const locations = [...new Set(products.map(product => product.location))];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             categoryParam ? `Browse ${categoryParam}` : 
             'All Items'}
          </h1>
          <p className="text-gray-600">
            {displayedProducts.length} items available for rent
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
          >
            <Filter size={18} className="mr-2" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Always visible on desktop, toggleable on mobile */}
          <div 
            className={`
              md:w-64 bg-white rounded-lg shadow-md overflow-hidden
              ${showFilters ? 'block' : 'hidden md:block'}
              transition-all duration-300
            `}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <SlidersHorizontal size={18} className="mr-2 text-teal-600" />
                <h2 className="text-lg font-medium">Filters</h2>
              </div>
              <button 
                onClick={handleClearFilters}
                className="text-sm text-teal-600 hover:text-teal-800"
              >
                Clear All
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium mb-3">Category</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cat-all"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="cat-all" className="ml-2 text-sm text-gray-700">
                    All Categories
                  </label>
                </div>
                
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`cat-${category}`}
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                    />
                    <label htmlFor={`cat-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="flex space-x-2">
                <div>
                  <label htmlFor="min-price" className="sr-only">
                    Minimum Price
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className="sr-only">
                    Maximum Price
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium mb-3">Location</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="loc-all"
                    name="location"
                    value=""
                    checked={selectedLocation === ''}
                    onChange={() => setSelectedLocation('')}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="loc-all" className="ml-2 text-sm text-gray-700">
                    All Locations
                  </label>
                </div>
                
                {locations.map((location) => (
                  <div key={location} className="flex items-center">
                    <input
                      type="radio"
                      id={`loc-${location}`}
                      name="location"
                      value={location}
                      checked={selectedLocation === location}
                      onChange={() => setSelectedLocation(location)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                    />
                    <label htmlFor={`loc-${location}`} className="ml-2 text-sm text-gray-700">
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4">
              <button
                onClick={handleApplyFilters}
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1">
            {/* Sort controls */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{displayedProducts.length}</span> results
              </p>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setTimeout(filterProducts, 0);
                  }}
                  className="text-sm border border-gray-300 rounded p-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
            
            {/* Active filters */}
            {(selectedCategory || selectedLocation || priceRange.min || priceRange.max) && (
              <div className="bg-white p-3 rounded-lg shadow-sm mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedCategory && (
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span className="mr-1">Category: {selectedCategory}</span>
                      <button 
                        onClick={() => setSelectedCategory('')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {selectedLocation && (
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span className="mr-1">Location: {selectedLocation}</span>
                      <button 
                        onClick={() => setSelectedLocation('')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  
                  {(priceRange.min || priceRange.max) && (
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span className="mr-1">
                        Price: {priceRange.min ? `$${priceRange.min}` : '$0'} - 
                        {priceRange.max ? `$${priceRange.max}` : ' Any'}
                      </span>
                      <button 
                        onClick={() => setPriceRange({ min: '', max: '' })}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Products grid */}
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any items matching your current filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;