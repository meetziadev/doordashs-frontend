import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { classNames } from '@utils/helpers';
import { ToastVariant, ToastPosition } from '@/types';

type ToastProps = {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
  position?: ToastPosition;
  darkMode?: boolean;
};

const variantStyles: Record<ToastVariant, { bg: string; icon: React.ReactNode; border: string }> = {
  success: {
    bg: 'bg-success-bg dark:bg-green-900/20',
    icon: <CheckCircle2 className="text-success dark:text-green-400" size={20} />,
    border: 'border-success-border dark:border-green-800'
  },
  error: {
    bg: 'bg-danger-bg dark:bg-red-900/20',
    icon: <AlertCircle className="text-danger dark:text-red-400" size={20} />,
    border: 'border-danger-border dark:border-red-800'
  },
  info: {
    bg: 'bg-info-bg dark:bg-blue-900/20',
    icon: <Info className="text-info dark:text-blue-400" size={20} />,
    border: 'border-info-border dark:border-blue-800'
  },
  warning: {
    bg: 'bg-warning-bg dark:bg-yellow-900/20',
    icon: <AlertTriangle className="text-warning dark:text-yellow-400" size={20} />,
    border: 'border-warning-border dark:border-yellow-800'
  }
};

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  variant = 'info',
  duration = 3000,
  onClose,
  position = 'top-right',
  darkMode = false
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const styles = variantStyles[variant];

  return (
    <div
      className={classNames(
        'flex items-start gap-3 p-4 rounded-lg shadow-lg border max-w-sm animate-slide-in',
        styles.bg,
        styles.border,
        darkMode && 'dark'
      )}
      role="alert"
    >
      <div className="shrink-0">{styles.icon}</div>
      <p className="flex-1 text-sm font-medium text-foreground dark:text-gray-100">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 text-subtle-foreground hover:text-muted-foreground dark:hover:text-gray-300 transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;

