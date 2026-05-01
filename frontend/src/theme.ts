import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1565c0' },
    secondary: { main: '#43a047' },
  },
  typography: {
    fontFamily: '"Noto Sans JP", "Helvetica Neue", Arial, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
