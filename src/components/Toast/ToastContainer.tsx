import React from 'react';
import Toast from './Toast';
import { classNames } from '@utils/helpers';
import { ToastItem, ToastPosition } from '@/types';

type Props = {
  toasts: ToastItem[];
  onClose: (id: string) => void;
  position?: ToastPosition;
  darkMode?: boolean;
};

const positionClasses: Record<NonNullable<Props['position']>, string> = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
};

const ToastContainer: React.FC<Props> = ({
  toasts,
  onClose,
  position = 'top-right',
  darkMode = false
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className={classNames(
        'fixed z-50 flex flex-col gap-2',
        positionClasses[position],
        darkMode && 'dark'
      )}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          duration={toast.duration}
          onClose={onClose}
          position={position}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

