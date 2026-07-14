import React from 'react';
import { classNames } from '@utils/helpers';

export interface ProductCategorySlideItemProps {
  image?: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

const ProductCategorySlideItem: React.FC<ProductCategorySlideItemProps> = ({ image, label, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames('flex w-32 flex-col items-center text-center sm:w-40 md:w-48 lg:w-52 cursor-pointer select-none transition-all hover:opacity-95', className)}
  >
    <span className="w-full sm:aspect-square md:aspect-square md:h-[225px] md:w-[215px] overflow-hidden bg-surface-muted relative">
      {image ? (
        <img src={image} alt={label} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </span>
    <span className="mt-3.5 text-xs font-bold uppercase tracking-widest text-[#2D2A26] sm:text-sm">
      {label}
    </span>
  </button>
);

export default ProductCategorySlideItem;
