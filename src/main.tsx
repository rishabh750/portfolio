import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles'
import App from './App.tsx'
import { ResumeProvider } from './data/ResumeContext.tsx'
import { theme, fontFamily } from './theme.ts'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      {/* expose the theme font to the plain CSS as --font */}
      <GlobalStyles styles={{ ':root': { '--font': fontFamily } }} />
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </ThemeProvider>
  </StrictMode>,
)
