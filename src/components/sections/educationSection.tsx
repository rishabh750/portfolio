import type { Education } from '../../data/types'
import { Panel, leaf } from '../ui'
import type { TreeNode } from '../ui'

// Education: a single leaf with one panel per degree.
export function educationSection(education: Education[]): TreeNode {
  return {
    title: 'Education',
    children: leaf(
      'Education',
      <div className="leaf-body">
        {education.map((e) => (
          <Panel key={e.degree}>
            <h3 className="edu-entry__degree">{e.degree}</h3>
            <p className="edu-entry__institution">{e.institution}</p>
            <p className="edu-entry__location">{e.location}</p>
            <span className="edu-entry__dates">{e.dates}</span>
          </Panel>
        ))}
      </div>,
    ),
  }
}
