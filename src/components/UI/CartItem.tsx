import React from 'react';
import { Trash2 } from '@assets/icons';
import QuantitySelector from './QuantitySelector';

export interface CartItemProps {
  id: string;
  name: string;
  brand?: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  isLast?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  brand,
  size,
  color,
  price,
  image,
  quantity,
  onQuantityChange,
  onRemove,
  isLast = false
}) => {
  const formatPrice = (value: number) => {
    return `Rs ${value.toLocaleString('en-US')}`;
  };

  return (
    <div
      className={`flex gap-4 relative pb-6 text-left ${!isLast ? 'border-b border-gray-300' : ''
        }`}
    >
      {/* Product Image Container */}
      <div className="w-[96px] h-[96px] md:w-[124px] md:h-[124px] rounded-2xl overflow-hidden bg-[#F0EEED] relative flex-shrink-0 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product details */}
      <div className="flex-1 flex flex-col justify-between py-1 pr-8">
        <div>
          <h3 className="font-sans text-base sm:text-[20px] font-regular text-black">
            {name}
          </h3>
          <div className="mt-1 text-[14px] text-black font-normal">
            {brand ? (
              <p>
                Brand: <span className="text-gray-600">{brand}</span>
              </p>
            ) : null}
            <p className={brand ? 'mt-0.5' : undefined}>
              Size: <span className="text-gray-600">{size}</span>
            </p>
            <p className="mt-0.5">Color: <span className="text-gray-600">{color}</span></p>
          </div>
        </div>
        <span className="text-[24px] font-regular text-black">
          {formatPrice(price)}
        </span>
      </div>

      {/* Remove button (Trash) */}
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="absolute top-1 right-1 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
        aria-label="Remove item"
      >
        <Trash2 size={20} />
      </button>

      {/* Quantity incrementor */}
      <QuantitySelector
        quantity={quantity}
        onIncrement={() => onQuantityChange(id, 1)}
        onDecrement={() => onQuantityChange(id, -1)}
        className="absolute bottom-6 right-1 w-24 sm:w-28 py-1.5 px-3 text-sm"
      />
    </div>
  );
};

export default CartItem;
