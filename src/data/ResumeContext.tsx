import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { Resume } from './types'

const ResumeContext = createContext<Resume | null>(null)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, setResume] = useState<Resume | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load data.json (HTTP ${r.status})`)
        return r.json() as Promise<Resume>
      })
      .then((data) => setResume(data))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [])

  if (error) {
    return (
      <div className="loading">
        <p>Could not load content.</p>
        <code>{error}</code>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className="loading">
        <span className="loading__spinner" aria-hidden="true" />
      </div>
    )
  }

  return <ResumeContext.Provider value={resume}>{children}</ResumeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useResume(): Resume {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within a ResumeProvider')
  return ctx
}
