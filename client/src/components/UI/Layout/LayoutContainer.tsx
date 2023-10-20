import React, { ReactNode } from 'react';
import { Grid } from '@mui/material';

interface Props {
  children: ReactNode;
  gap?: number;
  direction?: string;
  height?: string;
}
const LayoutContainer: React.FC<Props> = ({
  children,
  gap,
  direction,
  height,
}) => {
  return (
    <Grid
      container
      justifyContent="center"
      flexDirection={direction ? 'row' : 'column'}
      alignItems="center"
      gap={gap ? gap : 0}
      height={height ? height : 'auto'}
    >
      {children}
    </Grid>
  );
};

export default LayoutContainer;
