// client/src/admin-dashboard/pages/ProductsPage.js
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  Grid, Chip
} from '@mui/material';
import { Add, Edit, Delete, Search, FileDownload, CloudUpload } from '@mui/icons-material';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('tous');

  // Données simulées
  const mockProducts = [
    {
      id: 1,
      name: 'Ordinateur portable HP',
      category: 'Informatique',
      price: 1200,
      stock: 15,
      status: 'disponible',
      image: '/api/placeholder/150/150',
      description: 'Ordinateur portable haute performance pour bureautique',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Imprimante Canon',
      category: 'Informatique',
      price: 250,
      stock: 8,
      status: 'disponible',
      image: '/api/placeholder/150/150',
      description: 'Imprimante multifonction couleur',
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      name: 'Mobilier bureau',
      category: 'Mobilier',
      price: 450,
      stock: 0,
      status: 'rupture',
      image: '/api/placeholder/150/150',
      description: 'Bureau ergonomique avec rangements',
      createdAt: '2024-01-08'
    }
  ];

  const categories = ['tous', 'Informatique', 'Mobilier', 'Médical', 'Autre'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'disponible': return 'success';
      case 'rupture': return 'error';
      case 'commande': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'disponible': return 'Disponible';
      case 'rupture': return 'Rupture de stock';
      case 'commande': return 'En commande';
      default: return status;
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setOpenDialog(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestion des produits</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={handleAddProduct}
        >
          Ajouter produit
        </Button>
      </Box>

      {/* Statistiques rapides */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main">
                {mockProducts.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total produits
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                {mockProducts.filter(p => p.status === 'disponible').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Disponibles
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main">
                {mockProducts.filter(p => p.status === 'rupture').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Rupture stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main">
                {mockProducts.reduce((total, p) => total + p.stock, 0)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Stock total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Grille des produits */}
      <Grid container spacing={3}>
        {mockProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ height: 200, bgcolor: 'grey.100', position: 'relative' }}>
                <Chip 
                  label={getStatusText(product.status)}
                  color={getStatusColor(product.status)}
                  size="small"
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8 
                  }}
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom noWrap>
                  {product.name}
                </Typography>
                
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.category}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 2, minHeight: 40 }}>
                  {product.description}
                </Typography>
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary.main">
                    {product.price.toLocaleString()} DT
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Stock: {product.stock}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog d'ajout/modification */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Modifier le produit' : 'Ajouter un produit'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Nom du produit" 
                defaultValue={selectedProduct?.name || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                select 
                label="Catégorie"
                defaultValue={selectedProduct?.category || ''}
                SelectProps={{ native: true }}
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Prix (DT)" 
                type="number"
                defaultValue={selectedProduct?.price || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Stock" 
                type="number"
                defaultValue={selectedProduct?.stock || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Description" 
                multiline
                rows={3}
                defaultValue={selectedProduct?.description || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button variant="contained">
            {selectedProduct ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}