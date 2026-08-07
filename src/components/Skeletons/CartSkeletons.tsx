import React from 'react';
import Skeleton from './Skeleton';

export const CartItemSkeleton: React.FC = () => (
  <div className="flex gap-4 pb-6 border-b border-gray-200">
    <Skeleton variant="rectangular" className="h-24 w-24 md:h-[124px] md:w-[124px] rounded-2xl shrink-0" />
    <div className="flex-1 space-y-2 py-1">
      <Skeleton width="55%" height={20} />
      <Skeleton width="30%" height={14} />
      <Skeleton width="25%" height={14} />
      <Skeleton width="20%" height={24} className="mt-4" />
    </div>
  </div>
);

export const CartPageSkeleton: React.FC = () => (
  <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-8 bg-white">
    <Skeleton width={120} height={14} />
    <Skeleton width={180} height={36} />
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      <div className="flex-1 w-full space-y-6">
        <CartItemSkeleton />
        <CartItemSkeleton />
        <CartItemSkeleton />
      </div>
      <div className="w-full lg:w-[380px] xl:w-[440px] space-y-4">
        <Skeleton width="50%" height={28} />
        <Skeleton width="100%" height={16} />
        <Skeleton width="100%" height={16} />
        <Skeleton width="100%" height={16} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="100%" height={48} className="rounded-full" />
        <Skeleton width="100%" height={52} className="rounded-full" />
      </div>
    </div>
  </div>
);

export const CheckoutPageSkeleton: React.FC = () => (
  <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-8 bg-white">
    <Skeleton width={160} height={14} />
    <Skeleton width={200} height={36} />
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      <div className="flex-1 w-full space-y-4">
        <Skeleton width="40%" height={24} />
        <Skeleton variant="rectangular" className="w-full h-40 rounded-2xl" />
        <Skeleton variant="rectangular" className="w-full h-40 rounded-2xl" />
        <Skeleton width={160} height={44} className="rounded-full" />
      </div>
      <div className="w-full lg:w-[380px] xl:w-[440px] space-y-4 border border-gray-200 rounded-[20px] p-6">
        <Skeleton width="50%" height={24} />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-3 items-center">
              <Skeleton variant="rectangular" className="h-16 w-16 rounded-2xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton width="70%" height={14} />
                <Skeleton width="40%" height={12} />
              </div>
            </div>
          ))}
        </div>
        <Skeleton width="100%" height={16} />
        <Skeleton width="100%" height={16} />
        <Skeleton width="100%" height={48} className="rounded-full" />
      </div>
    </div>
  </div>
);
