import { Theme } from '@mui/material/styles';
import { axisClasses, legendClasses } from '@mui/x-charts';
import type { ChartsComponents } from '@mui/x-charts/themeAugmentation';
import { gray } from '../../../shared-theme/themePrimitives';

export const chartsCustomizations: ChartsComponents = {
  MuiChartsAxis: {
    styleOverrides: {
      root: (props) => {
        const theme = props.theme as Theme;
        return {
          [`& .${axisClasses.line}`]: {
            stroke: gray[300],
          },
          [`& .${axisClasses.tick}`]: {
            stroke: gray[300],
          },
          [`& .${axisClasses.tickLabel}`]: {
            fill: gray[500],
            fontWeight: 500,
          },
          ...(theme.applyStyles?.('dark', {
            [`& .${axisClasses.line}`]: {
              stroke: gray[700],
            },
            [`& .${axisClasses.tick}`]: {
              stroke: gray[700],
            },
            [`& .${axisClasses.tickLabel}`]: {
              fill: gray[300],
              fontWeight: 500,
            },
          }) ?? {}),
        };
      },
    },
  },
  MuiChartsTooltip: {
    styleOverrides: {
      mark: (props) => {
        const theme = props.theme as Theme;
        return {
          ry: 6,
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
        };
      },
      table: (props) => {
        const theme = props.theme as Theme;
        return {
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          background: 'hsl(0, 0%, 100%)',
          ...(theme.applyStyles?.('dark', {
            background: gray[900],
          }) ?? {}),
        };
      },
    },
  },
  MuiChartsLegend: {
    styleOverrides: {
      root: {
        [`& .${legendClasses.mark}`]: {
          ry: 6,
        },
      },
    },
  },
};
