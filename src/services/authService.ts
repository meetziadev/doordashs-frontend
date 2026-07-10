import { splitApi } from '@/redux/api/splitApi';

type Credentials = { email: string; password: string };
type RegisterDto = { name: string; email: string; password: string };

export const authService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, Credentials>({
      query: (credentials) => ({ url: 'auth/signin', method: 'POST', body: credentials })
    }),
    register: builder.mutation<any, RegisterDto>({
      query: (data) => ({ url: 'auth/signup', method: 'POST', body: data })
    }),
    getProfile: builder.query<any, void>({
      query: () => ({ url: 'auth/me' })
    })
  }),
  overrideExisting: false
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } = authService;

