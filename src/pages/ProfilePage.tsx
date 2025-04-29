import React, { useState } from 'react';
import { Calendar, Settings, CreditCard, Star, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { useRental } from '../context/RentalContext';
import { DateRange } from '../types';

const ProfilePage: React.FC = () => {
  const { currentUser, bookings, favorites, products } = useRental();
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites' | 'settings'>('bookings');
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
          <p className="text-gray-600 mb-6">
            Please sign in to view your profile and manage your bookings.
          </p>
          <button
            className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Calculate rental duration
  const calculateDuration = (dateRange: DateRange) => {
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };
  
  // User's favorite products
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="md:flex">
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
                    {currentUser.isVerified && (
                      <span className="ml-0 md:ml-2 mt-1 md:mt-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">Member since {formatDate(currentUser.joinedDate)}</p>
                  
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                    <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                      <Calendar size={14} className="mr-1 text-teal-600" />
                      <span>{bookings.length} Bookings</span>
                    </div>
                    <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                      <Heart size={14} className="mr-1 text-teal-600" />
                      <span>{favorites.length} Favorites</span>
                    </div>
                    <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                      <Star size={14} className="mr-1 text-yellow-500" fill="currentColor" />
                      <span>4.9 (15 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:flex md:flex-col md:justify-center p-4 md:p-8 md:ml-auto">
                <button className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          
          {/* Tab navigation */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${
                    activeTab === 'bookings'
                      ? 'border-teal-600 text-teal-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  <span>My Bookings</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${
                    activeTab === 'favorites'
                      ? 'border-teal-600 text-teal-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Heart size={16} className="mr-2" />
                  <span>Favorites</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${
                    activeTab === 'settings'
                      ? 'border-teal-600 text-teal-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Settings size={16} className="mr-2" />
                  <span>Account Settings</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {activeTab === 'bookings' && (
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your Bookings</h2>
                
                {bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map(booking => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 h-48 md:h-auto">
                            <img
                              src={booking.product.images[0]}
                              alt={booking.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="p-4 md:w-3/4">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                  {booking.product.name}
                                </h3>
                                <p className="text-gray-600 mb-3">
                                  {formatDate(booking.rental.startDate)} - {formatDate(booking.rental.endDate)}
                                </p>
                              </div>
                              
                              <div className="mt-2 md:mt-0 md:ml-4 md:text-right">
                                <span className={`
                                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${
                                    booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    booking.status === 'canceled' ? 'bg-red-100 text-red-800' :
                                    'bg-blue-100 text-blue-800'
                                  }
                                `}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                                <p className="text-gray-600 mt-1">
                                  Booking ID: #{booking.id.slice(0, 8)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 mt-4">
                              <div>
                                <p className="text-sm text-gray-500">Rental Period</p>
                                <p className="font-medium">{calculateDuration(booking.rental)} days</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Total Price</p>
                                <p className="font-medium">
                                  ${booking.totalPrice.toFixed(2)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Security Deposit</p>
                                <p className="font-medium">
                                  ${booking.deposit.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex flex-wrap gap-3">
                              {booking.status === 'confirmed' && (
                                <>
                                  <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                                    View Details
                                  </button>
                                  <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                                    Cancel Booking
                                  </button>
                                </>
                              )}
                              
                              {booking.status === 'completed' && (
                                <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                                  Write a Review
                                </button>
                              )}
                              
                              {booking.status === 'pending' && (
                                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                                  Contact Owner
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Calendar size={24} className="text-gray-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't made any bookings yet. Browse our catalog to find something you'd like to rent.
                    </p>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                      Browse Items
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'favorites' && (
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Your Favorites</h2>
                
                {favoriteProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProducts.map(product => (
                      <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-48">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-500 shadow-sm"
                            aria-label="Remove from favorites"
                          >
                            <Heart size={18} fill="currentColor" />
                          </button>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{product.location}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900">
                              ${product.pricePerDay.toFixed(2)}<span className="text-sm font-normal">/day</span>
                            </span>
                            <button className="px-3 py-1 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition-colors">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Heart size={24} className="text-gray-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No favorites yet</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't added any items to your favorites yet. Click the heart icon on any product to add it to your favorites.
                    </p>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                      Browse Items
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <div className="mb-8">
                      <h3 className="text-md font-medium text-gray-900 mb-4">Personal Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            defaultValue={currentUser.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            defaultValue={currentUser.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            defaultValue={currentUser.phone || ''}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                          Save Changes
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-md font-medium text-gray-900 mb-4">Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            id="currentPassword"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            id="newPassword"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-8">
                      <h3 className="text-md font-medium text-gray-900 mb-4">Payment Methods</h3>
                      
                      <div className="border border-gray-200 rounded-lg p-4 mb-4 flex items-center">
                        <div className="rounded-md bg-gray-100 p-2 mr-3">
                          <CreditCard size={20} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Visa ending in 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      
                      <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <CreditCard size={18} className="mr-2" />
                        <span>Add Payment Method</span>
                      </button>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-md font-medium text-gray-900 mb-4">Notifications</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label htmlFor="email-notif" className="text-gray-700">Email Notifications</label>
                          <input
                            id="email-notif"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label htmlFor="sms-notif" className="text-gray-700">SMS Notifications</label>
                          <input
                            id="sms-notif"
                            type="checkbox"
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label htmlFor="marketing-emails" className="text-gray-700">Marketing Emails</label>
                          <input
                            id="marketing-emails"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <button className="w-full px-4 py-2 border border-red-300 rounded-md text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center">
                        <LogOut size={18} className="mr-2" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;