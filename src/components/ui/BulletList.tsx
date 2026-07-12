// Generic accent-bulleted list. Reused anywhere a card needs a list of points
// (experience groups, project bullets). Styling lives in `.bullet-list`.
interface BulletListProps {
  items: string[]
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="bullet-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
