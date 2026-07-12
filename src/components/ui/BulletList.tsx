// Renders a mix of bullet and plain-text lines. A line is drawn as an accent
// bullet only if it starts with BULLET_PREFIX (controlled from data.json);
// otherwise it renders as a plain context line in the same font, no marker.
// Remove the prefix from a line in the data and it stops being a bullet.
const BULLET_PREFIX = '- '

interface BulletListProps {
  items: string[]
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="bullet-list">
      {items.map((item, i) => {
        const isBullet = item.startsWith(BULLET_PREFIX)
        return (
          <li key={i} className={isBullet ? 'bullet-list__bullet' : 'bullet-list__text'}>
            {isBullet ? item.slice(BULLET_PREFIX.length) : item}
          </li>
        )
      })}
    </ul>
  )
}
