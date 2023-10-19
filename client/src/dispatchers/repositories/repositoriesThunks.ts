import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, RepositoriesList, RepositoryFull} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const getUsersRepos = createAsyncThunk<
    RepositoriesList,
    string,
    { rejectValue: GlobalError }
>('repositories/getUsersRepos', async (isPrivate, { rejectWithValue }) => {
    try {

        const {data} = await axiosApi.get<RepositoriesList>(`/repos?isPrivate=${isPrivate}`);
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