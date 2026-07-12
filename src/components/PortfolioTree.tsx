import { useResume } from '../data/ResumeContext'
import { TreeColumns } from './ui/TreeColumns'
import type { TreeNode } from './ui/TreeColumns'
import {
  aboutSection,
  skillsSection,
  experienceSection,
  projectsSection,
  educationSection,
  awardsSection,
} from './sections'

// Assembles each section builder into one nested tree, rendered as Miller
// columns that expand left -> right on hover. Adding a section = one import
// plus one line here.
export function PortfolioTree() {
  const { profile, skills, experience, projects, education, awards } = useResume()

  const sections: TreeNode[] = [
    aboutSection(profile),
    skillsSection(skills),
    experienceSection(experience),
    projectsSection(projects),
    educationSection(education),
    awardsSection(awards),
  ]

  return (
    <div className="portfolio-tree">
      <TreeColumns nodes={sections} ariaLabel="Portfolio" />
    </div>
  )
}
