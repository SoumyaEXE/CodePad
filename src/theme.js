import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#F9FAFB',
              paper: '#FFFFFF',
            },
            text: {
              primary: '#111827',
              secondary: '#6B7280',
            },
            primary: {
              main: '#4F46E5',
              dark: '#4338CA',
            },
            success: {
              main: '#16A34A',
            },
            divider: '#E5E7EB',
          }
        : {
            background: {
              default: '#0F1117',
              paper: '#1A1D27',
            },
            text: {
              primary: '#F3F4F6',
              secondary: '#9CA3AF',
            },
            primary: {
              main: '#6366F1',
              dark: '#818CF8',
            },
            success: {
              main: '#22C55E',
            },
            divider: '#2D2F3E',
          }),
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      button: {
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 6,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
