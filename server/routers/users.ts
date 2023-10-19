import * as crypto from 'crypto';
import express from "express";
import config from "../config";
import axios from "axios";
import {IAccessToken, IGlobalUserResult, IGlobalUserSearch, IUserShort} from "../types";
import User from "../models/User";
import {GITHUB_API_URL, GITHUB_URL} from "../constants";

const usersRouter = express.Router();

const transformUserData = (data: IGlobalUserSearch): IGlobalUserResult => {
    const result = data.items.map((item) => ({
        id: item.id,
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url
    }));
    return  {
        total_count: data.total_count,
        items: result,
    }

};
usersRouter.get('/github-login', async (req, res, next) => {
    try {
        const queryCode = req.query.code as string;
        const params = {
            client_id: config.github.clientId,
            client_secret: config.github.clientSecret,
            code: queryCode,
        };

        const responseToken = await axios.post(
            GITHUB_URL,
            params,
            {
                headers: {
                    Accept: 'application/json'
                },
            }
        );

        const tokenData: IAccessToken = responseToken.data;

        if (!tokenData.access_token) {
            return res.status(401).send({error: 'No access token!'});
        }

        const response = await axios.get(`${GITHUB_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });
        const data = response.data;
        const {id, name, login, bio, email, html_url, avatar_url, company, location} = data;

        let user = await User.findOne({github_id: id});

        if (!user) {
            user = new User({
                name,
                login,
                bio,
                email,
                avatar_url,
                company,
                location,
                github_id: id,
                profile_link: html_url,
                token: tokenData.access_token,
                password: crypto.randomUUID(),
            })
        }

        user.token = tokenData.access_token;
        await user.save();
        return res.send(user);
    } catch (error) {
        next(error);
    }
});
usersRouter.get('/global/:name', async (req, res, next) => {
    try {
        const username = req.params.name;
        const page = req.query.page || 1;

        const responseToken = await axios.get(
            `${GITHUB_API_URL}/search/users?q=${username}&per_page=5&page=${page}`
        );

        const data: IGlobalUserSearch = responseToken.data;

        const users = transformUserData(data)
        return res.send(users);
    } catch (error) {
        next(error);
    }
});

export default usersRouter;