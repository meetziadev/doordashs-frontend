import React from 'react';
import { classNames } from '@utils/helpers';

const sizes: Record<string, string> = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' };

type Props = {
  title?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customClass?: string;
};

const Modal: React.FC<Props> = ({ title, isOpen, onClose, children, footer, size = 'md', customClass }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={classNames('relative bg-white w-full mx-4 rounded-lg shadow', sizes[size], customClass)}>
        {title ? (
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        ) : null}
        <div className="p-4">{children}</div>
        {footer ? <div className="p-4 border-t">{footer}</div> : null}
      </div>
    </div>
  );
};

export default Modal;

