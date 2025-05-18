// src/admin-dashboard/theme/customizations/index.js

// Tous les imports doivent être au début du fichier
import { createTheme } from '@mui/material/styles';

// Exporter les customizations
export { chartsCustomizations } from './charts';
export { dataGridCustomizations } from './dataGrid';
export { datePickersCustomizations } from './datePickers';
export { treeViewCustomizations } from './treeView';

// Définition du thème
const theme = createTheme({
  palette: {
    primary: {
      main: '#35c8fa', // Votre primary-blue
      light: '#6fdaff',
      dark: '#22a6d3',
    },
    secondary: {
      main: '#808080', // Votre secondary-gray
    },
    background: {
      default: '#0a0a0a', // Votre dark-bg
      paper: '#2a2a2a', // Votre card-bg
    },
    text: {
      primary: '#f5f5f5', // Votre light-text
      secondary: '#9a9a9a', // Votre secondary-color
    },
  },
  // Autres personnalisations de thème...
});

export default theme;