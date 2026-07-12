import type { SkillGroup } from '../../data/types'
import { Panel } from '../ui/Panel'
import { leaf } from '../ui/TreeColumns'
import type { TreeNode } from '../ui/TreeColumns'

// Skills: one branch per category, each revealing a chip list.
export function skillsSection(skills: SkillGroup[]): TreeNode {
  return {
    title: 'Skills',
    children: skills.map((group) => {
      const kind = /leader|manage|collab/i.test(group.category) ? 'managerial' : 'technical'
      return {
        title: group.category,
        children: leaf(
          group.category,
          <div className="leaf-body">
            <Panel>
              <h3 className="skills__category">{group.category}</h3>
              <ul className="chip-row">
                {group.items.map((item) => (
                  <li key={item} className={`chip chip--${kind}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>,
        ),
      }
    }),
  }
}
