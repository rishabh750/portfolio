import { useMemo } from 'react'

/** Region codes we tailor contact details for. Extend as needed. */
export type RegionCode = 'IN' | 'GB'

/**
 * Infer the visitor's region from their browser timezone — no permission
 * prompt, no network call, resolved synchronously on first render.
 *
 * India (Asia/Kolkata) → 'IN'; everyone else falls back to 'GB'. This is a
 * best-effort heuristic: a visitor whose device clock is set to IST will read
 * as 'IN' regardless of where they physically are.
 */
export function useRegion(): RegionCode {
  return useMemo(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'IN'
    } catch {
      /* Intl unavailable — fall through to the default */
    }
    return 'GB'
  }, [])
}
