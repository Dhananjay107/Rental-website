import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 20, 
  interactive = false,
  onRatingChange 
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => {
        const fill = (hoverRating || rating) >= index ? 'currentColor' : 'none';
        const displayRating = hoverRating || rating;
        
        return (
          <button
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
            className={`text-yellow-400 p-0.5 focus:outline-none ${
              interactive ? 'cursor-pointer' : 'cursor-default'
            }`}
            aria-label={`Rate ${index} stars`}
          >
            <Star 
              size={size} 
              fill={fill} 
              className={`transition-all duration-100 ${
                displayRating >= index - 0.5 && displayRating < index
                  ? 'text-yellow-400'
                  : displayRating >= index
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;