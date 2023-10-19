import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, RepositoriesList} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const getUsersRepos = createAsyncThunk<
    RepositoriesList,
    string,
    { rejectValue: GlobalError }
>('repositories/getUsersRepos', async (isPrivate, { rejectWithValue }) => {
    try {

        const response = await axiosApi.get(`/repos?isPrivate=${isPrivate}`);
        return response.data;
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data as GlobalError);
        }
        throw e;
    }
});