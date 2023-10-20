import React from 'react';
import { Repository } from '../../types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { BOX_SHADOW } from '../../utils/styles.ts';
import { NAV_LINKS } from '../../utils/constants.ts';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  repository: Repository;
}
const RepositoryCard: React.FC<Props> = ({ repository }) => {
  return (
    <Card sx={{ boxShadow: BOX_SHADOW }}>
      <CardHeader
        title={repository.name}
        subheader={`owner @${repository.owner_login}`}
      />
      <Divider />
      <CardContent>
        <Typography variant="body2" color="primary.main">
          <b>Main language:</b> {repository.language}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button
          component={RouterLink}
          to={`${NAV_LINKS.oneRepo}/${repository.name}/${repository.owner_login}`}
          fullWidth
        >
          More info
        </Button>
      </CardActions>
    </Card>
  );
};

export default RepositoryCard;
