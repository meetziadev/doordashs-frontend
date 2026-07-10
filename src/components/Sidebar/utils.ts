import type { SidebarItem } from './types';

export const flattenSidebarItems = (items: SidebarItem[]): SidebarItem[] =>
  items.flatMap((item) => [item, ...(item.children ? flattenSidebarItems(item.children) : [])]);
