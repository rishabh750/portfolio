import type { SkillGroup } from '../../data/types'
import { leaf } from '../ui/TreeColumns'
import type { TreeNode } from '../ui/TreeColumns'

// Skills: one branch per category, each revealing a chip list.
export function skillsSection(skills: SkillGroup[]): TreeNode {
  return {
    title: 'Skills',
    children: skills.map((group) => ({
      title: group.category,
      children: leaf(
        group.category,
        <>
          <h3 className="skills__category">{group.category}</h3>
          <ul className="chip-row">
            {group.items.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </>,
      ),
    })),
  }
}
