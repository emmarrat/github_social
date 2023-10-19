export interface User {
    _id: string;
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

export interface GlobalError {
    error: string;
}

export interface Repository {
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

export interface RepositoriesList {
    total_count: number;
    repos: Repository[];
    private: boolean;
}