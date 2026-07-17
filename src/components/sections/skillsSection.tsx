import type { SkillGroup } from '../../data/types'
import { ChipRow, Panel, leaf } from '../ui'
import type { TreeNode } from '../ui'

// Skills: one branch per category, each revealing a themed chip list.
// Leadership-style categories get the managerial theme; the rest, technical.
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
              <ChipRow items={group.items} kind={kind} />
            </Panel>
          </div>,
        ),
      }
    }),
  }
}
