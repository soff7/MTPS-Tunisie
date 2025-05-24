import React from 'react';
import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { Refresh } from '@mui/icons-material';

export default function ErrorAlert({ 
  title = 'Erreur', 
  message, 
  onRetry, 
  severity = 'error' 
}) {
  return (
    <Box sx={{ my: 2 }}>
      <Alert 
        severity={severity}
        action={
          onRetry && (
            <Button 
              color="inherit" 
              size="small" 
              startIcon={<Refresh />}
              onClick={onRetry}
            >
              Réessayer
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}
