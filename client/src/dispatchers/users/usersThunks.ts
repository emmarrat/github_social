import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, User} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const loginWithGithub = createAsyncThunk<
    User,
    string,
    { rejectValue: GlobalError }
>('users/loginWithGithub', async (codeParam, { rejectWithValue }) => {
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