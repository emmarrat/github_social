import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import axios from "axios";
import {GITHUB_API_URL} from "../constants";
import {IRepositories, IRepositoriesApi, IRepository, IRepositoryApi} from "../types";

const repositoriesRouter = express.Router();

repositoriesRouter.get('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const response = await axios.get(
            `${GITHUB_API_URL}/search/repositories?q=user:${user.login}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );

        const dataResponse: IRepositoriesApi = response.data;

        const transformData = (data: IRepositoriesApi): IRepositories => {
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

            return {
                total_count: data.total_count,
                repos: {
                    public: repos.filter((repo) => !repo.private),
                    private: repos.filter((repo) => repo.private),
                },
            };
        };

        const transformedData = transformData(dataResponse);
        return res.send(transformedData);

    } catch (e) {
        return next(e)
    }


});

export default repositoriesRouter;
