import type { SidebarItem } from './types';
import type { Brand, ProductCategory } from '@/types/product';

const buildBrandOptions = (brands: Brand[] = []): SidebarItem[] =>
  brands.map((brand) => ({
    id: `brand-${brand.slug}`,
    value: brand.slug,
    label: brand.name,
    type: 'checkbox'
  }));

const buildCategoryOptions = (categories: ProductCategory[] = []): SidebarItem[] =>
  categories.map((category) => ({
    id: `category-${category.slug}`,
    label: category.name,
    type: 'link',
    href: `/category/${category.slug}`
  }));

export const getSidebarItems = (
  brands: Brand[] = [],
  categories: ProductCategory[] = []
): SidebarItem[] => [
  { id: 'home', label: 'Home', type: 'link', href: '/admin' },
  { id: 'orders', label: 'Orders', type: 'link', href: '/admin/orders' },
  {
    id: 'categories',
    label: 'Categories',
    type: 'group',
    defaultOpen: true,
    children: buildCategoryOptions(categories)
  },
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
  { id: 'new-arrival', label: 'New Arrival', type: 'link', href: '/new-arrival' },
  { id: 'wishlist', label: 'Wishlist', type: 'link', href: '/wishlist' }
];

export const DEFAULT_SIDEBAR_ITEMS: SidebarItem[] = getSidebarItems();
