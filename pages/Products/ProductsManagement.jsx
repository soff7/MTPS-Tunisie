import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, TextField, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, Grid, CircularProgress, 
  Snackbar, Alert, IconButton, MenuItem, InputAdornment
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import apiService from '../../services/api.service';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    status: 'disponible',
    imageUrl: ''
  });
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const statusOptions = [
    { value: 'disponible', label: 'Disponible' },
    { value: 'rupture', label: 'Rupture de stock' },
    { value: 'arrivage', label: 'Nouvel arrivage' }
  ];

  const categoryOptions = [
    { value: 'pvc', label: 'PVC' },
    { value: 'pe', label: 'PE' },
    { value: 'accessoires', label: 'Accessoires' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filtrer les produits en fonction du terme de recherche
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = products.filter(product => {
        return (
          product.name.toLowerCase().includes(lowercasedFilter) ||
          product.category.toLowerCase().includes(lowercasedFilter) ||
          product.description.toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.products.getAll();
      if (response.data.success) {
        const productsWithId = response.data.data.map(product => ({
          ...product,
          id: product._id
        }));
        setProducts(productsWithId);
        setFilteredProducts(productsWithId);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setAlertInfo({
        open: true,
        message: 'Erreur lors de la récupération des produits',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        stock: product.stock,
        status: product.status,
        imageUrl: product.imageUrl
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        status: 'disponible',
        imageUrl: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validation basique
      if (!formData.name || !formData.category || !formData.price || !formData.stock) {
        setAlertInfo({
          open: true,
          message: 'Veuillez remplir tous les champs obligatoires',
          severity: 'warning'
        });
        return;
      }

      // Convertir en nombres
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      if (selectedProduct) {
        // Mise à jour d'un produit existant
        const response = await apiService.products.update(selectedProduct.id, productData);
        if (response.data.success) {
          setAlertInfo({
            open: true,
            message: 'Produit mis à jour avec succès',
            severity: 'success'
          });
          fetchProducts();
        }
      } else {
        // Création d'un nouveau produit
        const response = await apiService.products.create(productData);
        if (response.data.success) {
          setAlertInfo({
            open: true,
            message: 'Produit créé avec succès',
            severity: 'success'
          });
          fetchProducts();
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving product:', error);
      setAlertInfo({
        open: true,
        message: 'Erreur lors de l\'enregistrement du produit',
        severity: 'error'
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiService.products.delete(selectedProduct.id);
      if (response.data.success) {
        setAlertInfo({
          open: true,
          message: 'Produit supprimé avec succès',
          severity: 'success'
        });
        fetchProducts();
      }
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting product:', error);
      setAlertInfo({
        open: true,
        message: 'Erreur lors de la suppression du produit',
        severity: 'error'
      });
    }
  };

  const handleCloseAlert = () => {
    setAlertInfo(prev => ({ ...prev, open: false }));
  };

  const columns = [
    { field: 'name', headerName: 'Nom', flex: 1 },
    { field: 'category', headerName: 'Catégorie', flex: 0.8 },
    { 
      field: 'price', 
      headerName: 'Prix', 
      flex: 0.6,
      valueFormatter: (params) => `${params.value} TND` 
    },
    { field: 'stock', headerName: 'Stock', flex: 0.5 },
    { 
      field: 'status', 
      headerName: 'Statut', 
      flex: 0.8,
      renderCell: (params) => {
        const statusOption = statusOptions.find(option => option.value === params.value);
        return statusOption ? statusOption.label : params.value;
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton 
            color="primary" 
            onClick={() => handleOpenDialog(params.row)}
            aria-label="Modifier"
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            color="error" 
            onClick={() => handleOpenDeleteDialog(params.row)}
            aria-label="Supprimer"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Gestion des produits</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          label="Rechercher"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: '300px' }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Ajouter un produit
        </Button>
      </Box>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ height: 'calc(100vh - 250px)', width: '100%' }}>
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </Paper>
      
      {/* Formulaire d'ajout/modification */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom du produit"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Catégorie"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prix (TND)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                InputProps={{
                  inputProps: { min: 0, step: 0.01 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Statut"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="URL de l'image"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
          >
            {selectedProduct ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialogue de confirmation de suppression */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer le produit "{selectedProduct?.name}" ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Annuler</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Alert pour les notifications */}
      <Snackbar 
        open={alertInfo.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertInfo.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductsManagement;