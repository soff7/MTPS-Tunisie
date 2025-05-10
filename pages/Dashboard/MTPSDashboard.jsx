import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import apiService from '../../services/api.service';
import InfoCard from '../../components/InfoCard';
import RecentActivityCard from '../../components/RecentActivityCard';

// Couleurs pour les graphiques
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const MTPSDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalContacts: 0,
    newContacts: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentContacts: [],
    contactsByStatus: [],
    productsByCategory: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await apiService.stats.getDashboardStats();
        
        if (response.data && response.data.success) {
          setDashboardData(response.data.stats);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des statistiques du dashboard:', err);
        setError('Impossible de charger les données du dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  // Formater les données pour les graphiques
  const formattedContactsByStatus = dashboardData.contactsByStatus.map(item => ({
    name: item._id === 'nouveau' ? 'Nouveaux' : 
          item._id === 'lu' ? 'Lus' : 
          item._id === 'en-traitement' ? 'En traitement' : 
          item._id === 'résolu' ? 'Résolus' : item._id,
    value: item.count
  }));

  const formattedProductsByCategory = dashboardData.productsByCategory.map(item => ({
    name: item._id,
    value: item.count
  }));

  // Fonction pour formater les dates des messages récents
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Préparer les données d'activité récente
  const recentActivities = dashboardData.recentContacts.map(contact => ({
    id: contact._id,
    title: `Message de ${contact.name}`,
    description: contact.subject,
    date: formatDate(contact.createdAt),
    status: contact.status
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Tableau de bord MTPS</Typography>
      
      {/* Cartes d'information */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard 
            title="Messages totaux" 
            value={dashboardData.totalContacts} 
            icon="mail" 
            color="#0088FE" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard 
            title="Nouveaux messages" 
            value={dashboardData.newContacts} 
            icon="notifications" 
            color="#00C49F" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard 
            title="Produits" 
            value={dashboardData.totalProducts} 
            icon="inventory" 
            color="#FFBB28" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard 
            title="Utilisateurs" 
            value={dashboardData.totalUsers} 
            icon="people" 
            color="#FF8042" 
          />
        </Grid>
      </Grid>
      
      {/* Graphiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Statut des messages</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formattedContactsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formattedContactsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Produits par catégorie</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formattedProductsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formattedProductsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Activité récente */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RecentActivityCard activities={recentActivities} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MTPSDashboard;