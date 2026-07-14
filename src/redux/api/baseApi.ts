import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { getAccessTokenFromCookie } from '@/utils/cookieUtils';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/';

export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = getAccessTokenFromCookie() || (state.auth as any)?.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
            headers.set('accept', 'application/json');
        } else {
            headers.set('authorization', '');
        }
        return headers;
    }
});


