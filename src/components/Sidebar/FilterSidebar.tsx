import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { classNames } from '@utils/helpers';
import SidebarNode from './SidebarNode';
import { DEFAULT_SIDEBAR_ITEMS } from './sidebarData';
import type { SidebarItem, SidebarVariant } from './types';
import { useSidebarTree } from './useSidebarTree';
import { flattenSidebarItems } from './utils';

export type FilterSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  items?: SidebarItem[];
  variant?: SidebarVariant;
  onLinkSelect?: (item: SidebarItem) => void;
  /** Fires with the resolved `value` (or `id`) of every checked item whenever the selection changes. Not called on initial mount. */
  onCheckedChange?: (values: string[]) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = memo(
  ({ isOpen, onClose, items = DEFAULT_SIDEBAR_ITEMS, variant = 'light', onLinkSelect, onCheckedChange }) => {
    const { openIds, checkedIds, toggleGroup, toggleCheckbox } = useSidebarTree(items);
    const flatItems = useMemo(() => flattenSidebarItems(items), [items]);
    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      const values = Array.from(checkedIds).map((id) => flatItems.find((i) => i.id === id)?.value ?? id);
      onCheckedChange?.(values);
    }, [checkedIds, flatItems, onCheckedChange]);

    const handleLinkSelect = useCallback(
      (item: SidebarItem) => {
        onLinkSelect?.(item);
        onClose();
      },
      [onLinkSelect, onClose]
    );

    return (
      <div
        className={classNames(
          'fixed inset-0 z-50 transition-opacity duration-200',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden={!isOpen}
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <aside
          className={classNames(
            'absolute inset-y-0 left-0 flex w-[78%] max-w-xs flex-col overflow-y-auto rounded-r-2xl bg-white shadow-xl transition-transform duration-300',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {items.map((item) => (
            <SidebarNode
              key={item.id}
              item={item}
              level={0}
              variant={variant}
              openIds={openIds}
              checkedIds={checkedIds}
              onToggleGroup={toggleGroup}
              onToggleCheckbox={toggleCheckbox}
              onLinkSelect={handleLinkSelect}
            />
          ))}
        </aside>
      </div>
    );
  }
);

FilterSidebar.displayName = 'FilterSidebar';

export default FilterSidebar;
