import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

type User = { name?: string; email?: string; role?: string } | null;
type AuthPayload = { user: User; token: string | null };

const persistConfig = { key: 'auth', version: 1, storage };

const initialState = {
    isLoggedIn: false,
    user: null as User,
    token: null as string | null,
    role: null as string | null
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedIn: (state, action: PayloadAction<AuthPayload>) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.role = action.payload?.user?.role ?? null;
            state.token = action.payload.token ?? null;
        },
        userLogout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.role = null;
            state.token = null;
        },
        updateUserProfile: (state, action: PayloadAction<Partial<NonNullable<User>>>) => {
            state.user = { ...(state.user || {}), ...action.payload } as User;
        }
    }
});

export const { loggedIn, userLogout, updateUserProfile } = slice.actions;
export default persistReducer(persistConfig, slice.reducer);


