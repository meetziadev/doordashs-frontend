import { splitApi } from '@/redux/api/splitApi';
import { extractApiData } from '@/utils/authUtils';
import type { ApiProduct, Brand, ProductListData } from '@/types/product';

const extractProductList = (response: unknown): ProductListData => {
  const data = extractApiData<ProductListData | ApiProduct[]>(response);

  if (Array.isArray(data)) {
    return { items: data };
  }

  if (data?.items) {
    return data;
  }

  return { items: [] };
};

export const brandService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => ({ url: 'brands' }),
      transformResponse: (response: unknown) => {
        const data = extractApiData<Brand[]>(response);
        return Array.isArray(data) ? data : [];
      }
    }),
    getBrandProducts: builder.query<
      ProductListData & { brand?: Brand },
      { slug: string; page?: number; limit?: number }
    >({
      query: ({ slug, page = 1, limit = 20 }) => ({
        url: `brands/${slug}/products`,
        params: { page, limit }
      }),
      transformResponse: (response: unknown) => {
        const data = extractApiData<ProductListData & { brand?: Brand }>(response);
        return {
          brand: data?.brand,
          items: data?.items ?? []
        };
      }
    })
  }),
  overrideExisting: false
});

export const { useGetBrandsQuery, useGetBrandProductsQuery } = brandService;
