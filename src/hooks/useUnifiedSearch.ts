import { useEffect, useMemo, useState } from 'react';
import { useGetBrandsQuery } from '@services/brandService';
import { useGetProductsQuery, useLazySearchProductsQuery } from '@services/productService';
import { extractCategoriesFromProducts, mapApiProductsToCards } from '@utils/productUtils';
import {
  filterBrands,
  filterCategories,
  type SearchResult
} from '@utils/searchUtils';

export const useUnifiedSearch = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { data: brands = [] } = useGetBrandsQuery();
  const { data: catalogData } = useGetProductsQuery({ page: 1, limit: 100, sort: 'newest' });
  const [searchProducts, { data: productSearchData, isFetching: isSearchingProducts }] =
    useLazySearchProductsQuery();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 350);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) return;
    searchProducts({ q: debouncedQuery, page: 1, limit: 8 });
  }, [debouncedQuery, searchProducts]);

  const results = useMemo(() => {
    if (!debouncedQuery) {
      return { products: [] as SearchResult[], brands: [] as SearchResult[], categories: [] as SearchResult[] };
    }

    const catalogCategories = extractCategoriesFromProducts(catalogData?.items ?? []);
    const searchCategories = extractCategoriesFromProducts(productSearchData?.items ?? []);
    const allCategories = [...catalogCategories, ...searchCategories].filter(
      (category, index, list) => list.findIndex((item) => item.slug === category.slug) === index
    );

    const products: SearchResult[] = mapApiProductsToCards(productSearchData?.items ?? []).map(
      (product) => ({
        type: 'product' as const,
        id: product.id,
        slug: product.slug,
        label: product.name,
        subtitle: product.category || 'Product',
        image: product.image
      })
    );

    return {
      products,
      brands: filterBrands(brands, debouncedQuery),
      categories: filterCategories(allCategories, debouncedQuery)
    };
  }, [brands, catalogData?.items, debouncedQuery, productSearchData?.items]);

  const hasResults =
    results.products.length > 0 || results.brands.length > 0 || results.categories.length > 0;

  const isSearching = Boolean(debouncedQuery) && isSearchingProducts;

  return {
    debouncedQuery,
    results,
    hasResults,
    isSearching
  };
};
