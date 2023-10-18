import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../types';
import {RootState} from '../../app/store';

interface UsersState {
    user: User | null;
    authLoading: boolean;
}

const initialState: UsersState = {
    user: null,
    authLoading: false
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        unsetUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: {},
});

export const usersReducer = usersSlice.reducer;
export const {unsetUser} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectAuthLoading = (state: RootState) =>
    state.users.authLoading;