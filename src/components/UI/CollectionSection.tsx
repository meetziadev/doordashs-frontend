import React from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '@utils/helpers';

export interface CollectionSectionProps {
  title: string;
  viewAllUrl?: string;
  children: React.ReactNode;
  className?: string;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  title,
  viewAllUrl,
  children,
  className
}) => {
  return (
    <section aria-label={title} className={classNames('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-foreground sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {viewAllUrl && (
          <Link
            to={viewAllUrl}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-2.5 text-sm font-semibold text-gray-900 shadow-xs transition-all hover:bg-gray-50 hover:border-gray-300 active:scale-95"
          >
            View All
          </Link>
        )}
      </div>
      {children}
    </section>
  );
};

export default CollectionSection;
