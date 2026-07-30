import React from 'react';
import { classNames } from '@utils/helpers';

export interface CategorySlideItemProps {
  image?: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

const getInitials = (label: string) =>
  label
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

const CategorySlideItem: React.FC<CategorySlideItemProps> = ({ image, label, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames('flex flex-col items-center gap-2 text-center cursor-pointer', className)}
  >
    <span className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-100 sm:h-20 sm:w-20 md:h-24 md:w-24">
      {image ? (
        <img src={image} alt={label} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-500">
          {getInitials(label)}
        </span>
      )}
    </span>
    <span className="max-w-[5.5rem] truncate text-xs font-medium text-gray-800 sm:text-sm">{label}</span>
  </button>
);

export default CategorySlideItem;
