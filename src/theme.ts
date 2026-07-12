import { createTheme } from '@mui/material/styles'

// Single source of truth for typography. `fontFamily` is fed to MUI here and
// also exposed to the plain CSS as the `--font` variable (see main.tsx), so the
// whole app shares one font definition maintained in this file.
export const fontFamily =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

export const theme = createTheme({
  typography: {
    fontFamily,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: { main: '#f07d28' },
  },
  shape: { borderRadius: 14 },
})
