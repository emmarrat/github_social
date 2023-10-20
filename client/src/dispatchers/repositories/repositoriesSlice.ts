import { GlobalError, RepositoriesList, RepositoryFull } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { getOneRepo, getUsersRepos } from './repositoriesThunks.ts';

interface RepositoriesState {
  repos: RepositoriesList | null;
  oneRepo: RepositoryFull | null;
  loading: boolean;
  error: GlobalError | null;
}

const initialState: RepositoriesState = {
  repos: null,
  oneRepo: null,
  loading: false,
  error: null,
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
    builder.addCase(getOneRepo.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(getOneRepo.fulfilled, (state, { payload: repo }) => {
      state.loading = false;
      state.oneRepo = repo;
    });
    builder.addCase(getOneRepo.rejected, (state, { payload: error }) => {
      state.loading = false;
      state.error = error || null;
    });
  },
});
export const repositoriesReducer = repositoriesSlice.reducer;

export const selectRepos = (state: RootState) => state.repositories.repos;
export const selectOneRepo = (state: RootState) => state.repositories.oneRepo;
export const selectReposLoading = (state: RootState) =>
  state.repositories.loading;
export const selectReposError = (state: RootState) => state.repositories.error;
