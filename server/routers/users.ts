import * as crypto from 'crypto';
import express from "express";
import config from "../config";
import axios from "axios";
import {IAccessToken} from "../types";
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

        console.log('Authorization header:', tokenData.access_token);


        // if (!tokenData.access_token) {
        //     return res.status(401).send({error: 'No access token!'});
        // }

        const response = await axios.get(`${GITHUB_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });
        const data = response.data;
        console.log('Authorization header:', tokenData.access_token);
        console.log('User data', data);

        const {id, name, login, bio, email, html_url, avatar_url, company, location} = data;

        let user = await User.findOne({github_id: id});

        if (!user) {
            user = new User({
                github_id: id,
                name,
                login,
                bio,
                email,
                profile_link: html_url,
                avatar_url,
                company,
                location,
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

export default usersRouter;