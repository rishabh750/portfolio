import { Panel } from '../ui/Panel'
import { leaf } from '../ui/TreeColumns'
import type { TreeNode } from '../ui/TreeColumns'

// Awards: a single leaf with one panel per award.
export function awardsSection(awards: string[]): TreeNode {
  return {
    title: 'Awards',
    children: leaf(
      'Awards',
      <div className="leaf-body">
        {awards.map((a) => (
          <Panel key={a}>
            <div className="awards__row">
              <span className="awards__icon" aria-hidden="true">
                ★
              </span>
              <span>{a}</span>
            </div>
          </Panel>
        ))}
      </div>,
    ),
  }
}
