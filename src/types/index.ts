// Global/shared types

// Auth / User
export type User = {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    [key: string]: unknown;
} | null;

export type AuthState = {
    isLoggedIn: boolean;
    token: string | null;
    user: User;
    role: string | null;
};

// Toasts
export type ToastVariant = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';

export type ToastItem = {
    id: string;
    message: string;
    variant?: ToastVariant;
    duration?: number;
};

// Select
export type SelectOption = { label: string; value: string };

// Table
export type TableColumn<T = any> = {
    name: string;
    selector: (row: T) => any;
    sortable?: boolean;
    cell?: (row: T) => React.ReactNode;
    width?: string;
    minWidth?: string;
};


