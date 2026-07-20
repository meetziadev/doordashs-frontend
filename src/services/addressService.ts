import { splitApi } from '@/redux/api/splitApi';
import { extractApiData } from '@/utils/authUtils';
import type { Address, AddressDto } from '@/types/profile';

type ApiListResponse = { data?: Address[] };

export const addressService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAddresses: builder.query<Address[], void>({
      query: () => ({ url: 'addresses' }),
      transformResponse: (response: unknown) => {
        const data = extractApiData<Address[]>(response);
        return Array.isArray(data) ? data : [];
      },
      providesTags: ['Addresses']
    }),
    createAddress: builder.mutation<Address, AddressDto>({
      query: (body) => ({
        url: 'addresses',
        method: 'POST',
        body
      }),
      transformResponse: (response: unknown) => extractApiData<Address>(response) as Address,
      invalidatesTags: ['Addresses']
    }),
    updateAddress: builder.mutation<Address, { id: string; body: AddressDto }>({
      query: ({ id, body }) => ({
        url: `addresses/${id}`,
        method: 'PATCH',
        body
      }),
      transformResponse: (response: unknown) => extractApiData<Address>(response) as Address,
      invalidatesTags: ['Addresses']
    })
  }),
  overrideExisting: false
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation
} = addressService;
