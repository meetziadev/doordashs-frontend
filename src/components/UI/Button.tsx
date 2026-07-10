import React from 'react';
import { classNames } from '@utils/helpers';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

export const Button: React.FC<Props> = ({ children, variant = 'primary', className, ...props }) => {
  const variants: Record<string, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };
  return (
    <button className={classNames('px-4 py-2 rounded-md text-sm font-medium transition-colors', variants[variant] || variants.primary, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;

