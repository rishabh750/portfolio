import type { ReactNode } from 'react'

// An opaque "main content" card. These sit inside the translucent leaf group
// card — one Panel per section block, so each block reads as its own card.
export function Panel({ children }: { children: ReactNode }) {
  return <div className="panel">{children}</div>
}
