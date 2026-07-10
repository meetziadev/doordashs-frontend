import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Profile = Record<string, unknown> | null;

const initialState: { profile: Profile } = { profile: null };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload;
        }
    }
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;


