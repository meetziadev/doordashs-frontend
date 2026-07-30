import { splitApi } from '@/redux/api/splitApi';
import { extractApiData } from '@/utils/authUtils';
import type { CartData, CheckoutDto, CheckoutResult } from '@/types/cart';

type AddCartItemDto = {
  productId: string;
  variantId: string;
  quantity: number;
};

type UpdateCartItemDto = {
  quantity: number;
};

export const cartService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartData, void>({
      query: () => ({ url: 'cart' }),
      transformResponse: (response: unknown) => extractApiData<CartData>(response) as CartData,
      providesTags: ['Cart']
    }),
    addCartItem: builder.mutation<CartData, AddCartItemDto>({
      query: (body) => ({
        url: 'cart/items',
        method: 'POST',
        body
      }),
      transformResponse: (response: unknown) => extractApiData<CartData>(response) as CartData,
      invalidatesTags: ['Cart']
    }),
    updateCartItem: builder.mutation<CartData, { id: string; body: UpdateCartItemDto }>({
      query: ({ id, body }) => ({
        url: `cart/items/${id}`,
        method: 'PATCH',
        body
      }),
      transformResponse: (response: unknown) => extractApiData<CartData>(response) as CartData,
      invalidatesTags: ['Cart']
    }),
    removeCartItem: builder.mutation<CartData, string>({
      query: (id) => ({
        url: `cart/items/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: unknown) => extractApiData<CartData>(response) as CartData,
      invalidatesTags: ['Cart']
    }),
    clearCart: builder.mutation<unknown, void>({
      query: () => ({
        url: 'cart',
        method: 'DELETE'
      }),
      invalidatesTags: ['Cart']
    }),
    checkout: builder.mutation<CheckoutResult, CheckoutDto>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      }),
      transformResponse: (response: unknown) => extractApiData<CheckoutResult>(response) as CheckoutResult,
      invalidatesTags: ['Cart']
    })
  }),
  overrideExisting: false
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useCheckoutMutation
} = cartService;
