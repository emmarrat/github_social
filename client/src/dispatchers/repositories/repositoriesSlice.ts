import {GlobalError, RepositoriesList} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {getUsersRepos} from "./repositoriesThunks.ts";

interface RepositoriesState {
    repos: RepositoriesList | null;
    loading: boolean;
    error: GlobalError | null;
}

const initialState: RepositoriesState = {
    repos: null,
    loading: false,
    error: null
};


export const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsersRepos.pending, (state) => {
            state.error = null;
            state.loading = true;
        });
        builder.addCase(getUsersRepos.fulfilled, (state, { payload: repos }) => {
            state.loading = false;
            state.repos = repos;
        });
        builder.addCase(getUsersRepos.rejected, (state, { payload: error }) => {
            state.loading = false;
            state.error = error || null;
        });
    },
});
export const repositoriesReducer = repositoriesSlice.reducer;

export const selectRepos = (state: RootState) => state.repositories.repos;
export const selectReposLoading = (state:RootState) => state.repositories.loading;
export const selectReposError = (state: RootState) => state.repositories.error;

