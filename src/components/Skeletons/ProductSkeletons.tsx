import React from 'react';
import Skeleton from './Skeleton';

type ProductCardSkeletonProps = {
  className?: string;
};

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ className }) => (
  <div className={className ?? 'w-40 sm:w-48 md:w-56 lg:w-60'}>
    <Skeleton variant="rectangular" className="aspect-[3/4] w-full rounded-2xl sm:rounded-3xl" />
    <div className="mt-3.5 space-y-2 px-0.5">
      <Skeleton width="80%" height={16} />
      <Skeleton width="45%" height={12} />
      <Skeleton width="35%" height={18} />
    </div>
  </div>
);

type ProductGridSkeletonProps = {
  count?: number;
};

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({ count = 10 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} className="w-full" />
    ))}
  </div>
);

type ProductSliderSkeletonProps = {
  count?: number;
};

export const ProductSliderSkeleton: React.FC<ProductSliderSkeletonProps> = ({ count = 5 }) => (
  <div className="flex gap-6 overflow-hidden">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

export const CategoryCircleSkeleton: React.FC = () => (
  <div className="flex flex-col items-center gap-2">
    <Skeleton variant="circular" width={96} height={96} className="sm:h-20 sm:w-20 md:h-24 md:w-24" />
    <Skeleton width={64} height={12} />
  </div>
);

type CategoryRowSkeletonProps = {
  count?: number;
};

export const CategoryRowSkeleton: React.FC<CategoryRowSkeletonProps> = ({ count = 8 }) => (
  <div className="flex gap-6 overflow-hidden">
    {Array.from({ length: count }).map((_, index) => (
      <CategoryCircleSkeleton key={index} />
    ))}
  </div>
);

export const CategoryTileSkeleton: React.FC = () => (
  <div className="flex w-32 flex-col items-center sm:w-40 md:w-48 lg:w-52">
    <Skeleton variant="rectangular" className="w-full aspect-square md:h-[225px] md:w-[215px]" />
    <Skeleton width="60%" height={14} className="mt-3.5" />
  </div>
);

type CategoryTileRowSkeletonProps = {
  count?: number;
};

export const CategoryTileRowSkeleton: React.FC<CategoryTileRowSkeletonProps> = ({ count = 5 }) => (
  <div className="flex gap-4 overflow-hidden">
    {Array.from({ length: count }).map((_, index) => (
      <CategoryTileSkeleton key={index} />
    ))}
  </div>
);

export const ProductOfTheDaySkeleton: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
    <Skeleton variant="rectangular" className="w-full aspect-[4/3] rounded-2xl" />
    <div className="space-y-4">
      <Skeleton width="40%" height={14} />
      <Skeleton width="75%" height={32} />
      <Skeleton width="90%" height={14} />
      <Skeleton width="80%" height={14} />
      <div className="flex gap-3 pt-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width={85} height={90} />
        ))}
      </div>
      <Skeleton width={160} height={44} className="rounded-full mt-2" />
    </div>
  </div>
);

export const CollectionPageSkeleton: React.FC = () => (
  <div className="space-y-8">
    <div className="space-y-2">
      <Skeleton width={120} height={14} />
      <Skeleton width={220} height={36} />
      <Skeleton width={280} height={14} />
      <Skeleton width={100} height={12} />
    </div>
    <ProductGridSkeleton count={10} />
  </div>
);

export const BrandPageSkeleton: React.FC = () => (
  <div className="space-y-8">
    <Skeleton width={120} height={14} />
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={64} height={64} />
      <div className="space-y-2">
        <Skeleton width={180} height={32} />
        <Skeleton width={320} height={14} />
        <Skeleton width={100} height={12} />
      </div>
    </div>
    <ProductSliderSkeleton count={5} />
  </div>
);

export const CategoryPageSkeleton: React.FC = () => (
  <div className="space-y-8">
    <Skeleton width={120} height={14} />
    <div className="space-y-2">
      <Skeleton width={200} height={36} />
      <Skeleton width={100} height={14} />
    </div>
    <ProductSliderSkeleton count={5} />
  </div>
);

export const ProductDetailSkeleton: React.FC = () => (
  <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-12 bg-white">
    <Skeleton width={220} height={14} />
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
      <div className="flex-1 space-y-4">
        <Skeleton variant="rectangular" className="w-full aspect-[4/5] rounded-2xl" />
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" className="h-20 w-20 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="flex-1 space-y-4 lg:max-w-[50%]">
        <Skeleton width="40%" height={12} />
        <Skeleton width="85%" height={36} />
        <Skeleton width="30%" height={16} />
        <Skeleton width="45%" height={32} />
        <Skeleton width="100%" height={14} />
        <Skeleton width="95%" height={14} />
        <Skeleton width="80%" height={14} />
        <div className="flex gap-3 pt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} width={72} height={40} className="rounded-full" />
          ))}
        </div>
        <div className="flex gap-4 pt-4">
          <Skeleton width={140} height={48} className="rounded-full" />
          <Skeleton width="100%" height={48} className="rounded-full" />
        </div>
      </div>
    </div>
  </div>
);
