// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e90ff',
    },
    secondary: {
      main: '#00C49F',
    },
    background: {
      paper: '#F7F9FC',
    },
  },
  typography: {
    h4: {
      fontWeight: 'bold',
      color: '#1e90ff',
    },
    h6: {
      fontWeight: 'bold',
      color: '#1e90ff',
    },
  },
});

export default theme;