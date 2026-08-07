import React from 'react';
import Skeleton from './Skeleton';
import {
  CategoryRowSkeleton,
  CategoryTileRowSkeleton,
  ProductOfTheDaySkeleton,
  ProductSliderSkeleton
} from './ProductSkeletons';

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-12">
    <CategoryRowSkeleton />
    <div className="space-y-4">
      <Skeleton width={220} height={28} />
      <CategoryTileRowSkeleton />
    </div>
    <div className="space-y-4">
      <Skeleton width={280} height={28} />
      <ProductSliderSkeleton />
    </div>
    <ProductOfTheDaySkeleton />
    <div className="space-y-4">
      <Skeleton width={160} height={28} />
      <ProductSliderSkeleton />
    </div>
  </div>
);
