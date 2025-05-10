import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, TextField, CircularProgress, 
  Snackbar, Alert, IconButton, MenuItem, InputAdornment, 
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Button, Chip, Divider, Card, CardContent, Grid
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import apiService from '../../services/api.service';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [alertInfo, setAlertInfo] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'nouveau', label: 'Nouveau' },
    { value: 'lu', label: 'Lu' },
    { value: 'en-traitement', label: 'En traitement' },
    { value: 'résolu', label: 'Résolu' }
  ];

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    // Filtrer les contacts en fonction du terme de recherche et du filtre de statut
    let filtered = contacts;
    
    // Filtrer par status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }
    
    // Filtrer par terme de recherche
    if (searchTerm.trim() !== '') {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter(contact => {
        return (
          contact.name.toLowerCase().includes(lowercasedFilter) ||
          contact.email.toLowerCase().includes(lowercasedFilter) ||
          contact.subject.toLowerCase().includes(lowercasedFilter) ||
          contact.message.toLowerCase().includes(lowercasedFilter)
        );
      });
    }
    
    setFilteredContacts(filtered);
  }, [searchTerm, statusFilter, contacts]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await apiService.contacts.getAll();
      if (response.data.success) {
        const contactsWithId = response.data.data.map(contact => ({
          ...contact,
          id: contact._id
        }));
        setContacts(contactsWithId);
        setFilteredContacts(contactsWithId);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setAlertInfo({
        open: true,
        message: 'Erreur lors de la récupération des messages',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteDialog = (contact) => {
    setSelectedContact(contact);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenViewDialog = async (contact) => {
    setSelectedContact(contact);
    setOpenViewDialog(true);
    
    // Si le message est nouveau, le marquer comme lu
    if (contact.status === 'nouveau') {
      try {
        await apiService.contacts.updateStatus(contact.id, 'lu');
        // Mettre à jour l'état local
        const updatedContacts = contacts.map(c => 
          c.id === contact.id ? { ...c, status: 'lu' } : c
        );
        setContacts(updatedContacts);
        setFilteredContacts(prev => prev.map(c => 
          c.id === contact.id ? { ...c, status: 'lu' } : c
        ));
      } catch (error) {
        console.error('Error updating contact status:', error);
      }
    }
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleDelete = async () => {
    try {
      const response = await apiService.contacts.delete(selectedContact.id);
      if (response.data.success) {
        setAlertInfo({
          open: true,
          message: 'Message supprimé avec succès',
          severity: 'success'
        });
        fetchContacts();
      }
      handleCloseDeleteDialog();
    } catch (error) {
      console.error('Error deleting contact:', error);
      setAlertInfo({
        open: true,
        message: 'Erreur lors de la suppression du message',
        severity: 'error'
      });
    }
  };

  const handleUpdateStatus = async (contactId, newStatus) => {
    try {
      await apiService.contacts.updateStatus(contactId, newStatus);
      // Mettre à jour l'état local
      const updatedContacts = contacts.map(c => 
        c.id === contactId ? { ...c, status: newStatus } : c
      );
      setContacts(updatedContacts);
      setFilteredContacts(prev => prev.map(c => 
        c.id === contactId ? { ...c, status: newStatus } : c
      ));
      
      setAlertInfo({
        open: true,
        message: 'Statut mis à jour avec succès',
        severity: 'success'
      });
      
      if (selectedContact && selectedContact.id === contactId) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      setAlertInfo({
        open: true,
        message: 'Erreur lors de la mise à jour du statut',
        severity: 'error'
      });
    }
  };

  const handleCloseAlert = () => {
    setAlertInfo(prev => ({ ...prev, open: false }));
  };

  const getStatusChip = (status) => {
    let color;
    let label;

    switch(status) {
      case 'nouveau':
        color = 'info';
        label = 'Nouveau';
        break;
      case 'lu':
        color = 'primary';
        label = 'Lu';
        break;
      case 'en-traitement':
        color = 'warning';
        label = 'En traitement';
        break;
      case 'résolu':
        color = 'success';
        label = 'Résolu';
        break;
      default:
        color = 'default';
        label = status;
    }

    return <Chip size="small" color={color} label={label} />;
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const columns = [
    { field: 'name', headerName: 'Nom', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'subject', headerName: 'Sujet', flex: 1 },
    { 
      field: 'createdAt', 
      headerName: 'Date', 
      flex: 1,
      valueFormatter: (params) => formatDate(params.value)
    },
    { 
      field: 'status', 
      headerName: 'Statut', 
      flex: 0.8,
      renderCell: (params) => getStatusChip(params.value)
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
            onClick={() => handleOpenViewDialog(params.row)}
            aria-label="Voir"
          >
            <VisibilityIcon />
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
      <Typography variant="h4" gutterBottom>Gestion des messages</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
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
          <TextField
            select
            label="Statut"
            variant="outlined"
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: '200px' }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip 
            icon={<MailIcon />} 
            label={`Total: ${contacts.length}`} 
            variant="outlined" 
            color="primary" 
            sx={{ mr: 2 }}
          />
          <Chip 
            label={`Nouveaux: ${contacts.filter(c => c.status === 'nouveau').length}`} 
            color="info" 
          />
        </Box>
      </Box>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ height: 'calc(100vh - 250px)', width: '100%' }}>
          <DataGrid
            rows={filteredContacts}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </Paper>
      
      {/* Dialogue pour voir le message complet */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Message de {selectedContact?.name}</Typography>
            {selectedContact && getStatusChip(selectedContact.status)}
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedContact && (
            <Card variant="outlined" sx={{ mt: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Nom:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedContact.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedContact.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Entreprise:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedContact.companyName || 'Non spécifié'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {formatDate(selectedContact.createdAt)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Sujet:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedContact.subject}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Message:
                    </Typography>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        mt: 1,
                        backgroundColor: '#f9f9f9', 
                        minHeight: '120px' 
                      }}
                    >
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {selectedContact.message}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Box sx={{ mr: 'auto', p: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Changer le statut:</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                variant={selectedContact?.status === 'lu' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleUpdateStatus(selectedContact?.id, 'lu')}
              >
                Lu
              </Button>
              <Button 
                size="small" 
                variant={selectedContact?.status === 'en-traitement' ? 'contained' : 'outlined'}
                color="warning"
                onClick={() => handleUpdateStatus(selectedContact?.id, 'en-traitement')}
              >
                En traitement
              </Button>
              <Button 
                size="small" 
                variant={selectedContact?.status === 'résolu' ? 'contained' : 'outlined'}
                color="success"
                onClick={() => handleUpdateStatus(selectedContact?.id, 'résolu')}
              >
                Résolu
              </Button>
            </Box>
          </Box>
          <Button onClick={handleCloseViewDialog}>Fermer</Button>
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
            Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible.
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

export default ContactsManagement;