import express, {Router} from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import axios from "axios";
import {GITHUB_API_URL} from "../constants";
import {IRepositories, IRepositoriesApi, IRepository, IRepositoryApi} from "../types";

const repositoriesRouter: Router = express.Router();

const transformData = (data: IRepositoriesApi, isPrivate: boolean): IRepositories => {
    const repos: IRepository[] = data.items.map((item: IRepositoryApi) => ({
        id: item.id,
        name: item.name,
        owner_login: item.owner.login,
        html_url: item.html_url,
        description: item.description || '',
        created_at: item.created_at,
        updated_at: item.updated_at,
        language: item.language || '',
        topics: item.topics || [],
        private: item.private,
    }));
    const privateRepos = repos.filter((repo) => repo.private);

    return  {
        total_count: isPrivate ? privateRepos.length : data.total_count,
        private: isPrivate,
        repos: isPrivate ? privateRepos : repos,
    };

};

repositoriesRouter.get('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const queryIsPrivate = req.query.isPrivate === 'true';

        const headers = queryIsPrivate
            ? {Authorization: `Bearer ${user.token}`}
            : {};

        const response = await axios.get(
            `${GITHUB_API_URL}/search/repositories?q=user:${user.login}`, {
                headers,
            }
        );

        const dataResponse: IRepositoriesApi = response.data;
        const transformedData = transformData(dataResponse, queryIsPrivate);

        return res.send(transformedData);
    } catch (e) {
        return next(e);
    }
});


export default repositoriesRouter;
