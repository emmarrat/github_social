import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import LayoutContainer from '../../components/UI/Layout/LayoutContainer.tsx';
import { CircularProgress, Grid, Typography } from '@mui/material';
import RepositoryCardFull from '../../components/RepositoryCard/RepositoryCardFull.tsx';
import {
  selectOneRepo,
  selectReposLoading,
} from '../../dispatchers/repositories/repositoriesSlice.ts';
import { getOneRepo } from '../../dispatchers/repositories/repositoriesThunks.ts';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton.tsx';
import { selectUser } from '../../dispatchers/users/usersSlice.ts';

const UserOneRepository = () => {
  const { repoName, username } = useParams() as {
    repoName: string;
    username: string;
  };
  const dispatch = useAppDispatch();
  const repo = useAppSelector(selectOneRepo);
  const loading = useAppSelector(selectReposLoading);
  const loggedUser = useAppSelector(selectUser);

  useEffect(() => {
    if (loggedUser && username !== loggedUser.login) {
      dispatch(getOneRepo({ repoName, thirdUser: username }));
    } else {
      dispatch(getOneRepo({ repoName }));
    }
  }, [dispatch, repoName]);

  return (
    <LayoutContainer gap={5}>
      {loading ? (
        <CircularProgress color="inherit" sx={{ mt: 5 }} />
      ) : (
        repo && (
          <>
            <Grid item alignSelf="flex-start">
              <GoBackButton />
            </Grid>
            <Typography variant="h4" textTransform="uppercase">
              {loggedUser && username !== loggedUser.login
                ? `${username}'s `
                : 'My '}
              repository:
            </Typography>
            <Grid item container justifyContent="center" xs={12} md={8}>
              <RepositoryCardFull repository={repo} />
            </Grid>
          </>
        )
      )}
    </LayoutContainer>
  );
};

export default UserOneRepository;
