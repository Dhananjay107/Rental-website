import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, MapPin, Calendar, Shield, Clock, ChevronLeft, ChevronRight, 
  Share2, AlarmClock, DollarSign
} from 'lucide-react';
import { useRental } from '../context/RentalContext';
import RatingStars from '../components/ui/RatingStars';
import DateRangePicker from '../components/ui/DateRangePicker';
import { DateRange, Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, favorites, addToFavorites, removeFromFavorites, addToCart } = useRental();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState<DateRange | null>(null);
  const [rentalPeriod, setRentalPeriod] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setTotalPrice(product.pricePerDay);
    }
    setLoading(false);
  }, [id, products]);

  useEffect(() => {
    if (selectedProduct && selectedDates) {
      const start = new Date(selectedDates.startDate);
      const end = new Date(selectedDates.endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      setRentalPeriod(days);
      
      // Calculate price based on rental period
      let price;
      if (selectedProduct.pricePerWeek && days >= 7) {
        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;
        price = (weeks * selectedProduct.pricePerWeek) + 
               (remainingDays * selectedProduct.pricePerDay);
      } else {
        price = days * selectedProduct.pricePerDay;
      }
      
      setTotalPrice(price);
    }
  }, [selectedDates, selectedProduct]);

  const handleDateRangeSelect = (dateRange: DateRange) => {
    setSelectedDates(dateRange);
  };

  const handlePrevImage = () => {
    if (selectedProduct && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedProduct && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleToggleFavorite = () => {
    if (!selectedProduct) return;
    
    if (favorites.includes(selectedProduct.id)) {
      removeFromFavorites(selectedProduct.id);
    } else {
      addToFavorites(selectedProduct.id);
    }
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedDates) return;
    
    addToCart(selectedProduct, selectedDates);
    window.location.href = '/checkout';
  };

  const isFavorite = selectedProduct ? favorites.includes(selectedProduct.id) : false;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/products"
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm">
            <ol className="flex flex-wrap items-center">
              <li>
                <Link to="/" className="text-gray-500 hover:text-teal-600">
                  Home
                </Link>
              </li>
              <span className="mx-2 text-gray-400">/</span>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-teal-600">
                  Products
                </Link>
              </li>
              <span className="mx-2 text-gray-400">/</span>
              <li>
                <Link to={`/products?category=${selectedProduct.category}`} className="text-gray-500 hover:text-teal-600">
                  {selectedProduct.category}
                </Link>
              </li>
              <span className="mx-2 text-gray-400">/</span>
              <li className="text-gray-800 font-medium truncate">
                {selectedProduct.name}
              </li>
            </ol>
          </nav>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Product image gallery */}
            <div className="md:w-3/5 relative">
              <div className="relative h-80 md:h-full">
                <img
                  src={selectedProduct.images[currentImageIndex]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image navigation buttons */}
                {selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -mt-6 p-3 rounded-full bg-white/70 text-gray-800 hover:bg-white hover:text-teal-600 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -mt-6 p-3 rounded-full bg-white/70 text-gray-800 hover:bg-white hover:text-teal-600 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Thumbnail indicators */}
                {selectedProduct.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {selectedProduct.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full ${
                          index === currentImageIndex 
                            ? 'bg-white' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Product information */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
                  <div className="flex items-center mb-1">
                    <RatingStars rating={selectedProduct.avgRating} size={16} />
                    <span className="ml-2 text-sm text-gray-600">
                      {selectedProduct.avgRating} ({selectedProduct.reviews.length} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <button 
                    onClick={handleToggleFavorite}
                    className={`
                      p-2 rounded-full border 
                      ${isFavorite 
                        ? 'bg-red-50 border-red-100 text-red-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-red-500'}
                    `}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button 
                    className="ml-2 p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:text-teal-600"
                    aria-label="Share"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <div className="mb-4 flex items-center text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>{selectedProduct.location}</span>
              </div>
              
              <div className="mb-6 flex flex-wrap gap-3">
                <div className="flex items-center bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-sm">
                  <DollarSign size={14} className="mr-1" />
                  <span>
                    {formatCurrency(selectedProduct.pricePerDay)}/day
                  </span>
                </div>
                {selectedProduct.pricePerWeek && (
                  <div className="flex items-center bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-sm">
                    <DollarSign size={14} className="mr-1" />
                    <span>
                      {formatCurrency(selectedProduct.pricePerWeek)}/week
                    </span>
                  </div>
                )}
                <div className="flex items-center bg-orange-50 text-orange-800 px-3 py-1 rounded-full text-sm">
                  <Shield size={14} className="mr-1" />
                  <span>
                    {formatCurrency(selectedProduct.deposit)} deposit
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Calendar size={18} className="text-teal-600 mr-2" />
                  <h3 className="text-lg font-medium">Select Rental Period</h3>
                </div>
                
                <DateRangePicker 
                  availability={selectedProduct.availability} 
                  onDateRangeSelect={handleDateRangeSelect}
                />
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Price</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(totalPrice)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedDates ? `for ${rentalPeriod} days` : 'per day'}
                    </p>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedDates}
                    className={`
                      px-6 py-3 rounded-lg font-medium text-white
                      ${selectedDates
                        ? 'bg-teal-600 hover:bg-teal-700'
                        : 'bg-gray-400 cursor-not-allowed'}
                      transition-colors
                    `}
                  >
                    Book Now
                  </button>
                </div>
                
                {!selectedDates && (
                  <p className="text-orange-600 text-sm flex items-center">
                    <AlarmClock size={14} className="mr-1" />
                    Please select your rental dates to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs - simplified version */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <h2 className="text-xl font-bold text-gray-900">About this item</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Features & Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-800">
                    1
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Professional-grade equipment available for daily or weekly rental
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-800">
                    2
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Includes all necessary accessories and carrying case
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-800">
                    3
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Security deposit required and fully refundable upon return
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-800">
                    4
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Item is professionally cleaned and inspected between rentals
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Owner Information</h3>
              <div className="flex items-center">
                <img
                  src={selectedProduct.owner.avatar}
                  alt={selectedProduct.owner.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">
                    {selectedProduct.owner.name}
                    {selectedProduct.owner.isVerified && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Verified
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Member since {new Date(selectedProduct.owner.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Reviews ({selectedProduct.reviews.length})</h3>
              
              {selectedProduct.reviews.length > 0 ? (
                <div className="space-y-6">
                  {selectedProduct.reviews.map(review => (
                    <div key={review.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                          <div className="flex items-center">
                            <RatingStars rating={review.rating} size={14} />
                            <span className="ml-2 text-xs text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet. Be the first to review this item!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;