import { splitApi } from '@/redux/api/splitApi';
import { extractApiData } from '@/utils/authUtils';
import type { ChangePasswordDto, UpdateProfileDto, UserProfile } from '@/types/profile';

type SendVerificationDto = {
  identifier?: string;
  session_token?: string;
};

type VerifyCodeDto = {
  session_token: string;
  code: string;
};

type RegisterDto = {
  session_token: string;
  full_name: string;
  password: string;
};

type LoginDto = {
  identifier: string;
  password: string;
};

export const authService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    sendVerification: builder.mutation<unknown, SendVerificationDto>({
      query: (body) => ({
        url: 'auth/verification/send',
        method: 'POST',
        body
      })
    }),
    verifyCode: builder.mutation<unknown, VerifyCodeDto>({
      query: (body) => ({
        url: 'auth/verification/verify',
        method: 'POST',
        body
      })
    }),
    register: builder.mutation<unknown, RegisterDto>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body
      })
    }),
    login: builder.mutation<unknown, LoginDto>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => ({ url: 'auth/me' }),
      transformResponse: (response: unknown) => extractApiData<UserProfile>(response) as UserProfile
    }),
    updateProfile: builder.mutation<UserProfile, UpdateProfileDto>({
      query: (body) => ({
        url: 'auth/me',
        method: 'PATCH',
        body
      }),
      transformResponse: (response: unknown) => extractApiData<UserProfile>(response) as UserProfile
    }),
    changePassword: builder.mutation<unknown, ChangePasswordDto>({
      query: (body) => ({
        url: 'auth/change-password',
        method: 'POST',
        body
      })
    }),
    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      })
    })
  }),
  overrideExisting: false
});

export const {
  useSendVerificationMutation,
  useVerifyCodeMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useLogoutMutation
} = authService;
