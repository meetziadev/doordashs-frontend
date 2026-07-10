import type { ReactNode } from 'react';

export type SidebarItemType = 'link' | 'group' | 'checkbox';
export type SidebarVariant = 'light' | 'dark';

export interface SidebarItem {
  id: string;
  label: string;
  type?: SidebarItemType;
  href?: string;
  icon?: ReactNode;
  /** Slug used when reporting checkbox selections (e.g. for query params). Falls back to `id`. */
  value?: string;
  emphasis?: 'normal' | 'semibold';
  defaultOpen?: boolean;
  defaultChecked?: boolean;
  children?: SidebarItem[];
}

export const resolveSidebarItemType = (item: SidebarItem): SidebarItemType =>
  item.type ?? (item.children && item.children.length > 0 ? 'group' : 'link');
