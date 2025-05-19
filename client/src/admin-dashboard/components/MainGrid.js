// client/src/admin-dashboard/components/MainGrid.js - Mise à jour pour gérer les stats
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';

export default function MainGrid({ stats, loading }) {
  // Données par défaut si stats n'est pas encore chargé
  const data = [
    {
      title: 'Utilisateurs',
      value: stats?.counts?.users || '0', 
      interval: 'Total',
      trend: 'up',
      data: Array(30).fill(0).map(() => Math.floor(Math.random() * 1000)),
    },
    {
      title: 'Messages',
      value: stats?.counts?.newMessages || '0', 
      interval: 'Non lus',
      trend: stats?.counts?.newMessages > 10 ? 'up' : 'neutral',
      data: Array(30).fill(0).map(() => Math.floor(Math.random() * 1000)),
    },
    {
      title: 'Produits',
      value: stats?.counts?.products || '0', 
      interval: 'Total',
      trend: 'neutral',
      data: Array(30).fill(0).map(() => Math.floor(Math.random() * 1000)),
    }
  ];

  if (loading) {
    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Chargement du tableau de bord...
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} lg={3} key={item}>
              <Skeleton variant="rectangular" height={120} animation="wave" />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* En-tête et vue d'ensemble */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Vue d'ensemble
      </Typography>
      
      {/* Afficher une alerte si aucune donnée n'est disponible */}
      {!stats && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Les données du tableau de bord ne sont pas disponibles pour le moment. Assurez-vous que l'API backend est accessible.
        </Alert>
      )}
      
      {/* Cartes statistiques */}
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} lg={3}>
          <HighlightedCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <SessionsChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      
      {/* Détails et tableaux */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Détails
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} lg={9}>
          <CustomizedDataGrid />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}