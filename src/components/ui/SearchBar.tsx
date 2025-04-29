import React, { useState } from 'react';
import { Search, X, MapPin, Calendar, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct search params
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (location) params.append('location', location);
    
    // Navigate to search results
    navigate(`/products?${params.toString()}`);
    
    // Close search if on mobile
    if (onClose) onClose();
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex flex-col md:flex-row">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="What do you want to rent?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
          
          <div className="md:w-52 mt-2 md:mt-0 relative">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 md:border-l-0 rounded-lg md:rounded-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
          
          <button
            type="button"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="mt-2 md:mt-0 p-3 border border-gray-300 md:border-l-0 md:border-r-0 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 md:w-48 rounded-lg md:rounded-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <Calendar size={18} className="mr-2" />
            <span>Dates</span>
          </button>
          
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="mt-2 md:mt-0 p-3 border border-gray-300 md:border-l-0 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-50 md:w-20 rounded-lg md:rounded-l-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <Filter size={18} />
          </button>
          
          <button
            type="submit"
            className="mt-2 md:mt-0 p-3 bg-teal-600 text-white rounded-lg md:rounded-l-none hover:bg-teal-700 transition-colors md:w-24 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Search
          </button>
        </div>
        
        {/* Close button for overlay */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        )}
      </form>
      
      {/* Date picker panel (simplified) */}
      {showDatePicker && (
        <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-full md:w-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Select Dates</h3>
            <button
              onClick={() => setShowDatePicker(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <div>
              <label className="block text-sm text-gray-600">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">End Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 mt-1"
              />
            </div>
          </div>
          <button
            className="mt-4 w-full p-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
            onClick={() => setShowDatePicker(false)}
          >
            Apply Dates
          </button>
        </div>
      )}
      
      {/* Filters panel (simplified) */}
      {showFilters && (
        <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-full md:w-80 right-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">All Categories</option>
                <option value="cameras">Cameras</option>
                <option value="party-supplies">Party Supplies</option>
                <option value="tools">Tools</option>
                <option value="formal-wear">Formal Wear</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button
              className="flex-1 p-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              onClick={() => setShowFilters(false)}
            >
              Reset
            </button>
            <button
              className="flex-1 p-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              onClick={() => setShowFilters(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;