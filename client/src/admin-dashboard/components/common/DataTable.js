import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, Paper, Checkbox, IconButton,
  Toolbar, Typography, Tooltip, Box
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

export default function DataTable({
  columns,
  data,
  title,
  onEdit,
  onDelete,
  onView,
  selectable = false,
  actions = true
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      {title && (
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
            {title}
          </Typography>
          {selected.length > 0 && (
            <Tooltip title="Supprimer">
              <IconButton>
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      )}
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {column.label}
                </TableCell>
              ))}
              {actions && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    key={row.id}
                    selected={isItemSelected}
                    onClick={selectable ? (event) => handleClick(event, row.id) : undefined}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {column.render ? column.render(row[column.id], row) : row[column.id]}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell align="right">
                        <Box display="flex" justifyContent="flex-end" gap={1}>
                          {onView && (
                            <Tooltip title="Voir">
                              <IconButton size="small" onClick={() => onView(row)}>
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                          )}
                          {onEdit && (
                            <Tooltip title="Modifier">
                              <IconButton size="small" onClick={() => onEdit(row)}>
                                <Edit />
                              </IconButton>
                            </Tooltip>
                          )}
                          {onDelete && (
                            <Tooltip title="Supprimer">
                              <IconButton size="small" color="error" onClick={() => onDelete(row)}>
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page:"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} sur ${count !== -1 ? count : `plus de ${to}`}`
        }
      />
    </Paper>
  );
}