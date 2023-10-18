import * as crypto from 'crypto';
import express, {Request, Response} from "express";
import config from "../config";
import axios from "axios";
import {IAccessToken, IUser} from "../types";
import User from "../models/User";
import {GITHUB_API_URL, GITHUB_URL} from "../constants";

const usersRouter = express.Router();
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
                Authorization: tokenData.access_token,
            },
        });
        const {data} = response;
        const {id, name, login, bio, email, profile_link, avatar_url, company, location} = data;

        let user = await User.findOne({ github_id: id });

        if (!user) {
           user = new User ({
                github_id: id,
                name,
                login,
                bio,
                email,
                profile_link,
                avatar_url,
                company,
                location,
                token: tokenData.access_token,
                password: crypto.randomUUID(),
            })
        }

        user.token = tokenData.access_token;
        await user.save();
        return res.send({ message: 'Login with Github successful!', user });
    } catch (error) {
        next(error);
    }
});

export default usersRouter;