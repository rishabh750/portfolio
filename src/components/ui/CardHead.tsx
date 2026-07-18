import type { ReactNode } from 'react'
import { GlobeIcon } from './icons'

// Title + meta header shared by every content card that leads with a heading
// and a muted meta line (experience, projects). `title` is a node so callers
// can highlight parts of it (e.g. an accented company name). When `link` is
// defined, a full-width chip below the title shows a web icon plus `linkLabel`
// (a placeholder, not the raw URL): clickable and opening a new tab when the
// URL is non-empty, inert when it is an empty string.
interface CardHeadProps {
  title: ReactNode
  meta: ReactNode
  link?: string
  linkLabel?: string
}

export function CardHead({ title, meta, link, linkLabel }: CardHeadProps) {
  return (
    <>
      <div className="card-head">
        <h3 className="card-head__title">{title}</h3>
        <span className="card-head__meta">{meta}</span>
      </div>
      {link !== undefined &&
        (link ? (
          <a className="link-chip" href={link} target="_blank" rel="noreferrer">
            <GlobeIcon className="link-chip__icon" />
            <span>{linkLabel || 'Visit'}</span>
          </a>
        ) : (
          <span className="link-chip link-chip--empty" aria-disabled="true">
            <GlobeIcon className="link-chip__icon" />
            <span>{linkLabel || '—'}</span>
          </span>
        ))}
    </>
  )
}
