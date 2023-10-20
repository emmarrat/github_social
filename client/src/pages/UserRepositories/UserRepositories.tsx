import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { CircularProgress, Grid, Typography } from '@mui/material';
import CategoriesList from '../../components/CategoriesList/CategoriesList.tsx';
import { REPOS_CATEGORIES } from '../../utils/constants.ts';
import { getUsersRepos } from '../../dispatchers/repositories/repositoriesThunks.ts';
import {
  selectRepos,
  selectReposLoading,
} from '../../dispatchers/repositories/repositoriesSlice.ts';
import LayoutContainer from '../../components/Layout/LayoutContainer.tsx';
import RepositoryCard from '../../components/RepositoryCard/RepositoryCard.tsx';

const UserRepositories = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const repositories = useAppSelector(selectRepos);
  const fetchLoading = useAppSelector(selectReposLoading);
  useEffect(() => {
    if (id !== 'Private' && id !== 'Public') {
      console.log('works ');
      dispatch(getUsersRepos({ isPrivate: 'false', thirdUser: id }));
    } else if (id === 'Private') {
      dispatch(getUsersRepos({ isPrivate: 'true' }));
    } else if (id === 'Public') {
      dispatch(getUsersRepos({ isPrivate: 'false' }));
    }
  }, [dispatch, id]);

  let content = (
    <>
      {repositories &&
        repositories.repos.map((repo) => (
          <Grid item xs={12} md={4} key={repo.id}>
            <RepositoryCard repository={repo} />
          </Grid>
        ))}
    </>
  );

  if (fetchLoading) {
    content = <CircularProgress color="inherit" sx={{ mt: 5 }} />;
  }
  if (repositories?.repos.length === 0) {
    content = (
      <Typography variant="h5" mb={4} fontWeight="bold" textAlign="center">
        No repositories
      </Typography>
    );
  }

  return (
    <LayoutContainer gap={3}>
      {id === 'Private' || id === 'Public' ? (
        <Grid item container justifyContent="center" xs={12} sx={{}}>
          <CategoriesList categories={REPOS_CATEGORIES} />
        </Grid>
      ) : null}

      <Grid item container justifyContent="center" xs={12} sx={{}}>
        <Typography variant="h5" mb={4} fontWeight="bold" textAlign="center">
          Total repositories: {repositories ? repositories.total_count : 0}
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
        spacing={3}
        xs={12}
      >
        {content}
      </Grid>
    </LayoutContainer>
  );
};

export default UserRepositories;
