import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {CircularProgress, Grid, Typography} from "@mui/material";
import CategoriesList from "../../components/CategoriesList/CategoriesList.tsx";
import {REPOS_CATEGORIES} from "../../constants.ts";
import {getUsersRepos} from "../../dispatchers/repositories/repositoriesThunks.ts";
import {selectRepos, selectReposLoading} from "../../dispatchers/repositories/repositoriesSlice.ts";


const UserRepositories= () => {
    const {category} = useParams() as { category: string };
    const dispatch = useAppDispatch();
    const repositories = useAppSelector(selectRepos)
    const fetchLoading = useAppSelector(selectReposLoading);
    useEffect(() => {
        if (category === 'Private') {
            dispatch(getUsersRepos('true'));
        } else {
            dispatch(getUsersRepos('false'));
        }
    }, [dispatch, category]);


    let content = (
        <>
            {repositories && repositories.repos.map((repo) => (
                <Grid item xs={12} sm={6} md={9} key={repo.id}>
                    <p>{repo.name}</p>
                </Grid>
            ))}
        </>
    );

    if (fetchLoading) {
        content = (<CircularProgress color="inherit" sx={{mt: 5}}/>)
    }
    if (repositories?.repos.length === 0 || !repositories) {
        content = (<Typography variant="h5" mb={4} fontWeight="bold" textAlign="center">No repositories</Typography>)
    }

    return (
        <Grid container justifyContent="space-between">
            <Grid item container xs={12} md={3}>
                <CategoriesList categories={REPOS_CATEGORIES}/>
            </Grid>
            <Grid
                item
                container
                alignItems="center"
                flexWrap="wrap"
                justifyContent="center"
                spacing={3}
                xs={12} md={9}
            >
                {content}
            </Grid>
        </Grid>
    );
}

export default UserRepositories;
