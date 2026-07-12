// Shared types for the parsed resume data (loaded from public/resume.txt).

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
  /** skills used in this role, split into technical and managerial chip stacks */
  skills?: {
    technical?: string[]
    managerial?: string[]
  }
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
  /** skills used in this project, split into technical and managerial chip stacks */
  skills?: {
    technical?: string[]
    managerial?: string[]
  }
}

export interface Resume {
  profile: Profile
  skills: SkillGroup[]
  experience: Experience[]
  education: Education[]
  awards: string[]
  projects: Project[]
}
