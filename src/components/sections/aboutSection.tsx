import type { Profile } from '../../data/types'
import { BulletList, Panel, leaf } from '../ui'
import type { TreeNode } from '../ui'

// About: availability pill, contact links, summary and highlights.
export function aboutSection(profile: Profile): TreeNode {
  const { links } = profile
  return {
    title: 'About',
    children: leaf(
      'About',
      <div className="leaf-body">
        <Panel>
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
        </Panel>

        <Panel>
          <BulletList items={[profile.summary, ...profile.highlights]} />
        </Panel>
      </div>,
      'about-leaf',
    ),
  }
}
