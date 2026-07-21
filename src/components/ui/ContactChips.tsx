import type { ReactNode } from 'react'
import { EmailIcon, LinkedInIcon, PhoneIcon, GlobeIcon } from './icons'
import { useRegion } from '../../hooks/useRegion'

interface ContactChipsProps {
  email: string
  /** Region-keyed phone numbers; the visitor's region selects which shows. */
  phone: Record<string, string>
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
  const region = useRegion()
  const number = phone[region] ?? phone.GB ?? Object.values(phone)[0] ?? ''

  const contacts: Contact[] = [
    { label: 'Email', href: `mailto:${email}`, icon: <EmailIcon /> },
    { label: 'LinkedIn', href: linkedin, icon: <LinkedInIcon />, external: true },
    { label: 'Mobile', href: `tel:${number.replace(/\s/g, '')}`, icon: <PhoneIcon /> },
    { label: 'Portfolio', href: portfolio, icon: <GlobeIcon />, external: true },
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
