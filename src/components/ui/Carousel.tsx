import { useEffect, useRef } from 'react'
import type { TreeNode } from './TreeColumns'

interface CarouselProps {
  items: TreeNode[]
  active: number
  onSelect: (index: number) => void
}

// Horizontal swipe carousel built on native CSS scroll-snap. The card snapped
// to the centre is the active one; swiping to a new card reports it via
// onSelect (which drives the content shown below). Tapping a peeking card
// smooth-scrolls it to the centre. The active card is only re-centred
// programmatically when the item set itself changes, never on the user's swipe.
export function Carousel({ items, active, onSelect }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const raf = useRef(0)

  useEffect(() => {
    centre(trackRef.current, active, 'auto')
    // re-centre only when the items change (parent selection / first mount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  function handleScroll() {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const i = nearestToCentre(trackRef.current)
      if (i >= 0 && i !== active) onSelect(i)
    })
  }

  return (
    <div className="carousel" role="group">
      <div className="carousel__track" ref={trackRef} onScroll={handleScroll}>
        {items.map((node, i) => (
          <button
            key={i}
            type="button"
            className={`carousel__card${i === active ? ' carousel__card--active' : ''}`}
            aria-current={i === active}
            onClick={() => centre(trackRef.current, i, 'smooth')}
          >
            <span className="carousel__title">{node.title}</span>
            {node.subtitle && <span className="carousel__subtitle">{node.subtitle}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

/** Index of the card whose centre is closest to the track's centre. */
function nearestToCentre(track: HTMLDivElement | null): number {
  if (!track) return -1
  const mid = track.scrollLeft + track.clientWidth / 2
  let best = Infinity
  let index = -1
  Array.from(track.children).forEach((child, i) => {
    const el = child as HTMLElement
    const cardCentre = el.offsetLeft + el.clientWidth / 2
    const distance = Math.abs(cardCentre - mid)
    if (distance < best) {
      best = distance
      index = i
    }
  })
  return index
}

/** Scroll a card to the centre of the track. */
function centre(track: HTMLDivElement | null, index: number, behavior: ScrollBehavior) {
  const card = track?.children[index] as HTMLElement | undefined
  if (!track || !card) return
  track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior })
}
