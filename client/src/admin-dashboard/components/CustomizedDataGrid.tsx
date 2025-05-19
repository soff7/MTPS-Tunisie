import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from '../internals/data/gridData';

export default function CustomizedDataGrid() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        density="compact"
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
