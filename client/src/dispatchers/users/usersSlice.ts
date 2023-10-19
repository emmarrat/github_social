import {createSlice} from '@reduxjs/toolkit';
import {GlobalError, User, UserShort} from '../../types';
import {RootState} from '../../app/store';
import {findThirdUser, loginWithGithub} from "./usersThunks.ts";

interface UsersState {
    user: User | null;
    globalUsers: UserShort[];
    globalUserPage: number;
    globalTotal: number;
    globalTotalPageAvailable: number
    loading: boolean;
    authError: GlobalError | null;
}

const initialState: UsersState = {
    user: null,
    globalUsers: [],
    globalUserPage: 1,
    globalTotal: 0,
    globalTotalPageAvailable: 5,
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
        clearGlobalUsers: (state) => {
            state.globalUsers = [];
        },
        pageUp: (state) => {
            if (state.globalUserPage < 5) {
                state.globalUserPage += 1;
            }
        },
        pageDown: (state) => {
            if (state.globalUserPage > 0) {
                state.globalUserPage -= 1;
            }
        },
        pageOne: (state) => {
            state.globalUserPage = 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginWithGithub.pending, (state) => {
            state.authError = null;
            state.loading = true;
        });
        builder.addCase(loginWithGithub.fulfilled, (state, {payload: user}) => {
            state.loading = false;
            state.user = user;
        });
        builder.addCase(loginWithGithub.rejected, (state, {payload: error}) => {
            state.loading = false;
            state.authError = error || null;
        });
        builder.addCase(findThirdUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(findThirdUser.fulfilled, (state, {payload: users}) => {
            state.loading = false;
            state.globalUsers = users.items;
            const divisor = 5;
            const totalAvailablePages = Math.floor(users.total_count
                / divisor);
            state.globalTotal = users.total_count;
            state.globalTotalPageAvailable = totalAvailablePages > 5 ? 5: totalAvailablePages;
        });
        builder.addCase(findThirdUser.rejected, (state, {payload: error}) => {
            state.loading = false;
            state.authError = error || null;

        });
    },
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser, clearGlobalUsers, pageUp, pageOne, pageDown} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectGlobalUsers = (state: RootState) => state.users.globalUsers;
export const selectGlobalUserPage = (state: RootState) => state.users.globalUserPage;
export const selectGlobalTotal = (state: RootState) => state.users.globalTotal;
export const selectGlobalTotalPage = (state:RootState) => state.users.globalTotalPageAvailable;
export const selectAuthLoading = (state: RootState) =>
    state.users.loading;