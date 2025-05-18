import { createTheme } from '@mui/material/styles';
import { themePrimitives } from './themePrimitives';

// Créer un thème partagé entre le site principal et le dashboard
const AppTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: themePrimitives.blue400,
      light: themePrimitives.blue300,
      dark: themePrimitives.blue500,
    },
    secondary: {
      main: themePrimitives.gray400,
    },
    background: {
      default: themePrimitives.darkBg,
      paper: themePrimitives.cardBg,
    },
    text: {
      primary: themePrimitives.lightText,
      secondary: themePrimitives.gray400,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default AppTheme;