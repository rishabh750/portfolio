import MuiCard from '@mui/material/Card'
import { styled } from '@mui/material/styles'

// Override of MUI's <Card>. No side borders — only a top and bottom rule that
// fades out toward the left/right edges (via a horizontal gradient). The line
// colour is driven by the `--card-line` custom property so hover/active states
// can recolour it without a specificity fight.
export const Card = styled(MuiCard)({
  position: 'relative',
  backgroundColor: 'var(--bg-elev)',
  color: 'var(--text)',
  border: 'none',
  borderRadius: 12,
  backgroundImage: 'none',
  boxShadow: 'none',
  transition: 'background-color 0.15s ease',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    height: '1px',
    pointerEvents: 'none',
    background:
      'linear-gradient(to right, transparent, var(--card-line, var(--border)) 14%, var(--card-line, var(--border)) 86%, transparent)',
  },
  '&::before': { top: 0 },
  '&::after': { bottom: 0 },
})
