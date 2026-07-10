import { useCallback, useMemo, useState } from 'react';
import type { SidebarItem } from './types';

const collectIds = (items: SidebarItem[], predicate: (item: SidebarItem) => boolean): string[] =>
  items.flatMap((item) => [
    ...(predicate(item) ? [item.id] : []),
    ...(item.children ? collectIds(item.children, predicate) : [])
  ]);

const toggleInSet = (set: Set<string>, id: string): Set<string> => {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
};

export const useSidebarTree = (items: SidebarItem[]) => {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(collectIds(items, (i) => !!i.defaultOpen)));
  const [checkedIds, setCheckedIds] = useState<Set<string>>(
    () => new Set(collectIds(items, (i) => !!i.defaultChecked))
  );

  const toggleGroup = useCallback((id: string) => {
    setOpenIds((prev) => toggleInSet(prev, id));
  }, []);

  const toggleCheckbox = useCallback((id: string) => {
    setCheckedIds((prev) => toggleInSet(prev, id));
  }, []);

  return useMemo(
    () => ({ openIds, checkedIds, toggleGroup, toggleCheckbox }),
    [openIds, checkedIds, toggleGroup, toggleCheckbox]
  );
};
