// A wrapping row of skill chips. An optional `kind` applies the technical
// (orange) or managerial (yellow-gold) colour theme; omit it for neutral chips.
export type ChipKind = 'technical' | 'managerial'

interface ChipRowProps {
  items: string[]
  kind?: ChipKind
}

export function ChipRow({ items, kind }: ChipRowProps) {
  return (
    <ul className="chip-row">
      {items.map((item) => (
        <li key={item} className={kind ? `chip chip--${kind}` : 'chip'}>
          {item}
        </li>
      ))}
    </ul>
  )
}
