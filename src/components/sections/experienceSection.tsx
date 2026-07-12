import type { Experience } from '../../data/types'
import { BulletList } from '../ui/BulletList'
import { CardHead } from '../ui/CardHead'
import { Panel } from '../ui/Panel'
import { SkillStacks } from '../ui/SkillStacks'
import { leaf } from '../ui/TreeColumns'
import type { TreeNode } from '../ui/TreeColumns'

// Experience: one branch per role (role over company), revealing a card whose
// header floats over one opaque panel per group plus a skills panel.
export function experienceSection(experience: Experience[]): TreeNode {
  return {
    title: 'Experience',
    children: experience.map((job, idx) => ({
      title: job.role,
      subtitle: job.company,
      children: leaf(
        `${job.company}-${idx}`,
        <div className="leaf-body">
          <CardHead
            title={
              <>
                {job.role} <span className="card-head__sep">·</span>{' '}
                <span className="card-accent">{job.company}</span>
              </>
            }
            meta={`${job.dates} · ${job.location}`}
          />
          {job.deliverables.length > 0 && (
            <Panel>
              <p className="panel__title">Key Project Deliverables</p>
              <BulletList items={job.deliverables} />
            </Panel>
          )}
          {job.impact.length > 0 && (
            <Panel>
              <p className="panel__title">Key Org-Level Impact</p>
              <BulletList items={job.impact} />
            </Panel>
          )}
          <SkillStacks skills={job.skills} />
        </div>,
      ),
    })),
  }
}
