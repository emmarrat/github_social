import {createSlice} from '@reduxjs/toolkit';
import {GlobalError, User, UserShort} from '../../types';
import {RootState} from '../../app/store';
import {findThirdUser, loginWithGithub} from "./usersThunks.ts";

interface UsersState {
    user: User | null;
    globalUsers: UserShort[];
    loading: boolean;
    authError: GlobalError | null;
}

const initialState: UsersState = {
    user: null,
    globalUsers: [],
    loading: false,
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
            state.loading = true;
        });
        builder.addCase(loginWithGithub.fulfilled, (state, { payload: user }) => {
            state.loading = false;
            state.user = user;
        });
        builder.addCase(loginWithGithub.rejected, (state, { payload: error }) => {
            state.loading = false;
            state.authError = error || null;
        });
        builder.addCase(findThirdUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(findThirdUser.fulfilled, (state, { payload: users }) => {
            state.loading = false;
            state.globalUsers = users;
        });
        builder.addCase(findThirdUser.rejected, (state, { payload: error }) => {
            state.loading = false;
            state.authError = error || null;

        });
    },
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectGlobalUsers = (state: RootState) => state.users.globalUsers;
export const selectAuthLoading = (state: RootState) =>
    state.users.loading;