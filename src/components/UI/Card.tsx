import React from 'react';
import { classNames } from '@utils/helpers';

const Card: React.FC<{ className?: string; children?: React.ReactNode }> = ({ children, className }) => (
  <div className={classNames('bg-surface text-surface-foreground rounded-lg shadow p-4', className)}>
    {children}
  </div>
);

export default Card;

