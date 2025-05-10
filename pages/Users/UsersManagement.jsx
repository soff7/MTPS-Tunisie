import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, TextField, Dialog, DialogActions, 
  DialogContent, DialogTitle, Grid, CircularProgress, 
  Snackbar, Alert, IconButton, MenuItem, Switch, FormControlLabel,
  Chip, Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import apiService from '../../services/api.service';
import { useAuth } from '../../hooks/useAuth';

const UsersManagement = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'success' });

  const roleOptions = [
    { value: 'user', label: 'Utilisateur' },
    { value: 'admin', label: 'Administrateur' },
    // Seul superadmin peut voir cette option
    ...(currentUser?.role === 'superadmin' ? [{ value: 'superadmin', label: 'Super Admin' }] : [])
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.auth.getUsers();
      if (response.data) {
        const usersWithId = response.data.map(user => ({
          ...user,
          id: user._id
        }));
        setUsers(usersWithId);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setAlertInfo({
        open: true,
        message: 'Erreur lors de la récupération des utilisateurs',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (!formData.name || !formData.email || !formData.password) {
        setAlertInfo({
          open: true,
          message: 'Veuillez remplir tous les champs',
          severity: 'warning'
        });
        return;
      }

      if (!validateEmail(formData.email)) {
        setAlertInfo({
          open: true,
          message: 'Format d\'email invalide',
          severity: 'warning'
        });
        return;
      }

      if (formData.password.length < 6) {
        setAlertInfo({
          open: true,
          message: 'Le mot de passe doit contenir au moins 6 caractères',
          severity: 'warning'
        });
        return;
      }

      // Création d'un nouvel utilisateur (admin)
      const response = await apiService.auth.createAdmin(formData);
      if (response.data && response.data.user) {
        setAlertInfo({
          open: true,
          message: 'Utilisateur créé avec succès',
          severity: 'success'
        });
        fetchUsers();
        handleCloseDialog();
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setAlertInfo({
        open: true,
        message: error.response?.data?.message || 'Erreur lors de la création de l\'utilisateur',
        severity: 'error'
      });
    }
  };

  const handleDelete = async () => {
    // Ne pas permettre la suppression de son propre compte
    if (selectedUser.id === currentUser.id) {
      setAlertInfo({
        open: true,
        message: 'Vous ne pouvez pas supprimer votre propre compte',
        severity: 'error'
      });
      handleCloseDeleteDialog();
      return;
    }

    try {
      const response = await apiService.auth.deleteUser(selectedUser.id);
      if (response.data && response.data.success) {
        setAlertInfo({
          open: true,
          message: 'Utilisateur supprimé avec succès',
          severity: 'success'
        });
        fetchUsers();
      }
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting user:', error);
      setAlertInfo({
        open: true,
        message: 'Erreur lors de la suppression de l\'utilisateur',
        severity: 'error'
      });
    }
  };

  const handleCloseAlert = () => {
    setAlertInfo(prev => ({ ...prev, open: false }));
  };

  const getRoleChip = (role) => {
    let color;
    let label;

    switch(role) {
      case 'superadmin':
        color = 'error';
        label = 'Super Admin';
        break;
      case 'admin':
        color = 'primary';
        label = 'Admin';
        break;
      case 'user':
        color = 'success';
        label = 'Utilisateur';
        break;
      default:
        color = 'default';
        label = role;
    }

    return <Chip size="small" color={color} label={label} />;
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getRandomColor = (id) => {
    const colors = [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
      '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548', '#9E9E9E', '#607D8B'
    ];
    const index = id.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const columns = [
    { 
      field: 'name', 
      headerName: 'Nom', 
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar 
            sx={{ 
              bgcolor: getRandomColor(params.row.id),
              width: 30,
              height: 30,
              fontSize: '0.875rem'
            }}
          >
            {getInitials(params.value)}
          </Avatar>
          <Typography>{params.value}</Typography>
        </Box>
      )
    },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { 
      field: 'role', 
      headerName: 'Rôle', 
      flex: 0.8,
      renderCell: (params) => getRoleChip(params.value)
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        // Ne pas permettre la suppression des superadmins sauf pour un autre superadmin
        const canDelete = currentUser.role === 'superadmin' || params.row.role !== 'superadmin';
        
        // Ne pas afficher le bouton de suppression pour son propre compte
        const isSelf = currentUser.id === params.row.id;

        return (
          <Box>
            {!isSelf && canDelete && (
              <IconButton 
                color="error" 
                onClick={() => handleOpenDeleteDialog(params.row)}
                aria-label="Supprimer"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        );
      }
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
      <Typography variant="h4" gutterBottom>Gestion des utilisateurs</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Nouvel utilisateur
        </Button>
      </Box>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ height: 'calc(100vh - 250px)', width: '100%' }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
          />
        </Box>
      </Paper>
      
      {/* Formulaire d'ajout d'utilisateur */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom complet"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mot de passe"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                helperText="Minimum 6 caractères"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Rôle"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Ajouter
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
          <Typography>
            Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{selectedUser?.name}</strong> ?
          </Typography>
          {selectedUser?.role === 'admin' && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Cet utilisateur a des droits d'administrateur. La suppression entraînera la perte d'accès à toutes ses fonctionnalités.
            </Alert>
          )}
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

export default UsersManagement;