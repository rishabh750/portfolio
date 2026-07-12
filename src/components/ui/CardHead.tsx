import type { ReactNode } from 'react'

// Title + meta header shared by every content card that leads with a heading
// and a muted meta line (experience, projects). `title` is a node so callers
// can highlight parts of it (e.g. an accented company name).
interface CardHeadProps {
  title: ReactNode
  meta: ReactNode
}

export function CardHead({ title, meta }: CardHeadProps) {
  return (
    <div className="card-head">
      <h3 className="card-head__title">{title}</h3>
      <span className="card-head__meta">{meta}</span>
    </div>
  )
}
