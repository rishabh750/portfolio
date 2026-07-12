import { leaf } from '../ui/TreeColumns'
import type { TreeNode } from '../ui/TreeColumns'

// Awards: a single leaf listing every award.
export function awardsSection(awards: string[]): TreeNode {
  return {
    title: 'Awards',
    children: leaf(
      'Awards',
      <ul className="awards-stack">
        {awards.map((a) => (
          <li key={a} className="awards__row">
            <span className="awards__icon" aria-hidden="true">
              ★
            </span>
            <span>{a}</span>
          </li>
        ))}
      </ul>,
    ),
  }
}
