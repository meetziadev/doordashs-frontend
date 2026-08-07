import React from 'react';
import { classNames } from '@utils/helpers';

export interface PromoCardProps {
  title: string;
  buttonText: string;
  image: string;
  onClick?: () => void;
  className?: string;
}

export const PromoCard: React.FC<PromoCardProps> = ({
  title,
  buttonText,
  image,
  onClick,
  className
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'group relative overflow-hidden rounded-[2rem] aspect-[4/5] cursor-pointer select-none shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]',
        className
      )}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-103"
      />

      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-black/15 transition-colors duration-300 group-hover:bg-black/20" />

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium tracking-tight mb-5 select-text drop-shadow-sm">
          {title}
        </h3>
        <button
          type="button"
          className="bg-white text-gray-950 px-6 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-gray-50 active:scale-95 shadow-sm"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
