import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { classNames } from '@utils/helpers';

type Variant = 'success' | 'error' | 'info' | 'warning';

type Props = {
    children: React.ReactNode;
    variant?: Variant;
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
};

const variantStyles: Record<Variant, { bg: string; icon: React.ReactNode; border: string }> = {
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

const Alert: React.FC<Props> = ({
    children,
    variant = 'info',
    title,
    dismissible = false,
    onDismiss,
    className
}) => {
    const styles = variantStyles[variant];

    return (
        <div
            className={classNames(
                'flex gap-3 p-4 rounded-lg border',
                styles.bg,
                styles.border,
                className
            )}
            role="alert"
        >
            <div className="shrink-0">{styles.icon}</div>
            <div className="flex-1">
                {title && <h4 className="font-semibold text-foreground dark:text-gray-100 mb-1">{title}</h4>}
                <div className="text-sm text-foreground dark:text-gray-200">{children}</div>
            </div>
            {dismissible && onDismiss && (
                <button
                    onClick={onDismiss}
                    className="shrink-0 text-subtle-foreground hover:text-muted-foreground dark:hover:text-gray-300 transition-colors"
                    aria-label="Dismiss"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default Alert;

