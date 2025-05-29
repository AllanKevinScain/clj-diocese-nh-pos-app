import { Box, Typography } from '@mui/material';
import React from 'react';

export interface SessionFormInterface {
  title: string;
  children: React.ReactNode;
}

export const SessionForm: React.FC<SessionFormInterface> = (props) => {
  const { children, title } = props;

  return (
    <Box>
      <Typography variant="h5" mb={4}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
