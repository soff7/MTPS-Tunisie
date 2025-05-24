import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Rechercher...', 
  ...props 
}) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" />
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
}