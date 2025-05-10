import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box, Chip } from '@mui/material';

const StatusChip = ({ status }) => {
  let color;
  let label;

  switch(status) {
    case 'nouveau':
      color = 'info';
      label = 'Nouveau';
      break;
    case 'lu':
      color = 'primary';
      label = 'Lu';
      break;
    case 'en-traitement':
      color = 'warning';
      label = 'En traitement';
      break;
    case 'résolu':
      color = 'success';
      label = 'Résolu';
      break;
    default:
      color = 'default';
      label = status;
  }

  return <Chip size="small" color={color} label={label} />;
};

const RecentActivityCard = ({ activities }) => {
  return (
    <Paper sx={{ p: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>Activité récente</Typography>
      
      {activities.length === 0 ? (
        <Typography color="text.secondary">Aucune activité récente.</Typography>
      ) : (
        <List>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem 
                alignItems="flex-start"
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                    borderRadius: 1
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1">{activity.title}</Typography>
                      <StatusChip status={activity.status} />
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {activity.description}
                      </Typography>
                      {` — ${activity.date}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default RecentActivityCard;