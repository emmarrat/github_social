import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import { BOX_SHADOW } from '../../utils/styles.ts';
import { UserShort } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants.ts';

interface Props {
  user: UserShort;
}
const ProfileCard: React.FC<Props> = ({ user }) => {
  return (
    <Card sx={{ width: 400, boxShadow: BOX_SHADOW }}>
      <CardHeader
        color="primary"
        avatar={
          <Avatar
            alt={`${user.login} profile picture`}
            src={user.avatar_url}
            sx={{ width: 46, height: 46 }}
          />
        }
        title={
          <Typography gutterBottom variant="h5" component="div">
            @{user.login}
          </Typography>
        }
      />
      <Divider />

      <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button
          component={Link}
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
        >
          Open Github
        </Button>
        <Button
          component={RouterLink}
          to={`${NAV_LINKS.repos}/${user.login}`}
          fullWidth
        >
          See Repositories
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
