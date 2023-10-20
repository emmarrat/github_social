export interface IUser {
  github_id: string;
  name: string;
  login: string;
  bio: string;
  email: string;
  profile_link: string;
  avatar_url: string | null;
  company: string | null;
  location: string;
  token: string;
  password: string;
}

export interface IGlobalUserSearch {
  items: IUserShort[];
  total_count: number;
}

export interface IGlobalUserResult extends IGlobalUserSearch {
  items: IUserShort[];
}
export interface IUserShort {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface IAccessToken {
  access_token: string;
  scope: string;
  token_type: string;
}

export interface IRepositoryShort {
  id: number;
  name: string;
  owner_login: string;
  language: string;
  private: boolean;
}

export interface IRepository extends IRepositoryShort {
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  profile_link: string;
}

export interface IRepositoryApi extends IRepository {
  owner: {
    login: string;
    html_url: string;
  };
}
export interface IRepositories {
  total_count: number;
  repos: IRepositoryShort[];
  private: boolean;
}

export interface IRepositoriesApi {
  total_count: number;
  items: IRepositoryApi[];
}
