import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';
import { userLogout } from '../slices/authSlice';
import { clearAccessTokenCookie } from '@/utils/cookieUtils';

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error && (result as any).error.status === 401) {
        clearAccessTokenCookie();
        api.dispatch(userLogout());
    }
    return result;
};

export const splitApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth as any,
    endpoints: () => ({}),
    tagTypes: []
});


