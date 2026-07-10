import { splitApi } from '@/redux/api/splitApi';

export const userService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query<any, Record<string, any> | void>({
      query: (params) => ({
        url: 'user/get',
        method: 'GET',
        params
      })
    })
  }),
  overrideExisting: false
});

export const { useFetchUsersQuery, useLazyFetchUsersQuery } = userService;

