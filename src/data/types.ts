// Shared types for the resume data (loaded from public/data.json).

/** Skills split into technical and managerial chip stacks. */
export interface SkillSet {
  technical?: string[]
  managerial?: string[]
}

export interface Profile {
  name: string
  title: string
  location: string
  availability: string
  summary: string
  highlights: string[]
  links: {
    email: string
    phone: string
    linkedin: string
    github: string
  }
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Experience {
  company: string
  role: string
  dates: string
  location: string
  /** "Key Project Deliverables" bullets */
  deliverables: string[]
  /** "Key Org-Level Impact" bullets */
  impact: string[]
  /** skills used in this role */
  skills?: SkillSet
}

export interface Education {
  degree: string
  institution: string
  location: string
  dates: string
}

export interface Project {
  name: string
  org: string
  dates: string
  bullets: string[]
  /** skills used in this project */
  skills?: SkillSet
}

export interface Resume {
  profile: Profile
  skills: SkillGroup[]
  experience: Experience[]
  education: Education[]
  awards: string[]
  projects: Project[]
}
