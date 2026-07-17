import type { ReactNode } from 'react'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'

interface ContactChipsProps {
  email: string
  phone: string
  linkedin: string
  portfolio: string
}

interface Contact {
  label: string
  href: string
  icon: ReactNode
  external?: boolean
}

// Row of contact chips (email, LinkedIn, mobile, portfolio), each an icon plus
// a label. On mobile the label is hidden via CSS, leaving an icon-only chip.
export function ContactChips({ email, phone, linkedin, portfolio }: ContactChipsProps) {
  const contacts: Contact[] = [
    { label: 'Email', href: `mailto:${email}`, icon: <EmailRoundedIcon /> },
    { label: 'LinkedIn', href: linkedin, icon: <LinkedInIcon />, external: true },
    { label: 'Mobile', href: `tel:${phone.replace(/\s/g, '')}`, icon: <PhoneRoundedIcon /> },
    { label: 'Portfolio', href: portfolio, icon: <LanguageRoundedIcon />, external: true },
  ]

  return (
    <div className="contact-chips">
      {contacts.map((c) => (
        <a
          key={c.label}
          className="contact-chip"
          href={c.href}
          aria-label={c.label}
          {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          <span className="contact-chip__icon">{c.icon}</span>
          <span className="contact-chip__label">{c.label}</span>
        </a>
      ))}
    </div>
  )
}
