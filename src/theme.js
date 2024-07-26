import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#1E90FF',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      color: '#2d3748',
    },
    h6: {
      fontWeight: 500,
      color: '#4a5568',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

export default theme;