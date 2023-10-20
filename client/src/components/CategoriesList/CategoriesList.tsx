import React from 'react';
import { Box, Button } from '@mui/material';
import { NavLink as CategoryLink, useParams } from 'react-router-dom';

interface Props {
  categories: string[];
}

const CategoriesList: React.FC<Props> = ({ categories }) => {
  const { id } = useParams() as { id: string };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
      }}
    >
      {categories.map((categ) => (
        <Button
          variant="contained"
          component={CategoryLink}
          to={`/repositories/${categ}`}
          color={categ === id ? 'primary' : 'inherit'}
          sx={{
            padding: '6px 30px',
          }}
          key={categ}
        >
          {categ}
        </Button>
      ))}
    </Box>
  );
};

export default CategoriesList;
