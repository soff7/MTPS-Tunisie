// src/constants/theme.js
import { colors } from './colors';

export const theme = {
  colors,
  fonts: {
    main: '"Roboto", sans-serif',         // Texte standard
    headings: '"Montserrat", sans-serif', // Titres forts
    arabic: '"Tajawal", sans-serif'       // Support arabe
  },
  spacing: {
    xxs: '0.25rem', xs: '0.5rem', sm: '0.75rem',
    md: '1rem', lg: '1.5rem', xl: '2rem',
    xxl: '3rem', xxxl: '4rem'
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 20px rgba(0,0,0,0.1)',
    lg: '0 10px 30px rgba(0,86,179,0.2)'
  },
  radii: {
    sm: '4px', md: '8px', lg: '12px',
    pill: '50px', circle: '50%'
  },
  breakpoints: ['576px', '768px', '992px', '1200px']
};