export interface IUser  {
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

export interface IAccessToken {
    access_token: string;
    scope: string;
    token_type: string;
}

export interface IRepository {
    id: number;
    name: string;
    owner_login: string;
    html_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    language: string;
    topics: string[];
    private: boolean;
}

export interface IRepositoryApi extends IRepository{
    owner: {
        login: string
    }
}
export interface IRepositories {
    total_count: number;
    repos: IRepository[];
    private: boolean;
}

export interface IRepositoriesApi {
    total_count: number;
    items: IRepositoryApi[];
}