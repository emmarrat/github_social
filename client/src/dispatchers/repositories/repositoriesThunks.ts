import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, RepositoriesList, RepositoryFull } from '../../types';
import axiosApi from '../../utils/axiosApi.ts';
import { isAxiosError } from 'axios';

export const getUsersRepos = createAsyncThunk<
  RepositoriesList,
  { isPrivate: string; thirdUser?: string },
  { rejectValue: GlobalError }
>('repositories/getUsersRepos', async (reqData, { rejectWithValue }) => {
  try {
    console.log('works in thunk', reqData.thirdUser);
    const { data } = await axiosApi.get<RepositoriesList>(
      `/repos/${reqData.isPrivate}${
        reqData.thirdUser ? `?user=${reqData.thirdUser}` : ''
      }`,
    );
    return data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const getOneRepo = createAsyncThunk<
  RepositoryFull,
  string,
  { rejectValue: GlobalError }
>('repositories/getOneRepo', async (repoName, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.get<RepositoryFull>(`/repos/${repoName}`);
    return data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
