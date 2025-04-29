import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Shield, Clock, Tag, Award } from 'lucide-react';
import { useRental } from '../context/RentalContext';
import CategoryCard from '../components/product/CategoryCard';
import ProductCard from '../components/product/ProductCard';
import SearchBar from '../components/ui/SearchBar';
import { mockCategories } from '../data/mockData';

const HomePage: React.FC = () => {
  const { products } = useRental();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-teal-600/20 blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-orange-500/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
              Rent Anything.
              <span className="text-teal-400 block mt-2">Save Money. Live Better.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fadeInUp">
              Access thousands of items without the commitment of ownership.
              From cameras to party supplies, find exactly what you need.
            </p>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 md:p-6 animate-fadeInUp">
              <SearchBar />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-8 text-gray-300">
            <div className="flex items-center">
              <Shield size={16} className="mr-1 text-teal-400" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-teal-400" />
              <span>Flexible Rental Periods</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-1 text-teal-400" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center">
              <Award size={16} className="mr-1 text-teal-400" />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Categories</h2>
            <Link 
              to="/products" 
              className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockCategories.slice(0, 4).map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Items</h2>
            <Link 
              to="/products" 
              className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How RentHub Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              RentHub makes renting simple, secure, and sustainable. Follow these steps to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Find</h3>
              <p className="text-gray-600">
                Browse thousands of items across multiple categories. 
                Filter by location, dates, and price to find exactly what you need.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Pay</h3>
              <p className="text-gray-600">
                Select your rental dates and book securely online.
                Pay only for the time you need with transparent pricing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pickup & Return</h3>
              <p className="text-gray-600">
                Meet the owner to pickup your item on the scheduled date.
                Return it when you're done and share your experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Have items to rent out?
              </h2>
              <p className="text-teal-100">
                Turn your unused items into income. List on RentHub today and start earning.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/list-item"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white rounded-lg font-medium text-white hover:bg-white hover:text-teal-600 transition-colors"
              >
                List Your Item
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 bg-white rounded-lg font-medium text-teal-600 hover:bg-teal-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// Import the missing icon components
function Calendar(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function Package(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}