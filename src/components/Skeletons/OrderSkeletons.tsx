import React from 'react';
import Skeleton from './Skeleton';

export const ActiveOrderCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-[12px] border border-gray-200 overflow-hidden w-full">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 border-b border-gray-200">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton width="50%" height={12} />
          <Skeleton width="70%" height={12} />
        </div>
      ))}
    </div>
    <div className="flex flex-col lg:flex-row p-5 gap-6">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex gap-4 items-center">
            <Skeleton variant="rectangular" className="h-20 w-20 rounded-md shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton width="80%" height={14} />
              <Skeleton width="50%" height={12} />
              <Skeleton width="45%" height={12} />
            </div>
          </div>
        ))}
      </div>
      <Skeleton variant="rectangular" className="h-24 w-full sm:w-[160px] rounded-[8px]" />
    </div>
  </div>
);

export const OrdersPageSkeleton: React.FC = () => (
  <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-8 bg-white">
    <Skeleton width={120} height={14} />
    <div className="space-y-2">
      <Skeleton width={180} height={36} />
    </div>
    <div className="flex gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} width={110} height={36} className="rounded-full" />
      ))}
    </div>
    <div className="space-y-5">
      <ActiveOrderCardSkeleton />
      <ActiveOrderCardSkeleton />
    </div>
  </div>
);
