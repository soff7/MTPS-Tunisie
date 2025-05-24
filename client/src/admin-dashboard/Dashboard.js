import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, alpha } from '@mui/material/styles';
import {
  CssBaseline, Box, AppBar, Toolbar, IconButton, Typography, Badge,
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, Container,
  Grid, Card, CardContent, Avatar, Button, Alert, CircularProgress,
  Divider, Stack, useMediaQuery, useTheme, Switch
} from '@mui/material';
import {
  Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, Dashboard as DashboardIcon,
  People as PeopleIcon, Inventory as ProductsIcon, Email as EmailIcon,
  Settings as SettingsIcon, Notifications as NotificationsIcon,
  Logout as LogoutIcon, Analytics as AnalyticsIcon, Search, Edit, Delete,
  Add, Visibility, Reply, TrendingUp, TrendingDown, ShoppingCart,
  FileDownload, CloudUpload, Backup, CleaningServices, Assessment, Update
} from '@mui/icons-material';

// Import des pages
import { 
  DashboardHome, 
  UsersPage, 
  ProductsPage, 
  MessagesPage, 
  SettingsPage 
} from './pages';

// Import des hooks et utilitaires
import { useApi, useAuth } from './hooks';
import theme from './theme';

// Configuration du menu
const menuItems = [
  { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/admin', key: 'dashboard' },
  { text: 'Utilisateurs', icon: <PeopleIcon />, path: '/admin/users', key: 'users' },
  { text: 'Produits', icon: <ProductsIcon />, path: '/admin/products', key: 'products' },
  { text: 'Messages', icon: <EmailIcon />, path: '/admin/messages', key: 'messages' },
  { text: 'Paramètres', icon: <SettingsIcon />, path: '/admin/settings', key: 'settings' }
];

// Composant Sidebar
function Sidebar({ open, onClose, currentPath }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider'
        }
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          MTPS Admin
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.key}
            selected={currentPath === item.path || (item.path === '/admin' && currentPath === '/admin')}
            onClick={() => handleNavigation(item.path)}
            sx={{
              mx: 1,
              mb: 0.5,
              borderRadius: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                '& .MuiListItemIcon-root': { color: 'primary.main' }
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

// Composant Header
function Header({ onMenuClick, user, notifications = 0 }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/signin');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="ouvrir le menu"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Administration MTPS
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton color="inherit">
            <Badge badgeContent={notifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
            {user?.name?.charAt(0) || 'A'}
          </Avatar>
          
          <Button 
            color="inherit" 
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ ml: 1 }}
          >
            Déconnexion
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

// Composant principal du Dashboard
function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  // Vérification de l'authentification
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token) {
      navigate('/signin');
      return;
    }
    
    if (userRole !== 'admin' && userRole !== 'superadmin') {
      setError('Accès non autorisé');
      setLoading(false);
      return;
    }
    
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, [navigate]);

  // Stats globales
  const { data: stats } = useApi('/stats');

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
        <Alert severity="error" action={
          <Button color="inherit" onClick={() => navigate('/signin')}>
            Connexion
          </Button>
        }>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Header 
        onMenuClick={handleDrawerToggle}
        user={user}
        notifications={stats?.counts?.newMessages || 0}
      />
      
      <Sidebar 
        open={sidebarOpen && !isMobile}
        onClose={() => setSidebarOpen(false)}
        currentPath={location.pathname}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          minHeight: '100vh',
          ml: sidebarOpen && !isMobile ? '240px' : 0,
          transition: theme => theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          })
        }}
      >
        <Toolbar />
        
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route index element={<DashboardHome stats={stats} />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

// Composant racine avec Router
export default function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<DashboardLayout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}