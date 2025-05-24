// client/src/admin-dashboard/pages/DashboardHome.js
import React from 'react';
import {
  Grid, Card, CardContent, Typography, Box, LinearProgress,
  Avatar, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import {
  TrendingUp, TrendingDown, People, ShoppingCart,
  Email, Visibility
} from '@mui/icons-material';

// Composant pour les cartes de statistiques
function StatCard({ title, value, change, icon, color = 'primary' }) {
  const isPositive = change > 0;
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              {isPositive ? (
                <TrendingUp color="success" fontSize="small" />
              ) : (
                <TrendingDown color="error" fontSize="small" />
              )}
              <Typography 
                variant="body2" 
                color={isPositive ? 'success.main' : 'error.main'}
                sx={{ ml: 0.5 }}
              >
                {change > 0 ? '+' : ''}{change}%
              </Typography>
            </Box>
          </Box>
          <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

// Composant principal de la page d'accueil
export default function DashboardHome({ stats }) {
  const statsData = [
    {
      title: 'Utilisateurs',
      value: stats?.counts?.users || 0,
      change: +12,
      icon: <People />,
      color: 'primary'
    },
    {
      title: 'Produits',
      value: stats?.counts?.products || 0,
      change: +8,
      icon: <ShoppingCart />,
      color: 'secondary'
    },
    {
      title: 'Messages',
      value: stats?.counts?.newMessages || 0,
      change: -5,
      icon: <Email />,
      color: 'warning'
    },
    {
      title: 'Vues',
      value: '24.5K',
      change: +15,
      icon: <Visibility />,
      color: 'success'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Tableau de bord
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Vue d'ensemble de votre plateforme MTPS
      </Typography>

      {/* Cartes de statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Graphiques et tableaux */}
      <Grid container spacing={3}>
        {/* Messages récents */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Messages récents
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Sujet</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats?.recentMessages?.slice(0, 5).map((message, index) => (
                      <TableRow key={index}>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject?.substring(0, 30)}...</TableCell>
                        <TableCell>
                          {new Date(message.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size="small" 
                            label="Nouveau" 
                            color="primary"
                          />
                        </TableCell>
                      </TableRow>
                    )) || (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <Typography color="textSecondary">
                            Aucun message récent
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Activité récente */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Activité récente
              </Typography>
              <Box>
                {[
                  { action: 'Nouvel utilisateur inscrit', time: 'Il y a 2 min' },
                  { action: 'Produit ajouté', time: 'Il y a 15 min' },
                  { action: 'Message reçu', time: 'Il y a 1h' },
                  { action: 'Commande traitée', time: 'Il y a 2h' }
                ].map((activity, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                      {index + 1}
                    </Avatar>
                    <Box>
                      <Typography variant="body2">{activity.action}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}