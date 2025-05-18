import React from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Brightness4, Brightness7, Settings } from '@mui/icons-material';

// Ce composant est référencé mais n'est pas utilisé de manière critique
// Nous créons une version simplifiée pour éviter les erreurs
const ColorModeIconDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Settings />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Brightness7 fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mode Clair</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Brightness4 fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mode Sombre</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ColorModeIconDropdown;