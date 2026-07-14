import React from 'react';
import { Star, Check, MoreHorizontal } from '@assets/icons';

export interface ReviewCardProps {
  rating: number;
  author: string;
  comment: string;
  isVerified?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  author,
  comment,
  isVerified = true
}) => {
  const renderStars = (ratingVal: number) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;
      if (ratingVal >= starValue) {
        return (
          <Star
            key={i}
            className="h-4.5 w-4.5 fill-[#FBBF24] stroke-[#FBBF24]"
          />
        );
      } else if (ratingVal > i && ratingVal < starValue) {
        return (
          <div key={i} className="relative h-4.5 w-4.5">
            <Star className="absolute top-0 left-0 h-4.5 w-4.5 fill-[#E5E7EB] stroke-[#E5E7EB]" />
            <div className="absolute top-0 left-0 h-4.5 overflow-hidden" style={{ width: '50%' }}>
              <Star className="h-4.5 w-4.5 fill-[#FBBF24] stroke-[#FBBF24]" />
            </div>
          </div>
        );
      } else {
        return (
          <Star
            key={i}
            className="h-4.5 w-4.5 fill-[#E5E7EB] stroke-[#E5E7EB]"
          />
        );
      }
    });
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 relative bg-white flex flex-col text-left">
      <div className="flex items-center gap-0.5">
        {renderStars(rating)}
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span className="font-bold text-gray-950">{author}</span>
        {isVerified && (
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-white">
            <Check size={10} className="stroke-[3]" />
          </span>
        )}
      </div>
      <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed font-normal">
        {comment}
      </p>
      <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
};

export default ReviewCard;
