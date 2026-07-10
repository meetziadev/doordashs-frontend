import React from 'react';
import { classNames } from '@utils/helpers';

const Card: React.FC<{ className?: string }> = ({ children, className }) => (
  <div className={classNames('bg-white rounded-lg shadow p-4', className)}>
    {children}
  </div>
);

export default Card;

