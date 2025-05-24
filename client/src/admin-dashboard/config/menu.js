import {
  Dashboard, People, Inventory, Email, Settings,
  Analytics, Assessment, Notifications, Security
} from '@mui/icons-material';

export const mainMenuItems = [
  {
    key: 'dashboard',
    text: 'Tableau de bord',
    icon: Dashboard,
    path: '/admin',
    description: 'Vue d\'ensemble du système'
  },
  {
    key: 'users',
    text: 'Utilisateurs',
    icon: People,
    path: '/admin/users',
    description: 'Gestion des utilisateurs'
  },
  {
    key: 'products',
    text: 'Produits',
    icon: Inventory,
    path: '/admin/products',
    description: 'Catalogue des produits'
  },
  {
    key: 'messages',
    text: 'Messages',
    icon: Email,
    path: '/admin/messages',
    description: 'Messages et contact'
  },
  {
    key: 'settings',
    text: 'Paramètres',
    icon: Settings,
    path: '/admin/settings',
    description: 'Configuration système'
  }
];

export const secondaryMenuItems = [
  {
    key: 'analytics',
    text: 'Analytics',
    icon: Analytics,
    path: '/admin/analytics',
    description: 'Analyses et rapports'
  },
  {
    key: 'reports',
    text: 'Rapports',
    icon: Assessment,
    path: '/admin/reports',
    description: 'Rapports détaillés'
  },
  {
    key: 'notifications',
    text: 'Notifications',
    icon: Notifications,
    path: '/admin/notifications',
    description: 'Centre de notifications'
  },
  {
    key: 'security',
    text: 'Sécurité',
    icon: Security,
    path: '/admin/security',
    description: 'Paramètres de sécurité'
  }
];
