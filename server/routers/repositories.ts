import express, { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import axios, { isAxiosError } from 'axios';
import { GITHUB_API_URL } from '../constants';
import {
  IRepositories,
  IRepositoriesApi,
  IRepository,
  IRepositoryApi,
  IRepositoryShort,
} from '../types';

const repositoriesRouter: Router = express.Router();

const transformData = (
  data: IRepositoriesApi,
  isPrivate: boolean,
): IRepositories => {
  const repos: IRepositoryShort[] = data.items.map((item: IRepositoryApi) => ({
    id: item.id,
    name: item.name,
    owner_login: item.owner.login,
    language: item.language || '',
    private: item.private,
  }));
  const privateRepos = repos.filter((repo) => repo.private);

  return {
    total_count: isPrivate ? privateRepos.length : data.total_count,
    private: isPrivate,
    repos: isPrivate ? privateRepos : repos,
  };
};

repositoriesRouter.get('/:isPrivate', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const queryIsPrivate = req.params.isPrivate === 'true';
    const thirdUser = req.query.user;

    const headers = queryIsPrivate
      ? { Authorization: `Bearer ${user.token}` }
      : {};

    const link = `${GITHUB_API_URL}/search/repositories?q=user:${
      thirdUser !== undefined ? thirdUser : user.login
    }`;

    const { data } = await axios.get(link, {
      headers,
    });

    const dataResponse: IRepositoriesApi = data;
    const transformedData = transformData(dataResponse, queryIsPrivate);

    return res.send(transformedData);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return res.send({
        total_count: 0,
        private: false,
        repos: [],
      });
    }

    return next(error);
  }
});

repositoriesRouter.get('/one/:repoName', auth, async (req, res, next) => {
  try {
    const repoName = req.params.repoName;
    const user = (req as RequestWithUser).user;
    const thirdUser = req.query.user;

    const link = `${GITHUB_API_URL}/repos/${
      thirdUser !== undefined ? thirdUser : user.login
    }/${repoName}`;
    const response = await axios.get(link, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const dataResponse: IRepositoryApi = response.data;
    const result: IRepository = {
      id: dataResponse.id,
      name: dataResponse.name,
      description: dataResponse.description,
      owner_login: dataResponse.owner.login,
      language: dataResponse.language,
      private: dataResponse.private,
      topics: dataResponse.topics,
      html_url: dataResponse.html_url,
      created_at: dataResponse.created_at,
      updated_at: dataResponse.updated_at,
      profile_link: dataResponse.owner.html_url,
    };
    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

export default repositoriesRouter;
