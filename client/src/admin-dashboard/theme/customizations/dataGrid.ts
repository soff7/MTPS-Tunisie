import { paperClasses } from '@mui/material/Paper';
import { alpha, Theme } from '@mui/material/styles';
import { menuItemClasses } from '@mui/material/MenuItem';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { iconButtonClasses } from '@mui/material/IconButton';
import { checkboxClasses } from '@mui/material/Checkbox';
import { listClasses } from '@mui/material/List';
import { gridClasses } from '@mui/x-data-grid';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import { gray } from '../../../shared-theme/themePrimitives';

// غير تعيين النوع Components['MuiDataGrid']
export const dataGridCustomizations = {
  styleOverrides: {
    root: (props: { theme: Theme }) => {
      const theme = props.theme;
      return {
        '--DataGrid-overlayHeight': '300px',
        overflow: 'clip',
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.default,
        [`& .${gridClasses.columnHeader}`]: {
          backgroundColor: theme.palette.background.paper,
        },
        [`& .${gridClasses.footerContainer}`]: {
          backgroundColor: theme.palette.background.paper,
        },
        [`& .${checkboxClasses.root}`]: {
          padding: theme.spacing(0.5),
          '& > svg': {
            fontSize: '1rem',
          },
        },
        [`& .${tablePaginationClasses.root}`]: {
          marginRight: theme.spacing(1),
          '& .MuiIconButton-root': {
            maxHeight: 32,
            maxWidth: 32,
            '& > svg': {
              fontSize: '1rem',
            },
          },
        },
      };
    },
    cell: (props: { theme: Theme }) => {
      const theme = props.theme;
      return {
        borderTopColor: theme.palette.divider,
      };
    },
    menu: (props: { theme: Theme }) => {
      const theme = props.theme;
      return {
        borderRadius: theme.shape.borderRadius,
        backgroundImage: 'none',
        [`& .${paperClasses.root}`]: {
          border: `1px solid ${theme.palette.divider}`,
        },
        [`& .${menuItemClasses.root}`]: {
          margin: '0 4px',
        },
        [`& .${listItemIconClasses.root}`]: {
          marginRight: 0,
        },
        [`& .${listClasses.root}`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      };
    },
    row: (props: { theme: Theme }) => {
      const theme = props.theme;
      return {
        '&:last-of-type': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-selected': {
          background: theme.palette.action.selected,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      };
    },
    iconButtonContainer: (props: { theme: Theme }) => {
      const theme = props.theme;
      return {
        [`& .${iconButtonClasses.root}`]: {
          border: 'none',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
          '&:active': {
            backgroundColor: gray[200],
          },
          ...(theme.palette.mode === 'dark'
            ? {
                color: gray[50],
                '&:hover': {
                  backgroundColor: gray[800],
                },
                '&:active': {
                  backgroundColor: gray[900],
                },
              }
            : {}),
        },
      };
    },
    menuIconButton: (props: { theme: Theme }) => {
      const theme = props.theme;
      return {
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: gray[100],
        },
        '&:active': {
          backgroundColor: gray[200],
        },
        ...(theme.palette.mode === 'dark'
          ? {
              color: gray[50],
              '&:hover': {
                backgroundColor: gray[800],
              },
              '&:active': {
                backgroundColor: gray[900],
              },
            }
          : {}),
      };
    },
    filterForm: (props: { theme: Theme }) => {
      const theme = props.theme;
      return {
        gap: theme.spacing(1),
        alignItems: 'flex-end',
      };
    },
    columnsManagementHeader: (props: { theme: Theme }) => {
      const theme = props.theme;
      return {
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
      };
    },
    columnHeaderTitleContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    columnHeaderDraggableContainer: {
      paddingRight: 2,
    },
  },
};
