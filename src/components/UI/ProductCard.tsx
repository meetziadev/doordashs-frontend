import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from '@assets/icons';
import { classNames } from '@utils/helpers';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string | number;
  image?: string;
  rating?: number;
  currency?: string;
  category?: string;
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className, onClick }) => {
  const navigate = useNavigate();
  const currencySymbol = product.currency || 'RS';
  const ratingValue = product.rating ?? 5.0;

  const formatPrice = (value: number) => {
    const formatted = value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
    return `${currencySymbol} ${formatted}`;
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/admin/product/${product.id}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={classNames(
        'group flex w-40 flex-col cursor-pointer sm:w-48 md:w-56 lg:w-60 select-none transition-all duration-200 hover:opacity-95',
        className
      )}
    >
      {/* Image Container with high rounded corners */}
      <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#F5F5F7] sm:rounded-3xl relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-400">
            {product.name}
          </span>
        )}
      </div>

      {/* Content details aligned perfectly to the left */}
      <div className="mt-3.5 flex flex-col px-0.5">
        <h3 className="text-sm font-medium text-[#2D2A26] sm:text-base line-clamp-1">
          {product.name}
        </h3>

        {/* Rating Stars and Score */}
        <div className="mt-1.5 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => {
            const starValue = i + 1;
            if (ratingValue >= starValue) {
              return (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#FBBF24] stroke-[#FBBF24]"
                />
              );
            } else if (ratingValue > i && ratingValue < starValue) {
              return (
                <div key={i} className="relative h-4 w-4">
                  <Star className="absolute top-0 left-0 h-4 w-4 fill-[#E5E7EB] stroke-[#E5E7EB]" />
                  <div className="absolute top-0 left-0 h-4 overflow-hidden" style={{ width: '50%' }}>
                    <Star className="h-4 w-4 fill-[#FBBF24] stroke-[#FBBF24]" />
                  </div>
                </div>
              );
            } else {
              return (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#E5E7EB] stroke-[#E5E7EB]"
                />
              );
            }
          })}
          <span className="ml-2 text-xs font-semibold text-gray-500 sm:text-sm">
            {ratingValue.toFixed(1)}/5
          </span>
        </div>

        {/* Price Row */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-base font-bold text-gray-900 sm:text-lg">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through sm:text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {product.discount && (
            <span className="inline-flex items-center justify-center rounded-full bg-[#FFF0F2] px-2 py-0.5 text-[10px] font-bold text-[#FF5A70] sm:text-xs">
              {typeof product.discount === 'number' ? `-${product.discount}%` : product.discount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


