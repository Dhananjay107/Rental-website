import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, PartyPopper, Hammer, Shirt, Smartphone, Dumbbell } from 'lucide-react';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Map category icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'camera':
        return <Camera size={24} />;
      case 'party-popper':
        return <PartyPopper size={24} />;
      case 'hammer':
        return <Hammer size={24} />;
      case 'shirt':
        return <Shirt size={24} />;
      case 'smartphone':
        return <Smartphone size={24} />;
      case 'dumbbell':
        return <Dumbbell size={24} />;
      default:
        return <Camera size={24} />;
    }
  };

  return (
    <Link
      to={`/products?category=${category.name}`}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative w-full h-48">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-colors duration-300"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <div className="mb-2 p-3 bg-teal-600/90 rounded-full transform group-hover:scale-110 transition-transform duration-300">
            {getIcon(category.icon)}
          </div>
          <h3 className="text-xl font-semibold text-center group-hover:text-teal-300 transition-colors duration-300">
            {category.name}
          </h3>
          <span className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
            Browse Items →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;