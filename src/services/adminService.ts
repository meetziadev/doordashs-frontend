import { splitApi } from '@/redux/api/splitApi';

export const adminService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<any, void>({
      query: () => ({ url: 'packing-list/summary' })
    })
  }),
  overrideExisting: false
});

export const { useGetDashboardStatsQuery, useLazyGetDashboardStatsQuery } = adminService;

