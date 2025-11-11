import { useEffect, useState } from "react";

type RatingProps = {
  initialRating?: number;
  onRate?: (rating: any) => void;
};

const Rating: React.FC<RatingProps> = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleRating = (value: any) => {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  };

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            onClick={() => handleRating(starValue)}
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
