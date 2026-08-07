import React from 'react';

interface LoaderProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = false,
  size = 'md',
  text = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-[3px]',
    lg: 'w-16 h-16 border-4'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md'
    : 'w-full py-12 flex flex-col items-center justify-center';

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center">
        {/* Animated outer spinning ring */}
        <div 
          className={`border-gray-200 border-t-black dark:border-gray-700 dark:border-t-white rounded-full animate-spin ${sizeClasses[size]}`}
        />
        
        {/* Pulsing inner dot */}
        <div className="absolute w-2.5 h-2.5 bg-black dark:bg-white rounded-full animate-ping" />
      </div>
      
      {text && (
        <span className="mt-5 font-sans text-[11px] sm:text-[12px] font-semibold text-black dark:text-white tracking-[0.25em] uppercase select-none animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
};

export default Loader;
