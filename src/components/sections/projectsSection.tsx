import type { Project } from '../../data/types'
import { BulletList } from '../ui/BulletList'
import { CardHead } from '../ui/CardHead'
import { leaf } from '../ui/TreeColumns'
import type { TreeNode } from '../ui/TreeColumns'

// Projects: one branch per project, revealing a card of bullets.
export function projectsSection(projects: Project[]): TreeNode {
  return {
    title: 'Projects',
    children: projects.map((p) => ({
      title: p.name,
      children: leaf(
        p.name,
        <>
          <CardHead title={p.name} meta={`${p.org} · ${p.dates}`} />
          <BulletList items={p.bullets} />
        </>,
      ),
    })),
  }
}
