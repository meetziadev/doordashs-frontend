import type { Brand, ProductCategory } from '@/types/product';

export type SearchResultType = 'product' | 'brand' | 'category';

export type SearchResult = {
  type: SearchResultType;
  id: string;
  label: string;
  subtitle?: string;
  image?: string;
  slug: string;
};

export const matchesSearchQuery = (value: string | undefined | null, query: string): boolean => {
  if (!value) return false;
  return value.toLowerCase().includes(query.trim().toLowerCase());
};

export const filterBrands = (brands: Brand[], query: string): SearchResult[] =>
  brands
    .filter(
      (brand) =>
        matchesSearchQuery(brand.name, query) ||
        matchesSearchQuery(brand.slug, query) ||
        matchesSearchQuery(brand.description ?? '', query)
    )
    .slice(0, 5)
    .map((brand) => ({
      type: 'brand' as const,
      id: brand.id,
      slug: brand.slug,
      label: brand.name,
      subtitle: 'Brand',
      image: brand.logo_url ?? undefined
    }));

export const filterCategories = (
  categories: Array<ProductCategory & { image?: string }>,
  query: string
): SearchResult[] =>
  categories
    .filter(
      (category) =>
        matchesSearchQuery(category.name, query) || matchesSearchQuery(category.slug, query)
    )
    .slice(0, 5)
    .map((category) => ({
      type: 'category' as const,
      id: category.slug,
      slug: category.slug,
      label: category.name,
      subtitle: 'Category',
      image: category.image
    }));

export const getSearchResultPath = (result: SearchResult): string => {
  switch (result.type) {
    case 'product':
      return `/admin/product/${result.slug}`;
    case 'brand':
      return `/admin/brand/${result.slug}`;
    case 'category':
      return `/admin/category/${result.slug}`;
    default:
      return '/admin';
  }
};
