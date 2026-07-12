import { createTheme } from '@mui/material/styles'

// Minimal MUI theme. Surfaces (Card, buttons) are styled with the project's
// own CSS variables (see index.css) so they follow the existing
// prefers-color-scheme light/dark system automatically.
export const theme = createTheme({
  typography: {
    fontFamily: 'inherit',
  },
  palette: {
    primary: { main: '#ff9e2c' },
  },
  shape: { borderRadius: 14 },
})
