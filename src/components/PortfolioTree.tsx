import { useMemo } from 'react'
import { useResume } from '../data/ResumeContext'
import { TreeColumns } from './ui'
import type { TreeNode } from './ui'
import {
  aboutSection,
  skillsSection,
  experienceSection,
  projectsSection,
  educationSection,
  awardsSection,
} from './sections'

// Assembles each section builder into one nested tree, rendered by TreeColumns
// (Miller columns on desktop, swipe carousel on mobile). Adding a section = one
// import plus one line here. Memoised so node references stay stable across
// renders (the mobile carousel relies on that to avoid re-centring on swipe).
export function PortfolioTree() {
  const { profile, skills, experience, projects, education, awards } = useResume()

  const sections = useMemo<TreeNode[]>(
    () => [
      aboutSection(profile),
      skillsSection(skills),
      experienceSection(experience),
      projectsSection(projects),
      educationSection(education),
      awardsSection(awards),
    ],
    [profile, skills, experience, projects, education, awards],
  )

  return (
    <div className="portfolio-tree">
      <TreeColumns nodes={sections} ariaLabel="Portfolio" />
    </div>
  )
}
