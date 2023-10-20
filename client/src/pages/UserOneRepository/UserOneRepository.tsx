import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import LayoutContainer from '../../components/Layout/LayoutContainer.tsx';
import { CircularProgress, Grid, Typography } from '@mui/material';
import RepositoryCardFull from '../../components/RepositoryCard/RepositoryCardFull.tsx';
import {
  selectOneRepo,
  selectReposLoading,
} from '../../dispatchers/repositories/repositoriesSlice.ts';
import { getOneRepo } from '../../dispatchers/repositories/repositoriesThunks.ts';

const UserOneRepository = () => {
  const { repoName } = useParams() as { repoName: string };
  const dispatch = useAppDispatch();
  const repo = useAppSelector(selectOneRepo);
  const loading = useAppSelector(selectReposLoading);
  useEffect(() => {
    dispatch(getOneRepo(repoName));
  }, [dispatch, repoName]);

  return (
    <LayoutContainer gap={5}>
      {loading ? (
        <CircularProgress color="inherit" sx={{ mt: 5 }} />
      ) : (
        repo && (
          <>
            <Typography variant="h4" textTransform="uppercase">
              My repository:
            </Typography>
            <Grid item container justifyContent="center" xs={8}>
              <RepositoryCardFull repository={repo} />
            </Grid>
          </>
        )
      )}
    </LayoutContainer>
  );
};

export default UserOneRepository;
