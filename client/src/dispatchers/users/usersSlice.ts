import {createSlice} from '@reduxjs/toolkit';
import {GlobalError, User} from '../../types';
import {RootState} from '../../app/store';
import {loginWithGithub} from "./usersThunks.ts";

interface UsersState {
    user: User | null;
    authLoading: boolean;
    authError: GlobalError | null;
}

const initialState: UsersState = {
    user: null,
    authLoading: false,
    authError: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginWithGithub.pending, (state) => {
            state.authError = null;
            state.authLoading = true;
        });
        builder.addCase(loginWithGithub.fulfilled, (state, { payload: user }) => {
            state.authLoading = false;
            state.user = user;
        });
        builder.addCase(loginWithGithub.rejected, (state, { payload: error }) => {
            state.authLoading = false;
            state.authError = error || null;
        });
    },
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectAuthLoading = (state: RootState) =>
    state.users.authLoading;