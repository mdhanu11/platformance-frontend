// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#05CD99',
    },
    secondary: {
      main: '#00C49F',
    },
    background: {
      paper: '#F7F9FC',
    },
  },
  typography: {
    h5: {
      fontWeight: 'bold',
      color: '#05CD99',
    },
    h4: {
      fontWeight: 'bold',
      color: '#05CD99',
    },
    h6: {
      fontWeight: 'bold',
      color: '#05CD99',
    },
    typography: {
      fontFamily: 'DM Sans, Arial, sans-serif', // Update to your desired font family
    },
  },
});

export default theme;