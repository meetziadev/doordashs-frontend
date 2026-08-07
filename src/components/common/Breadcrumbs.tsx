import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from '@assets/icons';
import { classNames } from '@utils/helpers';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <div className={classNames('flex items-center flex-wrap gap-2 text-xs sm:text-sm text-gray-500 font-medium select-none mb-6', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />}

            {isLast ? (
              <span className="text-gray-900 font-semibold truncate">
                {item.label}
              </span>
            ) : item.url ? (
              <Link to={item.url} className="hover:text-gray-900 transition-colors truncate">
                {item.label}
              </Link>
            ) : (
              <span className="hover:text-gray-900 cursor-pointer transition-colors truncate">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
