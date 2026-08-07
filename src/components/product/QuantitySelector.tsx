import React from 'react';
import { classNames } from '@utils/helpers';

export interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  className
}) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-between bg-[#F0EEED] rounded-full text-gray-950 font-bold select-none',
        className || 'w-24 sm:w-28 py-1.5 px-3 text-sm'
      )}
    >
      <button
        type="button"
        onClick={onDecrement}
        className="cursor-pointer text-gray-600 hover:text-gray-950 transition-colors px-1"
      >
        —
      </button>
      <span className="font-sans font-bold">{quantity}</span>
      <button
        type="button"
        onClick={onIncrement}
        className="cursor-pointer text-gray-600 hover:text-gray-950 transition-colors px-1"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
