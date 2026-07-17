import type { Profile } from '../../data/types'
import { BulletList, ContactChips, Panel, leaf } from '../ui'
import type { TreeNode } from '../ui'

// About: availability pill, contact chips, summary and highlights.
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

          <ContactChips
            email={links.email}
            phone={links.phone}
            linkedin={links.linkedin}
            portfolio={links.github}
          />
        </Panel>

        <Panel>
          <BulletList items={[profile.summary, ...profile.highlights]} />
        </Panel>
      </div>,
      'about-leaf',
    ),
  }
}
