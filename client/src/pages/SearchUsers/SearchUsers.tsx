import LayoutContainer from '../../components/UI/Layout/LayoutContainer.tsx';
import {
  Button,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import Search from '../../components/Search/Search.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  clearGlobalUsers,
  pageDown,
  pageUp,
  selectAuthLoading,
  selectGlobalTotal,
  selectGlobalTotalPage,
  selectGlobalUserPage,
  selectGlobalUsers,
} from '../../dispatchers/users/usersSlice.ts';
import ProfileCard from '../../components/ProfileCard/ProfileCard.tsx';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect } from 'react';

const SearchUsers = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectGlobalUsers);
  const loading = useAppSelector(selectAuthLoading);
  const totalUsers = useAppSelector(selectGlobalTotal);
  const page = useAppSelector(selectGlobalUserPage);
  const totalPages = useAppSelector(selectGlobalTotalPage);

  useEffect(() => {
    dispatch(clearGlobalUsers());
  }, [dispatch]);
  const nextPage = () => {
    dispatch(pageUp());
  };
  const prevPage = () => {
    dispatch(pageDown());
  };
  return (
    <LayoutContainer gap={5}>
      <Grid item>
        <Typography variant="h5" mb={4} fontWeight="bold" textAlign="center">
          You can try to find other github users
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Search page={page} />
      </Grid>
      {users.length > 0 && (
        <Grid item container xs={12}>
          <Grid
            item
            xs={4}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Button disabled={page === 1} onClick={prevPage}>
              <ArrowBackIosNewIcon /> Prev
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Tooltip
              title={`We will show you only ${totalPages} pages of total found users`}
            >
              <Typography
                variant="body1"
                fontWeight="400"
                textAlign="center"
                color="primary"
                textTransform="uppercase"
              >
                Page: {page} / {totalPages}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid
            item
            xs={4}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Button disabled={page === totalPages} onClick={nextPage}>
              Next <ArrowForwardIosIcon />
            </Button>
          </Grid>
        </Grid>
      )}
      <Grid item container justifyContent="center">
        {users.length > 0 && (
          <Typography
            variant="body2"
            mb={2}
            fontWeight="bold"
            textAlign="center"
          >
            Total users found: {totalUsers}
          </Typography>
        )}
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        users.map((user) => <ProfileCard user={user} key={user.id} />)
      )}
    </LayoutContainer>
  );
};

export default SearchUsers;
