import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CreditCard, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useRental } from '../context/RentalContext';

const CheckoutPage: React.FC = () => {
  const { cart, removeFromCart } = useRental();
  const [step, setStep] = useState<'review' | 'payment' | 'confirmation'>('review');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    agreeToTerms: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (step === 'review') {
      if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc || !formData.agreeToTerms) {
        alert('Please fill in all required fields and agree to the terms');
        return;
      }
      // Process payment (in a real app, this would call a payment API)
      setTimeout(() => {
        setStep('confirmation');
        // Clear cart after successful payment
        removeFromCart();
      }, 1000);
    }
  };
  
  if (!cart) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <CreditCard size={24} className="text-orange-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600">
                You haven't added any items to your cart yet. Browse our catalog to find something you'd like to rent.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate rental duration in days
  const calculateDuration = () => {
    const start = new Date(cart.dateRange.startDate);
    const end = new Date(cart.dateRange.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };
  
  // Calculate total price
  const calculateTotal = () => {
    const days = calculateDuration();
    const product = cart.product;
    
    let rentalPrice;
    if (product.pricePerWeek && days >= 7) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      rentalPrice = (weeks * (product.pricePerWeek || 0)) + 
                   (remainingDays * product.pricePerDay);
    } else {
      rentalPrice = days * product.pricePerDay;
    }
    
    return {
      rental: rentalPrice,
      deposit: product.deposit,
      serviceFee: Math.round(rentalPrice * 0.1), // 10% service fee
      total: rentalPrice + product.deposit + Math.round(rentalPrice * 0.1)
    };
  };
  
  const totals = calculateTotal();
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {step === 'confirmation' ? (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for your booking. We've sent a confirmation email to {formData.email}.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Details</h2>
                
                <div className="flex items-start mb-4">
                  <img
                    src={cart.product.images[0]}
                    alt={cart.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{cart.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(cart.dateRange.startDate)} - {formatDate(cart.dateRange.endDate)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {calculateDuration()} days · {formatCurrency(totals.total)}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar size={16} className="mr-2 text-teal-600" />
                    <span>Pickup: {formatDate(cart.dateRange.startDate)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2 text-teal-600" />
                    <span>Return: {formatDate(cart.dateRange.endDate)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/"
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  Back to Home
                </Link>
                <Link
                  to="/profile"
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  View My Bookings
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Left column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">
                      {step === 'review' ? 'Review Your Booking' : 'Payment Details'}
                    </h1>
                    <div className="text-sm font-medium text-gray-500">
                      Step {step === 'review' ? '1' : '2'} of 2
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                  {step === 'review' ? (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address *
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number *
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Rental Details</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center mb-4">
                            <Calendar size={18} className="text-teal-600 mr-2" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {calculateDuration()} days rental
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(cart.dateRange.startDate)} - {formatDate(cart.dateRange.endDate)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock size={18} className="text-teal-600 mr-2" />
                            <div>
                              <p className="font-medium text-gray-900">Pickup & Return Times</p>
                              <p className="text-sm text-gray-600">
                                Between 10:00 AM and 6:00 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Card Details</h2>
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number *
                            </label>
                            <input
                              id="cardNumber"
                              name="cardNumber"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              required
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiration Date *
                              </label>
                              <input
                                id="cardExpiry"
                                name="cardExpiry"
                                type="text"
                                placeholder="MM/YY"
                                required
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                                CVC *
                              </label>
                              <input
                                id="cardCvc"
                                name="cardCvc"
                                type="text"
                                placeholder="123"
                                required
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 flex items-start">
                        <Shield size={20} className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Secure Payment</p>
                          <p className="text-sm text-gray-600">
                            Your payment information is secure. We use industry standard encryption to protect your data.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          id="agreeToTerms"
                          name="agreeToTerms"
                          type="checkbox"
                          required
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded mt-1"
                        />
                        <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                          I agree to the <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and <a href="#" className="text-teal-600 hover:underline">Rental Agreement</a>, and I acknowledge the <a href="#" className="text-teal-600 hover:underline">Cancellation Policy</a>.
                        </label>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-between">
                    {step === 'review' ? (
                      <Link
                        to={`/products/${cart.product.id}`}
                        className="inline-flex items-center text-gray-700 hover:text-teal-600"
                      >
                        <ArrowLeft size={16} className="mr-1" />
                        <span>Back to Product</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setStep('review')}
                        className="inline-flex items-center text-gray-700 hover:text-teal-600"
                      >
                        <ArrowLeft size={16} className="mr-1" />
                        <span>Back to Review</span>
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                    >
                      {step === 'review' ? 'Continue to Payment' : 'Complete Booking'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Right column - Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-20">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start mb-6">
                    <img
                      src={cart.product.images[0]}
                      alt={cart.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">{cart.product.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(cart.dateRange.startDate)} - {formatDate(cart.dateRange.endDate)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {formatCurrency(cart.product.pricePerDay)} × {calculateDuration()} days
                      </span>
                      <span className="text-gray-900">{formatCurrency(totals.rental)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security deposit</span>
                      <span className="text-gray-900">{formatCurrency(totals.deposit)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span className="text-gray-900">{formatCurrency(totals.serviceFee)}</span>
                    </div>
                    
                    <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{formatCurrency(totals.total)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex text-sm">
                        <Shield size={16} className="text-teal-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Secure booking</p>
                          <p className="text-gray-600">
                            Your deposit is only charged if the item is damaged or not returned.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-2">Cancellation Policy</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Free cancellation up to 48 hours before pickup. After that, the booking is non-refundable.
                    </p>
                    
                    <h3 className="font-medium text-gray-900 mb-2">Payment Information</h3>
                    <p className="text-sm text-gray-600">
                      You won't be charged until your booking is confirmed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;