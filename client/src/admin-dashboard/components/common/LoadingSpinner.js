import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingSpinner({ message = 'Chargement...' }) {
  return (
    <Box 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center" 
      minHeight="200px"
      gap={2}
    >
      <CircularProgress />
      <Typography variant="body2" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
}