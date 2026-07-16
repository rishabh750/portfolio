import { useEffect, useState } from 'react'

// Tracks whether the viewport is at or below a breakpoint (default 720px).
// Used to switch the tree between desktop Miller columns and the mobile carousel.
export function useIsMobile(breakpoint = 720): boolean {
  const query = `(max-width: ${breakpoint}px)`
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}
