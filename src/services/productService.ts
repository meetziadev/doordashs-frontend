import { splitApi } from '@/redux/api/splitApi';
import { extractApiData } from '@/utils/authUtils';
import type {
  ApiProduct,
  ProductListData,
  ProductListParams,
  ProductSearchParams
} from '@/types/product';

const extractProductList = (response: unknown): ProductListData => {
  const data = extractApiData<
    | ProductListData
    | ApiProduct[]
    | {
        items?: ApiProduct[];
        meta?: { page?: number; limit?: number; total?: number; totalPages?: number };
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
      }
  >(response);

  if (Array.isArray(data)) {
    return { items: data };
  }

  if (data?.items) {
    return {
      items: data.items,
      page: data.page ?? data.meta?.page,
      limit: data.limit ?? data.meta?.limit,
      total: data.total ?? data.meta?.total,
      totalPages: data.totalPages ?? data.meta?.totalPages
    };
  }

  return { items: [] };
};

export const productService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductListData, ProductListParams | void>({
      query: (params) => ({
        url: 'products',
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20,
          sort: params?.sort ?? 'newest',
          ...(params?.brand ? { brand: params.brand } : {})
        }
      }),
      transformResponse: extractProductList
    }),
    getTrendingProducts: builder.query<ProductListData, ProductListParams | void>({
      query: (params) => ({
        url: 'products/trending',
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20
        }
      }),
      transformResponse: extractProductList
    }),
    getFeaturedProducts: builder.query<ProductListData, ProductListParams | void>({
      query: (params) => ({
        url: 'products/featured',
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20
        }
      }),
      transformResponse: extractProductList
    }),
    searchProducts: builder.query<ProductListData, ProductSearchParams>({
      query: ({ q, page = 1, limit = 20 }) => ({
        url: 'products/search',
        params: { q, page, limit }
      }),
      transformResponse: extractProductList
    }),
    getProductsByCategory: builder.query<
      ProductListData,
      { slug: string } & ProductListParams
    >({
      query: ({ slug, page = 1, limit = 20 }) => ({
        url: `products/category/${slug}`,
        params: { page, limit }
      }),
      transformResponse: extractProductList
    }),
    getOnSaleProducts: builder.query<ProductListData, ProductListParams | void>({
      query: (params) => ({
        url: 'products/on-sale',
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 12
        }
      }),
      transformResponse: extractProductList
    }),
    getNewArrivalsProducts: builder.query<ProductListData, ProductListParams | void>({
      query: (params) => ({
        url: 'products/new-arrivals',
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 12
        }
      }),
      transformResponse: extractProductList
    }),
    getProductBySlug: builder.query<ApiProduct, string>({
      query: (slug) => ({ url: `products/${slug}` }),
      transformResponse: (response: unknown) => extractApiData<ApiProduct>(response) as ApiProduct
    })
  }),
  overrideExisting: false
});

export const {
  useGetProductsQuery,
  useGetTrendingProductsQuery,
  useGetFeaturedProductsQuery,
  useLazySearchProductsQuery,
  useGetProductsByCategoryQuery,
  useGetOnSaleProductsQuery,
  useGetNewArrivalsProductsQuery,
  useGetProductBySlugQuery
} = productService;
