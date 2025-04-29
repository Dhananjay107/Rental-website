import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Calendar } from 'lucide-react';
import { Product } from '../../types';
import { useRental } from '../../context/RentalContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useRental();
  const isFavorite = favorites.includes(product.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  // Format prices
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Card image container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full
            ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-600 hover:text-red-500'}
            transition-colors duration-200 z-10`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex justify-between items-end">
            <span className="text-white font-bold text-lg">
              {formatPrice(product.pricePerDay)}
              <span className="text-xs font-normal opacity-90">/day</span>
            </span>
            <div className="flex items-center bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-800">
              <Star size={12} className="text-yellow-500 mr-1" fill="currentColor" />
              {product.avgRating} ({product.reviews.length})
            </div>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-2 text-sm">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{product.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-xs">
          <Calendar size={14} className="mr-1" />
          <span>
            {product.availability.length > 0 
              ? `Available: ${new Date(product.availability[0].startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              : 'Not available'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;