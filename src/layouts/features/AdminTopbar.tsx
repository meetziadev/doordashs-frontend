import React, { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, ShoppingCart } from '@assets/icons';
import { classNames } from '@utils/helpers';

export type AdminTopbarProps = { onMenu: () => void };

type FulfillmentMode = 'delivery' | 'pickup';

const AdminTopbar: React.FC<AdminTopbarProps> = memo(({ onMenu }) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<FulfillmentMode>('delivery');

    const pillClass = useCallback(
        (active: boolean) =>
            classNames(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                active
                    ? 'border-foreground bg-foreground text-inverse-foreground'
                    : 'border-border-strong text-muted-foreground hover:border-foreground/40'
            ),
        []
    );

    return (
        <div className="fixed top-0 left-0 md:left-sidebar right-0 h-topbar bg-topbar text-topbar-foreground flex items-center gap-4 px-4 md:px-6 z-30">
            <button className="shrink-0 text-muted-foreground md:hidden" onClick={onMenu} aria-label="Open sidebar">
                <Menu size={20} />
            </button>

            <div className="relative w-full">
                <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle-foreground" />
                <input
                    type="search"
                    placeholder="Search for products..."
                    className="w-full rounded-full bg-surface-muted py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-subtle-foreground focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-3">
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setMode('delivery')} className={pillClass(mode === 'delivery')}>
                        Delivery
                    </button>
                    <button type="button" onClick={() => setMode('pickup')} className={pillClass(mode === 'pickup')}>
                        Pickup
                    </button>
                </div>
                <button type="button" className="text-muted-foreground hover:text-foreground" aria-label="Notifications">
                    <Bell size={20} />
                </button>
                 <button 
                    type="button" 
                    className="text-foreground hover:text-muted-foreground cursor-pointer" 
                    aria-label="Cart"
                    onClick={() => navigate('/admin/cart')}
                >
                    <ShoppingCart size={20} />
                </button>
            </div>
        </div>
    );
});

export default AdminTopbar;
