import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import { RepositoryFull } from '../../types';
import React from 'react';
import { BOX_SHADOW } from '../../utils/styles.ts';
import GitHubIcon from '@mui/icons-material/GitHub';
import dayjs from 'dayjs';

interface Props {
  repository: RepositoryFull;
}

const RepositoryCardFull: React.FC<Props> = ({ repository }) => {
  return (
    <Card sx={{ boxShadow: BOX_SHADOW }}>
      <CardHeader
        title={repository.name}
        subheader={`owner @${repository.owner_login}`}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="primary.main">
          <b>Description:</b>{' '}
          {repository.description
            ? repository.description
            : 'Were not provided'}
        </Typography>
        <Typography variant="body2" color="primary.main">
          <b>Main language:</b> {repository.language}
        </Typography>
        {repository.topics.length > 0 && (
          <Typography variant="body2" color="primary.main">
            <b>Topics:</b>{' '}
            {repository.topics.map((topic, i) => (
              <Typography component="span" key={i}>
                {' '}
                {topic}
              </Typography>
            ))}
          </Typography>
        )}
        <Typography variant="body2" color="primary.main">
          <b>Created:</b>{' '}
          {dayjs(repository.created_at).format('HH:MM, DD MMMM YYYY')}
        </Typography>
        <Typography variant="body2" color="primary.main">
          <b>Last update:</b>{' '}
          {dayjs(repository.updated_at).format('HH:MM, DD MMMM YYYY')}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button
          component={Link}
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          variant="outlined"
        >
          <GitHubIcon sx={{ mr: 1 }} /> Repository
        </Button>
        <Button
          component={Link}
          href={repository.profile_link}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          variant="outlined"
        >
          <GitHubIcon sx={{ mr: 1 }} /> Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default RepositoryCardFull;
