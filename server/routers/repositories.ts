import express, { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import axios from 'axios';
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

repositoriesRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const queryIsPrivate = req.query.isPrivate === 'true';

    const headers = queryIsPrivate
      ? { Authorization: `Bearer ${user.token}` }
      : {};

    const response = await axios.get(
      `${GITHUB_API_URL}/search/repositories?q=user:${user.login}`,
      {
        headers,
      },
    );

    const dataResponse: IRepositoriesApi = response.data;
    const transformedData = transformData(dataResponse, queryIsPrivate);

    return res.send(transformedData);
  } catch (e) {
    return next(e);
  }
});

repositoriesRouter.get('/:repoName', auth, async (req, res, next) => {
  try {
    const repoName = req.params.repoName;

    const user = (req as RequestWithUser).user;

    const response = await axios.get(
      `${GITHUB_API_URL}/repos/${user.login}/${repoName}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );

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
