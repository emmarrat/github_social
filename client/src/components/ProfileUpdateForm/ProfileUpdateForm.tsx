import React from 'react';
import { UserUpdate } from '../../types';
import useForm from '../../hooks/useForm.ts';
import {
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  user: UserUpdate;
  onSubmit: (user: UserUpdate) => void;
  loading: boolean;
}

const ProfileUpdateForm: React.FC<Props> = ({ user, onSubmit, loading }) => {
  const initialState: UserUpdate = {
    name: user.name,
    bio: user.bio,
    company: user.company,
    location: user.location,
  };
  const { state, inputChangeHandler } = useForm({ initialState });

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      onSubmit(state);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container maxWidth="md">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <ManageAccountsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update your profile
        </Typography>

        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Name"
                name="name"
                value={state.name}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Bio"
                name="bio"
                value={state.bio}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Company"
                name="company"
                value={state.company}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                value={state.location}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Grid item alignSelf="flex-end">
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Update profile
            </LoadingButton>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileUpdateForm;
