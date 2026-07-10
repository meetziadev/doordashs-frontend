import type { SidebarItem } from './types';

const BRAND_OPTIONS: SidebarItem[] = [
  { id: 'brand-nike', value: 'nike', label: 'Nike', type: 'checkbox' },
  { id: 'brand-rebook', value: 'rebook', label: 'Rebook', type: 'checkbox' },
  { id: 'brand-zara', value: 'zara', label: 'Zara', type: 'checkbox', defaultChecked: true },
  { id: 'brand-gearo', value: 'gearo', label: 'Gearo', type: 'checkbox' },
  { id: 'brand-indi', value: 'indi', label: 'Indi', type: 'checkbox' },
  { id: 'brand-j', value: 'j', label: 'J.', type: 'checkbox' },
  { id: 'brand-sapphire', value: 'sapphire', label: 'Sapphire', type: 'checkbox' },
  { id: 'brand-beast', value: 'beast', label: 'Beast', type: 'checkbox' }
];

export const DEFAULT_SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'home', label: 'Home', type: 'link', href: '/admin' },
  { id: 'brand', label: 'Brand', type: 'group', href: '/brand', defaultOpen: true, children: BRAND_OPTIONS },
  { id: 'shop', label: 'Shop', type: 'link', href: '/shop' },
  { id: 'on-sale', label: 'On Sale', type: 'link', href: '/on-sale' },
  { id: 'new-arrival', label: 'New Arrival', type: 'link', href: '/new-arrival' }
];
