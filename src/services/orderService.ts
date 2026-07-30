import { splitApi } from '@/redux/api/splitApi';
import { extractApiData } from '@/utils/authUtils';
import type { OrderDetails, OrderListData, OrderTimelineEvent } from '@/types/order';

type OrderListParams = {
  page?: number;
  limit?: number;
};

const extractOrderList = (response: unknown): OrderListData => {
  const data = extractApiData<OrderListData>(response);
  return {
    items: data?.items ?? [],
    meta: data?.meta
  };
};

export const orderService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveOrders: builder.query<OrderListData, OrderListParams | void>({
      query: (params) => ({
        url: 'orders/active',
        params: { page: params?.page ?? 1, limit: params?.limit ?? 10 }
      }),
      transformResponse: extractOrderList,
      providesTags: ['Orders']
    }),
    getOrderHistory: builder.query<OrderListData, OrderListParams | void>({
      query: (params) => ({
        url: 'orders/history',
        params: { page: params?.page ?? 1, limit: params?.limit ?? 10 }
      }),
      transformResponse: extractOrderList,
      providesTags: ['Orders']
    }),
    getOrderDetails: builder.query<OrderDetails, string>({
      query: (orderId) => ({ url: `orders/${orderId}` }),
      transformResponse: (response: unknown) => extractApiData<OrderDetails>(response) as OrderDetails
    }),
    getOrderTracking: builder.query<OrderTimelineEvent[], string>({
      query: (orderId) => ({ url: `orders/${orderId}/tracking` }),
      transformResponse: (response: unknown) => {
        const data = extractApiData<OrderTimelineEvent[]>(response);
        return Array.isArray(data) ? data : [];
      }
    }),
    cancelOrder: builder.mutation<unknown, string>({
      query: (orderId) => ({
        url: `orders/${orderId}/cancel`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Orders']
    })
  }),
  overrideExisting: false
});

export const {
  useGetActiveOrdersQuery,
  useGetOrderHistoryQuery,
  useGetOrderDetailsQuery,
  useGetOrderTrackingQuery,
  useCancelOrderMutation
} = orderService;
