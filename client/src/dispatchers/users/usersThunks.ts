import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, User, UserGlobalList} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const loginWithGithub = createAsyncThunk<
    User,
    string,
    { rejectValue: GlobalError }
>('users/loginWithGithub', async (codeParam, {rejectWithValue}) => {
    try {

        const response = await axiosApi.get(`/users/github-login?code=${codeParam}`);
        return response.data;
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data as GlobalError);
        }
        throw e;
    }
});

export const findThirdUser = createAsyncThunk<
    UserGlobalList,
    { name: string, page: string},
    { rejectValue: GlobalError }
>(
    'users/findThirdUser', async (data, {rejectWithValue}) => {
        try {
            const response = await axiosApi.get(`/users/global/${data.name}?page=${data.page}`);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    });