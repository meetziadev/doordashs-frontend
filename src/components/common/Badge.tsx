import React from 'react';
import { classNames } from '@utils/helpers';

type Props = {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Badge: React.FC<Props> = ({
  children,
  variant = 'default',
  size = 'md',
  className
}) => {
  const variantClasses: Record<string, string> = {
    default: 'bg-surface-muted text-foreground dark:bg-gray-700 dark:text-gray-200',
    success: 'bg-success-bg text-success-foreground dark:bg-green-900/30 dark:text-green-300',
    error: 'bg-danger-bg text-danger-foreground dark:bg-red-900/30 dark:text-red-300',
    warning: 'bg-warning-bg text-warning-foreground dark:bg-yellow-900/30 dark:text-yellow-300',
    info: 'bg-info-bg text-info-foreground dark:bg-blue-900/30 dark:text-blue-300'
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span
      className={classNames(
        'inline-flex items-center font-medium rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;

