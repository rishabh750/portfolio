import { Panel } from './Panel'

// A "Skills" panel with two colour-themed chip rows: technical first, then
// managerial on the next line. Shared by experience roles and academic
// projects. Renders nothing if no skills are provided.
interface SkillStacksProps {
  skills?: {
    technical?: string[]
    managerial?: string[]
  }
}

export function SkillStacks({ skills }: SkillStacksProps) {
  if (!skills) return null

  const rows = [
    ['technical', skills.technical],
    ['managerial', skills.managerial],
  ] as const

  if (!rows.some(([, items]) => items && items.length > 0)) return null

  return (
    <Panel>
      <p className="panel__title">Skills</p>
      {rows.map(([kind, items]) =>
        items && items.length > 0 ? (
          <ul key={kind} className="chip-row">
            {items.map((s) => (
              <li key={s} className={`chip chip--${kind}`}>
                {s}
              </li>
            ))}
          </ul>
        ) : null,
      )}
    </Panel>
  )
}
