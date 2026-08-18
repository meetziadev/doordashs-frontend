import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/hooks/useAuth';
import { userLogout } from '@/redux/slices/authSlice';
import SidebarNode from '@/components/Sidebar/SidebarNode';
import { getSidebarItems } from '@/components/Sidebar/sidebarData';
import { useSidebarTree } from '@/components/Sidebar/useSidebarTree';
import { flattenSidebarItems } from '@/components/Sidebar/utils';
import { useGetBrandsQuery } from '@services/brandService';
import { useGetProductsQuery } from '@services/productService';
import { extractNavCategories } from '@utils/productUtils';

export type AdminSidebarProps = { isOpen: boolean; onClose: () => void };

const AdminSidebar: React.FC<AdminSidebarProps> = memo(({ isOpen, onClose }) => {
    const { role, user } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: brands = [] } = useGetBrandsQuery();
    const { data: catalogData } = useGetProductsQuery({ page: 1, limit: 100, sort: 'newest' });
    const categories = useMemo(
        () => extractNavCategories(catalogData?.items ?? []),
        [catalogData?.items]
    );
    const sidebarItems = useMemo(() => getSidebarItems(brands, categories), [brands, categories]);
    const { openIds, checkedIds, toggleGroup, toggleCheckbox } = useSidebarTree(sidebarItems);
    const flatItems = useMemo(() => flattenSidebarItems(sidebarItems), [sidebarItems]);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const values = Array.from(checkedIds).map((id) => flatItems.find((item) => item.id === id)?.value ?? id);
        const params = new URLSearchParams();
        if (values.length) params.set('brand', values.join(','));
        navigate({ pathname: '/shop', search: params.toString() });
        // Only re-run when the user actually (un)checks a brand — `flatItems` changes
        // reference whenever brand/category data finishes loading, which would otherwise
        // fire a phantom redirect to /shop after the isFirstRender guard has passed.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedIds]);

    const logout = useCallback(() => {
        dispatch(userLogout());
        navigate('/login');
    }, [dispatch, navigate]);

    return (
        <aside
            style={{ top: 'var(--admin-header-height, 100px)' }}
            className={
                `fixed bottom-0 left-0 w-sidebar bg-white text-sidebar-foreground flex flex-col transition-transform duration-200 md:translate-x-0 z-40 shadow-xl ` +
                (isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0')
            }
        >
            <div className="p-4">
                <h2 className="text-xl font-semibold "></h2>
                <p className="text-xs text-muted-foreground mt-1 "></p>
            </div>
            <nav className="flex-1 overflow-y-auto">
                {sidebarItems.map((item) => (
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
