import React, { memo, useCallback, useState } from 'react';
import { Bell, Menu, Search, ShoppingCart } from '@assets/icons';
import { classNames } from '@utils/helpers';

export type AdminTopbarProps = { onMenu: () => void };

type FulfillmentMode = 'delivery' | 'pickup';

const AdminTopbar: React.FC<AdminTopbarProps> = memo(({ onMenu }) => {
    const [mode, setMode] = useState<FulfillmentMode>('delivery');

    const pillClass = useCallback(
        (active: boolean) =>
            classNames(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                active ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'
            ),
        []
    );

    return (
        <div className="fixed top-0 left-0 md:left-sidebar right-0 h-topbar bg-topbar border-b flex items-center gap-4 px-4 md:px-6 z-30">
            <button className="shrink-0 text-gray-600 md:hidden" onClick={onMenu} aria-label="Open sidebar">
                <Menu size={20} />
            </button>

            <div className="relative w-full max-w-md">
                <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="search"
                    placeholder="Search for products..."
                    className="w-full rounded-full bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
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
                <button type="button" className="text-gray-700 hover:text-gray-900" aria-label="Notifications">
                    <Bell size={20} />
                </button>
                <button type="button" className="text-gray-900 hover:text-gray-700" aria-label="Cart">
                    <ShoppingCart size={20} />
                </button>
            </div>
        </div>
    );
});

export default AdminTopbar;
