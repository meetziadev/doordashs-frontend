import type { SidebarItem } from './types';
import type { Brand } from '@/types/product';

const buildBrandOptions = (brands: Brand[] = []): SidebarItem[] =>
  brands.map((brand) => ({
    id: `brand-${brand.slug}`,
    value: brand.slug,
    label: brand.name,
    type: 'checkbox'
  }));

export const getSidebarItems = (brands: Brand[] = []): SidebarItem[] => [
  { id: 'home', label: 'Home', type: 'link', href: '/admin' },
  { id: 'orders', label: 'Orders', type: 'link', href: '/admin/orders' },
  {
    id: 'brand',
    label: 'Brand',
    type: 'group',
    href: '/brand',
    defaultOpen: true,
    children: buildBrandOptions(brands)
  },
  { id: 'shop', label: 'Shop', type: 'link', href: '/shop' },
  { id: 'on-sale', label: 'On Sale', type: 'link', href: '/on-sale' },
  { id: 'new-arrival', label: 'New Arrival', type: 'link', href: '/new-arrival' }
];

export const DEFAULT_SIDEBAR_ITEMS: SidebarItem[] = getSidebarItems();
