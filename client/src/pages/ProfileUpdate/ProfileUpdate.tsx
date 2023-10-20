import LayoutContainer from '../../components/Layout/LayoutContainer.tsx';
import { Grid } from '@mui/material';
import GoBackButton from '../../components/UI/GoBackButton/GoBackButton.tsx';
import ProfileUpdateForm from '../../components/ProfileUpdateForm/ProfileUpdateForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectAuthLoading,
  selectUser,
} from '../../dispatchers/users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { UserUpdate } from '../../types';
import { updateUserInfo } from '../../dispatchers/users/usersThunks.ts';
import { NAV_LINKS } from '../../utils/constants.ts';

const ProfileUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);

  const userForUpdate = user && {
    name: user.name,
    bio: user.bio,
    company: user.company || '',
    location: user.location,
  };

  const onSubmit = async (user: UserUpdate) => {
    await dispatch(updateUserInfo(user)).unwrap();
    navigate(NAV_LINKS.profile);
  };
  return (
    <LayoutContainer gap={5}>
      <Grid item alignSelf="flex-start">
        <GoBackButton />
      </Grid>
      {userForUpdate && user && (
        <ProfileUpdateForm
          user={userForUpdate}
          onSubmit={onSubmit}
          loading={loading}
        />
      )}
    </LayoutContainer>
  );
};

export default ProfileUpdate;
