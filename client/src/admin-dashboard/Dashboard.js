// client/src/admin-dashboard/Dashboard.js - Version améliorée avec un design plus professionnel
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// Fonction Copyright pour le pied de page du dashboard
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'© '}
      {new Date().getFullYear()}{' '}
      <Link color="inherit" href="https://mtps.tn/">
        MTPS Admin Dashboard
      </Link>
    </Typography>
  );
}

// Largeur du drawer (menu latéral)
const drawerWidth = 240;

// Composant AppBar personnalisé
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Composant Drawer personnalisé
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// Création du thème personnalisé avec blue comme couleur primaire
const mdTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Bleu de MTPS
    },
    secondary: {
      main: '#35c8fa', // Bleu plus clair
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// Composant Dashboard principal
export default function Dashboard() {
  // État local pour le contrôle du drawer (menu latéral)
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const navigate = useNavigate();
  
  // Toggle pour ouvrir/fermer le drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  // Useeffect pour charger les données utilisateur et les statistiques
  React.useEffect(() => {
    // Récupérer les informations utilisateur du localStorage
    try {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      
      if (!token) {
        setError('Vous devez être connecté pour accéder au tableau de bord');
        setLoading(false);
        return;
      }
      
      if (userRole !== 'admin' && userRole !== 'superadmin') {
        setError('Vous n\'avez pas les droits nécessaires pour accéder au tableau de bord');
        setLoading(false);
        return;
      }
      
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      
      // Charger les statistiques depuis l'API
      fetchStats(token);
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      setError('Erreur lors du chargement des données');
      setLoading(false);
    }
  }, []);
  
  // Fonction pour récupérer les statistiques
  const fetchStats = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Impossible de récupérer les statistiques');
      }
      
      const data = await response.json();
      console.log('Statistiques reçues:', data);
      setStats(data.data || { 
        counts: { 
          users: 0, 
          newMessages: 0, 
          products: 0 
        }
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      setError('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/signin');
  };
  
  // Éléments principaux du menu latéral
  const mainListItems = (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Tableau de bord" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Utilisateurs" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Produits" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Paramètres" />
      </ListItemButton>
    </React.Fragment>
  );
  
  // Affichage de chargement
  if (loading) {
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }
  
  // Affichage d'erreur
  if (error) {
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 3 }}>
          <Alert 
            severity="error" 
            action={
              <Button color="inherit" size="small" onClick={() => navigate('/signin')}>
                Connexion
              </Button>
            }
          >
            {error}
          </Alert>
        </Box>
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* Barre de navigation supérieure */}
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              MTPS Admin
            </Typography>
            
            {/* Icône des notifications */}
            <IconButton color="inherit">
              <Badge badgeContent={stats?.counts?.newMessages || 0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            {/* Avatar de l'utilisateur */}
            <Tooltip title={user?.name || "Admin"}>
              <Avatar 
                sx={{ ml: 2, bgcolor: 'secondary.main' }}
                alt={user?.name || "Admin"}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </Avatar>
            </Tooltip>
            
            {/* Bouton de déconnexion */}
            <Tooltip title="Déconnexion">
              <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        
        {/* Menu latéral */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1, pl: 2 }}>
              Menu Admin
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
          </List>
        </Drawer>
        
        {/* Contenu principal */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Titre du tableau de bord */}
              <Grid item xs={12}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Tableau de bord
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Bienvenue, {user?.name || 'Admin'}
                </Typography>
              </Grid>
              
              {/* Section Statistiques */}
              <Grid item xs={12}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Statistiques
                </Typography>
              </Grid>
              
              {/* Carte des utilisateurs */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Utilisateurs
                    </Typography>
                    <Typography variant="h4">
                      {stats?.counts?.users || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Nombre total d'utilisateurs inscrits
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Carte des messages */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Messages non lus
                    </Typography>
                    <Typography variant="h4">
                      {stats?.counts?.newMessages || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Nombre de messages en attente
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Carte des produits */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Produits
                    </Typography>
                    <Typography variant="h4">
                      {stats?.counts?.products || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Nombre total de produits
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Messages récents - Tableau */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Messages récents
                  </Typography>
                  {stats?.recentMessages && stats.recentMessages.length > 0 ? (
                    <Box sx={{ width: '100%', overflowX: 'auto' }}>
                      <Box sx={{ minWidth: 600 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', py: 1, display: 'flex' }}>
                          <Typography variant="subtitle2" sx={{ flex: 2, fontWeight: 'bold' }}>Nom</Typography>
                          <Typography variant="subtitle2" sx={{ flex: 2, fontWeight: 'bold' }}>Email</Typography>
                          <Typography variant="subtitle2" sx={{ flex: 3, fontWeight: 'bold' }}>Sujet</Typography>
                          <Typography variant="subtitle2" sx={{ flex: 1, fontWeight: 'bold' }}>Date</Typography>
                        </Box>
                        {stats.recentMessages.map((message, index) => (
                          <Box 
                            key={message._id || index} 
                            sx={{ 
                              py: 1, 
                              display: 'flex',
                              borderBottom: 1,
                              borderColor: 'divider',
                              '&:hover': { bgcolor: 'action.hover' }
                            }}
                          >
                            <Typography variant="body2" sx={{ flex: 2 }}>{message.name}</Typography>
                            <Typography variant="body2" sx={{ flex: 2 }}>{message.email}</Typography>
                            <Typography variant="body2" sx={{ flex: 3 }}>{message.subject}</Typography>
                            <Typography variant="body2" sx={{ flex: 1 }}>
                              {new Date(message.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <Typography variant="body2">Aucun message récent</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
            
            {/* Pied de page */}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}