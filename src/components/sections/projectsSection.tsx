import type { Project } from '../../data/types'
import { BulletList, CardHead, Panel, SkillStacks, leaf } from '../ui'
import type { TreeNode } from '../ui'

// Projects: one branch per project, revealing a card whose header floats over
// an opaque bullets panel plus a skills panel.
export function projectsSection(projects: Project[]): TreeNode {
  return {
    title: 'Projects',
    children: projects.map((p) => ({
      title: p.name,
      children: leaf(
        p.name,
        <div className="leaf-body">
          <CardHead title={p.name} meta={`${p.org} · ${p.dates}`} />
          <Panel>
            <BulletList items={p.bullets} />
          </Panel>
          <SkillStacks skills={p.skills} />
        </div>,
      ),
    })),
  }
}
