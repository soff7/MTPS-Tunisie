import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import Popper from '@mui/material/Popper';
import { Box, Typography } from '@mui/material';

export default function CustomDatePicker() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2023-04-17'));
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button
        variant="outlined"
        startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
        onClick={handleClick}
        sx={{ minWidth: 'fit-content' }}
      >
        {value ? value.format('MMM DD, YYYY') : 'Select date'}
      </Button>

      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <Box sx={{ p: 2, bgcolor: 'background.paper', boxShadow: 3 }}>
          <DatePicker
            open
            onClose={() => setOpen(false)}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              setOpen(false);
            }}
          />
        </Box>
      </Popper>
    </LocalizationProvider>
  );
}
