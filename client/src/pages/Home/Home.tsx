import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../dispatchers/users/usersSlice.ts';
import { Link as RouterLink } from 'react-router-dom';
import LayoutContainer from '../../components/UI/Layout/LayoutContainer.tsx';
import { Button, Grid, Typography } from '@mui/material';
import { NAV_LINKS } from '../../utils/constants.ts';
import Login from '../../components/Login/Login.tsx';

const Home = () => {
  const user = useAppSelector(selectUser);
  return (
    <LayoutContainer height="60vh">
      <Typography variant="h4" mb={2}>
        Hello it is web app which works with
        <Typography
          variant="h4"
          fontWeight={700}
          component="span"
          color="secondary"
        >
          {' '}
          GitHub API
        </Typography>
      </Typography>
      <Typography variant="h5">
        {user
          ? 'You can start from your profile page or try to press on your name/avatar in the header'
          : 'Firstly try to login :)'}
      </Typography>
      <Grid item mt={5}>
        {user ? (
          <Button
            variant="outlined"
            component={RouterLink}
            to={NAV_LINKS.profile}
            size="large"
          >
            Profile
          </Button>
        ) : (
          <Login />
        )}
      </Grid>
    </LayoutContainer>
  );
};

export default Home;
