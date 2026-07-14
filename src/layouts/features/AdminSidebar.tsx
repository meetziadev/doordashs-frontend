import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { userLogout } from '@/redux/slices/authSlice';
import SidebarNode from '@/components/Sidebar/SidebarNode';
import { DEFAULT_SIDEBAR_ITEMS } from '@/components/Sidebar/sidebarData';
import { useSidebarTree } from '@/components/Sidebar/useSidebarTree';

export type AdminSidebarProps = { isOpen: boolean; onClose: () => void };

const AdminSidebar: React.FC<AdminSidebarProps> = memo(({ isOpen, onClose }) => {
    const { role, user } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { openIds, checkedIds, toggleGroup, toggleCheckbox } = useSidebarTree(DEFAULT_SIDEBAR_ITEMS);

    const logout = useCallback(() => {
        dispatch(userLogout());
        navigate('/login');
    }, [dispatch, navigate]);

    return (
        <aside
            className={
                `fixed inset-y-0 left-0 w-sidebar bg-white text-sidebar-foreground flex flex-col transition-transform duration-200 md:translate-x-0 z-40 shadow-xl ` +
                (isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0')
            }
        >
            <div className="p-4">
                <h2 className="text-xl font-semibold "></h2>
                <p className="text-xs text-muted-foreground mt-1 "></p>
            </div>
            <nav className="flex-1 overflow-y-auto">
                {DEFAULT_SIDEBAR_ITEMS.map((item) => (
                    <SidebarNode
                        key={item.id}
                        item={item}
                        level={0}
                        variant="light"
                        openIds={openIds}
                        checkedIds={checkedIds}
                        onToggleGroup={toggleGroup}
                        onToggleCheckbox={toggleCheckbox}
                        onLinkSelect={onClose}
                    />
                ))}
            </nav>

        </aside>
    );
});

export default AdminSidebar;
