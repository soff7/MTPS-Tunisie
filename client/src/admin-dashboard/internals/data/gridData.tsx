'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

// دوال مساعدة للعرض داخل الـ DataGrid
function renderStatus(params: GridRenderCellParams) {
  const status = params.value as 'Online' | 'Offline';
  const color = status === 'Online' ? 'success' : 'default';
  return <Chip label={status} color={color} size="small" />;
}

function renderAvatar(params: GridRenderCellParams) {
  const value = params.value as { name: string; color: string };
  if (!value) return null;

  return (
    <Avatar
      sx={{
        backgroundColor: value.color,
        width: 24,
        height: 24,
        fontSize: '0.85rem',
      }}
    >
      {value.name.toUpperCase().charAt(0)}
    </Avatar>
  );
}

// تعريف أعمدة الجدول مع custom rendering
export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
    renderCell: (params: GridRenderCellParams) => (
      <Stack direction="row" spacing={2} alignItems="center">
        {renderAvatar(params)}
        <Typography variant="body2" fontWeight={500}>
          {params.value?.name || ''}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell: (params: GridRenderCellParams) => renderStatus(params),
  },
  {
    field: 'spent',
    headerName: 'Spent',
    width: 100,
  },
  {
    field: 'conversion',
    headerName: 'Conversion',
    width: 140,
    renderCell: (params: GridRenderCellParams) => (
      <Typography fontWeight={500}>{params.value}%</Typography>
    ),
  },
  {
    field: 'trend',
    headerName: 'Trend',
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <SparkLineChart
        data={params.value}
        width={100}
        height={40}
        showHighlight
        showTooltip
        colors={['#6366f1']}
        xAxis={{
          scaleType: 'band',
          data: Array(params.value.length).fill(''),
        }}
      />
    ),
  },
];

// بيانات الصفوف مع التفاصيل
export const rows = [
  {
    id: 1,
    name: { name: 'John Doe', color: '#8884d8' },
    status: 'Online',
    spent: '$2,000',
    conversion: 25,
    trend: [5, 10, 5, 20, 8, 15],
  },
  {
    id: 2,
    name: { name: 'Jane Smith', color: '#82ca9d' },
    status: 'Offline',
    spent: '$1,500',
    conversion: 30,
    trend: [3, 5, 2, 10, 5, 8],
  },
  {
    id: 3,
    name: { name: 'Alice Johnson', color: '#ffc658' },
    status: 'Online',
    spent: '$3,200',
    conversion: 20,
    trend: [10, 15, 10, 25, 18, 22],
  },
  {
    id: 4,
    name: { name: 'Bob Brown', color: '#ff7300' },
    status: 'Offline',
    spent: '$980',
    conversion: 18,
    trend: [2, 3, 1, 5, 2, 4],
  },
  {
    id: 5,
    name: { name: 'Charlie Green', color: '#00c49f' },
    status: 'Online',
    spent: '$2,750',
    conversion: 28,
    trend: [6, 9, 7, 14, 11, 13],
  },
];
