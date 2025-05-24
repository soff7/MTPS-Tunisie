// client/src/admin-dashboard/pages/UsersPage.js
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Chip, IconButton, Avatar, Grid
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Données simulées
  const mockUsers = [
    { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'user', status: 'active' },
    { id: 2, name: 'Marie Martin', email: 'marie@example.com', role: 'admin', status: 'active' },
    { id: 3, name: 'Pierre Durant', email: 'pierre@example.com', role: 'user', status: 'inactive' }
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gestion des utilisateurs</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Ajouter utilisateur
        </Button>
      </Box>

      {/* Barre de recherche */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Rechercher un utilisateur..."
            variant="outlined"
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Tableau des utilisateurs */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      color={user.role === 'admin' ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status} 
                      color={user.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Dialog d'ajout/modification */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter un utilisateur</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nom" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Prénom" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Mot de passe" type="password" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button variant="contained">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}