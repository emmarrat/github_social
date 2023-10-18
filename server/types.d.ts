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