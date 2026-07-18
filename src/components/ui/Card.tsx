import type { HTMLAttributes } from 'react'

// A content/branch card. No side borders — only a top and bottom rule that
// fades toward the left/right edges (see `.card` in styles/tree.css). Its
// background and line colour are driven by the `--card-bg` / `--card-line`
// custom properties so callers theme it via variables, not overrides.
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`card${className ? ` ${className}` : ''}`} {...props} />
}
