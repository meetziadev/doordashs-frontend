export const APP_NAME = 'Frontend Boilerplate';
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  admin: '/admin',
  unauth: '/unauth'
} as const;

export const HEADER_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' }
] as const;

export const HEADER_REGIONS = [
  { code: 'pk', label: 'Pakistan', flag: '🇵🇰' }
] as const;

// FUTURE: Move promo banners to a CMS/settings API when available.
export const HEADER_PROMO_BANNERS = [
  '100% Genuine Products',
  'Fast Delivery',
  'Get 20% Off Your First Order'
] as const;

export const HEADER_AUDIENCE_OPTIONS = [
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'children', label: 'Children' }
] as const;

export type HeaderAudienceId = (typeof HEADER_AUDIENCE_OPTIONS)[number]['id'];

export const HEADER_NAV_LINKS = [
  { id: 'home', label: 'the home', to: '/admin', end: true },
  { id: 'premium', label: 'Premium', to: '/new-arrival' },
  { id: 'children', label: 'children', to: '/shop?category=children' },
  { id: 'outlet', label: 'Outlet', to: '/on-sale' },
  { id: 'beauty', label: 'Beauty Corner', to: '/shop?category=beauty' },
  { id: 'sports', label: 'Sports', to: '/shop?category=sports' },
  { id: 'fashion', label: 'fashion', to: '/shop' }
] as const;

