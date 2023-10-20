import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../dispatchers/users/usersSlice.ts';
import { Grid, Typography } from '@mui/material';
import ProfileCardFull from '../../components/ProfileCard/ProfileCardFull.tsx';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton.tsx';
import LayoutContainer from '../../components/UI/Layout/LayoutContainer.tsx';

const Profile = () => {
  const user = useAppSelector(selectUser);
  return (
    <LayoutContainer gap={5}>
      <Grid item alignSelf="flex-start">
        <GoBackButton />
      </Grid>
      <Typography variant="h5">My Profile</Typography>
      {user && <ProfileCardFull user={user} />}
    </LayoutContainer>
  );
};

export default Profile;
