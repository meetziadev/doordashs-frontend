import React from 'react';
import Skeleton from './Skeleton';

export const ProfilePageSkeleton: React.FC = () => (
  <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-8 bg-white">
    <Skeleton width={120} height={14} />
    <div className="space-y-2">
      <Skeleton width={160} height={36} />
      <Skeleton width={360} height={14} />
    </div>
    <div className="rounded-2xl border border-gray-200 p-6 flex items-center gap-4">
      <Skeleton variant="circular" width={72} height={72} />
      <div className="space-y-2 flex-1">
        <Skeleton width="30%" height={20} />
        <Skeleton width="40%" height={14} />
        <Skeleton width="25%" height={14} />
      </div>
    </div>
    <div className="rounded-2xl border border-gray-200 p-6 space-y-5">
      <Skeleton width="25%" height={20} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton width="40%" height={12} />
            <Skeleton width="100%" height={44} className="rounded-[8px]" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const NotificationListSkeleton: React.FC = () => (
  <ul>
    {Array.from({ length: 5 }).map((_, index) => (
      <li key={index} className="border-b border-gray-100 last:border-b-0 px-4 py-3">
        <div className="flex gap-3">
          <Skeleton variant="circular" width={8} height={8} className="mt-2" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between gap-2">
              <Skeleton width="55%" height={14} />
              <Skeleton width={40} height={10} />
            </div>
            <Skeleton width="90%" height={12} />
            <Skeleton width="35%" height={10} />
          </div>
        </div>
      </li>
    ))}
  </ul>
);
