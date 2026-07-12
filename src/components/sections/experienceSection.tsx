import type { Experience } from '../../data/types'
import { BulletList } from '../ui/BulletList'
import { CardHead } from '../ui/CardHead'
import { leaf } from '../ui/TreeColumns'
import type { TreeNode } from '../ui/TreeColumns'

// Experience: one branch per role, revealing a card of grouped bullets.
export function experienceSection(experience: Experience[]): TreeNode {
  return {
    title: 'Experience',
    children: experience.map((job, idx) => ({
      title: `${job.role} · ${job.company}`,
      children: leaf(
        `${job.company}-${idx}`,
        <>
          <CardHead
            title={
              <>
                {job.role} <span className="card-head__sep">·</span>{' '}
                <span className="card-accent">{job.company}</span>
              </>
            }
            meta={`${job.dates} · ${job.location}`}
          />
          {job.groups.map((group, gi) => (
            <div key={gi} className="exp-group">
              {group.title && <p className="exp-group__title">{group.title}</p>}
              <BulletList items={group.bullets} />
            </div>
          ))}
        </>,
      ),
    })),
  }
}
