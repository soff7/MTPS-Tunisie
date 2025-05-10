import React from 'react';
import { Paper, Box, Typography, Icon } from '@mui/material';

const InfoCard = ({ title, value, icon, color }) => {
  return (
    <Paper 
      sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        borderTop: `4px solid ${color}`,
        boxShadow: 3
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          {title}
        </Typography>
        <Icon sx={{ color }}>
          {icon}
        </Icon>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Paper>
  );
};

export default InfoCard;