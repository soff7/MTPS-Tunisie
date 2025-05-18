import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';

// Import des composants de date
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Dashboard(props) {
  // État pour stocker les informations de l'utilisateur
  const [user, setUser] = React.useState(null);
  
  React.useEffect(() => {
    // Récupérer les informations utilisateur du localStorage
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
    }
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    window.location.href = '/signin';
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="dashboard-container">
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <SideMenu user={user} onLogout={handleLogout} />
          <AppNavbar />
          
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: 'background.default',
              overflow: 'auto',
              p: 3
            }}
          >
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Bienvenue, {user?.name || 'Admin'}
            </Typography>
            
            <Stack spacing={3} mt={4}>
              <Header />
              <MainGrid />
            </Stack>
          </Box>
        </Box>
      </div>
    </LocalizationProvider>
  );
}