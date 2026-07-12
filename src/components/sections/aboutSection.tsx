import type { Profile } from '../../data/types'
import { leaf } from '../ui/TreeColumns'
import type { TreeNode } from '../ui/TreeColumns'

// About: availability pill, contact links, summary and highlights.
export function aboutSection(profile: Profile): TreeNode {
  const { links } = profile
  return {
    title: 'About',
    children: leaf(
      'About',
      <>
        <p className="pill">
          <span className="pill__dot" aria-hidden="true" />
          {profile.availability}
        </p>

        <ul className="link-list">
          <li>
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </li>
          <li>
            <a href={`tel:${links.phone.replace(/\s/g, '')}`}>{links.phone}</a>
          </li>
        </ul>

        <p className="about-summary">{profile.summary}</p>

        {profile.highlights.length > 0 && (
          <ul className="about-highlights">
            {profile.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </>,
      'about-leaf',
    ),
  }
}
