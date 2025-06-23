// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `'Space Grotesk', sans-serif`,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#00f2fe',
    },
    secondary: {
      main: '#4facfe',
    },
  },
});

export default theme;
