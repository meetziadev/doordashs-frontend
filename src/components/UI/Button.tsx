import React from 'react';
import { classNames } from '@utils/helpers';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

export const Button: React.FC<Props> = ({ children, variant = 'primary', className, ...props }) => {
  const variants: Record<string, string> = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-inverse-foreground',
    secondary: 'bg-surface-muted hover:bg-border-strong text-foreground',
    danger: 'bg-danger hover:bg-danger-strong text-inverse-foreground'
  };
  return (
    <button className={classNames('px-4 py-2 rounded-md text-sm font-medium transition-colors', variants[variant] || variants.primary, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;

