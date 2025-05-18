import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';

// If you want custom styling
const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  // Add your custom styles here
}));

const CustomDatePicker = (props) => {
  const {
    value,
    onChange,
    format = 'DD/MM/YYYY',
    // Extract any other props you need
    ...otherProps
  } = props;

  // Any custom logic you need
  const handleChange = (newValue) => {
    // Add any custom logic here
    if (onChange) onChange(newValue);
  };

  return (
    <StyledDatePicker
      value={value}
      onChange={handleChange}
      format={format}
      // Customize slots and their props
      slotProps={{
        textField: {
          variant: 'outlined',
          fullWidth: true,
          // Add more TextField props here
        },
        // You can customize popper, paper, actionBar, etc.
      }}
      // Add any other DatePicker props
      {...otherProps}
    />
  );
};

export default CustomDatePicker;