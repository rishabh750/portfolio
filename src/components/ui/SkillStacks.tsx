import type { SkillSet } from '../../data/types'
import { ChipRow } from './ChipRow'
import type { ChipKind } from './ChipRow'
import { Panel } from './Panel'

// A "Skills" panel with two colour-themed chip rows: technical first, then
// managerial on the next line. Shared by experience roles and academic
// projects. Renders nothing if no skills are provided.
interface SkillStacksProps {
  skills?: SkillSet
}

const ROWS: ChipKind[] = ['technical', 'managerial']

export function SkillStacks({ skills }: SkillStacksProps) {
  if (!skills) return null

  const rows = ROWS.map((kind) => [kind, skills[kind]] as const).filter(
    (r): r is [ChipKind, string[]] => !!r[1] && r[1].length > 0,
  )

  if (rows.length === 0) return null

  return (
    <Panel>
      <p className="panel__title">Skills</p>
      {rows.map(([kind, items]) => (
        <ChipRow key={kind} items={items} kind={kind} />
      ))}
    </Panel>
  )
}
