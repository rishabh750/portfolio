import type { Education } from '../../data/types'
import { leaf } from '../ui/TreeColumns'
import type { TreeNode } from '../ui/TreeColumns'

// Education: a single leaf stacking every degree.
export function educationSection(education: Education[]): TreeNode {
  return {
    title: 'Education',
    children: leaf(
      'Education',
      <div className="edu-stack">
        {education.map((e) => (
          <div key={e.degree} className="edu-entry">
            <h3 className="edu-entry__degree">{e.degree}</h3>
            <p className="edu-entry__institution">{e.institution}</p>
            <p className="edu-entry__location">{e.location}</p>
            <span className="edu-entry__dates">{e.dates}</span>
          </div>
        ))}
      </div>,
    ),
  }
}
