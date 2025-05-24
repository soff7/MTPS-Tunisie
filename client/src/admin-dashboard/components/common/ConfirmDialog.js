import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box
} from '@mui/material';
import { Warning } from '@mui/icons-material';

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirmer l\'action',
  message = 'Êtes-vous sûr de vouloir continuer ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  severity = 'warning'
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Warning color={severity} />
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {cancelText}
        </Button>
        <Button 
          onClick={() => {
            onConfirm();
            onClose();
          }} 
          color={severity}
          variant="contained"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}