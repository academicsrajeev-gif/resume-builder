export const emptyResume = {
  personal: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
  },
  experience: [],
  projects: [],
  architecture: [],
  opensource: [],
  infrastructure: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
  financials: [],
  strategy: [],
  caseCompetitions: [],
  leadership: [],
}

let idCounter = 0
export const nextId = () => `item-${Date.now().toString(36)}-${idCounter++}`

export function mergeResume(base, extra) {
  const out = { ...base }
  for (const key of Object.keys(extra)) {
    if (Array.isArray(base[key])) {
      out[key] = Array.isArray(extra[key]) ? extra[key] : []
    } else if (base[key] && typeof base[key] === 'object') {
      out[key] = { ...base[key], ...(extra[key] || {}) }
    } else {
      out[key] = extra[key]
    }
  }
  return out
}

export const sampleResume = {
  personal: {
    fullName: 'Alex Johnson',
    title: 'Senior Frontend Engineer',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    summary:
      'Frontend engineer with 7+ years of experience building fast, accessible web applications. Passionate about design systems, performance optimization, and mentoring junior developers. Led teams that shipped products used by millions of people.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Acme Corp',
      position: 'Senior Frontend Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description:
        'Led the migration of a legacy codebase to React and TypeScript, cutting page load time by 45%.\nBuilt a reusable component library adopted by 4 product teams.\nMentored 3 junior engineers who were promoted within 18 months.',
    },
    {
      id: 'exp-2',
      company: 'Globex Inc.',
      position: 'Frontend Engineer',
      location: 'Remote',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      description:
        'Developed customer-facing dashboards with React and Redux.\nImproved test coverage from 30% to 85% by introducing unit and integration tests.\nCollaborated with designers to ship a refreshed UI that raised conversion by 12%.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OpenSource Design System',
      link: 'github.com/alex/design-system',
      tech: 'React, Storybook, TypeScript',
      description:
        'Led an open-source component library used by 40+ teams. Established accessibility standards and automated visual regression testing.',
    },
    {
      id: 'proj-2',
      name: 'Hackathon: Campus Transit Tracker',
      link: '',
      tech: 'React, Leaflet, Node.js',
      description:
        'Real-time bus tracker built in 36 hours. Won Best Use of Open Data at a regional hackathon.',
    },
  ],
  architecture: [
    {
      id: 'arch-1',
      title: 'Multi-Region Checkout Platform',
      scale: '12M req/day',
      description:
        'Designed an event-driven checkout architecture across 3 regions, cutting p95 latency from 900ms to 250ms and removing single points of failure.',
    },
  ],
  opensource: [
    {
      id: 'oss-1',
      repo: 'react-table-pro',
      link: 'github.com/alex/react-table-pro',
      description:
        'Performance-focused data grid for React used by 300+ repositories. 2.4k stars, 40+ contributors.',
    },
  ],
  infrastructure: [
    {
      id: 'infra-1',
      title: 'Cloud Cost Optimization',
      metrics: 'AWS spend -22%, $48k/mo saved',
      description:
        'Rightsized 60 EC2 instances, consolidated reserved capacity, and introduced S3 lifecycle policies across 4 accounts.',
    },
    {
      id: 'infra-2',
      title: 'Global CDN & Edge Caching',
      metrics: 'QPS 15k, edge hit ratio 92%',
      description:
        'Rolled out CDN edge caching across regions, cutting origin load and improving time-to-first-byte.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'State University',
      degree: 'B.S. Computer Science',
      location: 'Austin, TX',
      startDate: 'Sep 2014',
      endDate: 'May 2018',
      description:
        'Graduated cum laude. Focused on web development and human-computer interaction.',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'React & TypeScript', category: 'Frameworks' },
    { id: 'skill-2', name: 'Node.js', category: 'Languages' },
    { id: 'skill-3', name: 'CSS / Design Systems', category: 'Frameworks' },
    { id: 'skill-4', name: 'Git & CI/CD', category: 'CI/CD' },
    { id: 'skill-5', name: 'AWS (EC2, S3, Lambda)', category: 'Cloud & DevOps' },
    { id: 'skill-6', name: 'PostgreSQL', category: 'Databases' },
    { id: 'skill-7', name: 'Jest, Playwright', category: 'Testing' },
    { id: 'skill-8', name: 'Performance Optimization', category: 'Other' },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      year: '2023',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'Native' },
    { id: 'lang-2', name: 'Spanish', level: 'Professional' },
  ],
  financials: [
    {
      id: 'fin-1',
      title: 'ARR Growth Program',
      metrics: 'ARR +34% YoY, $4.2M',
      description:
        'Owned pricing and packaging across core SKUs; launched a tiered model that lifted expansion revenue 22%.',
    },
  ],
  strategy: [
    {
      id: 'strat-1',
      title: 'Market Expansion to EMEA',
      metrics: '3 new markets, +18% revenue',
      description:
        'Led cross-functional go-to-market strategy for EMEA entry, aligning sales, marketing, and operations.',
    },
  ],
  caseCompetitions: [
    {
      id: 'case-1',
      name: 'National Retail Case Challenge',
      year: '2023',
      outcome:
        '1st place. Built a pricing and inventory strategy for an omnichannel retailer using Excel + SQL analysis.',
    },
  ],
  leadership: [
    {
      id: 'lead-1',
      title: 'Head of Operations Enablement',
      metrics: 'Managed 28 FTEs, opex -12%',
      description:
        'Directed a cross-functional team of 28; standardized operating cadence that cut opex 12% within two quarters.',
    },
  ],
}

export const templates = [
  { id: 'tech', name: 'Tech Standard' },
  { id: 'executive', name: 'Executive MBA' },
  { id: 'minimal', name: 'Modern Minimal' },
  { id: 'classic', name: 'Classic' },
]

export const accentColors = [
  { id: 'blue', value: '#2563eb', name: 'Blue' },
  { id: 'green', value: '#059669', name: 'Green' },
  { id: 'red', value: '#dc2626', name: 'Red' },
  { id: 'violet', value: '#7c3aed', name: 'Violet' },
  { id: 'slate', value: '#334155', name: 'Slate' },
  { id: 'amber', value: '#d97706', name: 'Amber' },
]

export const pageSizes = [
  { id: 'a4', label: 'A4', height: 1123 },
  { id: 'letter', label: 'US Letter', height: 1056 },
]

export const fontPairings = [
  {
    id: 'inter-mono',
    name: 'Inter + JetBrains Mono',
    body: "'Inter', system-ui, sans-serif",
    heading: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  {
    id: 'garamond-inter',
    name: 'Garamond + Inter',
    body: "'EB Garamond', Georgia, serif",
    heading: "'EB Garamond', Georgia, serif",
    mono: "'Source Code Pro', ui-monospace, monospace",
  },
  {
    id: 'system',
    name: 'System + Mono',
    body: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    heading: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    mono: "ui-monospace, 'SF Mono', Menlo, monospace",
  },
  {
    id: 'georgia',
    name: 'Georgia Serif',
    body: "Georgia, 'Times New Roman', serif",
    heading: "Georgia, 'Times New Roman', serif",
    mono: "'Courier New', monospace",
  },
]

export const personas = [
  { id: 'tech', name: 'Tech & Engineering' },
  { id: 'mba', name: 'MBA & Business' },
]

export const personaLevels = {
  tech: [
    { id: 'junior', label: 'Intern / Fresher' },
    { id: 'senior', label: 'Senior / Lead / Manager' },
  ],
  mba: [
    { id: 'junior', label: 'Fresher / Intern' },
    { id: 'senior', label: 'Manager / Director' },
  ],
}

export const skillCategories = {
  tech: ['Languages', 'Frameworks', 'Databases', 'Cloud & DevOps', 'CI/CD', 'Testing', 'Other'],
  mba: ['Analytics Tools', 'Platforms', 'Methodologies', 'Finance & Reporting', 'Languages', 'Other'],
}

export const sectionMeta = {
  summary: { label: 'Summary', always: true },
  experience: { label: 'Experience', always: true },
  architecture: { label: 'System Architecture' },
  opensource: { label: 'Open Source & GitHub' },
  infrastructure: { label: 'Cloud & Scale Metrics' },
  projects: { label: 'Projects' },
  education: { label: 'Education', always: true },
  skills: { label: 'Skills', always: true },
  certifications: { label: 'Certifications' },
  languages: { label: 'Languages' },
  financials: { label: 'P&L & Financial Metrics' },
  strategy: { label: 'Strategic Projects' },
  caseCompetitions: { label: 'Case Competitions' },
  leadership: { label: 'Leadership Highlights' },
}

export const framework = {
  tech: {
    junior: {
      order: ['summary', 'skills', 'opensource', 'projects', 'experience', 'education', 'languages'],
      labels: {
        skills: 'Core Skills',
        opensource: 'GitHub Highlights',
        education: 'Education & Coursework',
        projects: 'Projects & Hackathons',
      },
      hints: {
        summary:
          'Focus on relevant coursework, core languages, and eagerness to learn. Mention hackathons and open-source contributions.',
        skills: 'Add core languages, frameworks, and tools you are comfortable with.',
        opensource: 'Link GitHub repos and contributions. Even small PRs show initiative.',
        projects: 'Include GitHub repositories, hackathons, and course projects with links.',
        experience: 'List internships and class projects. Emphasize what you learned and shipped.',
        education: 'Prioritize CS coursework, GPA, and academic projects.',
      },
    },
    senior: {
      order: ['summary', 'experience', 'architecture', 'infrastructure', 'opensource', 'projects', 'skills', 'education'],
      labels: {
        architecture: 'System Architecture',
        infrastructure: 'Cloud & Scale Metrics',
        skills: 'Technical Skills',
        projects: 'Key Projects',
      },
      hints: {
        summary:
          'Emphasize years of experience, system architecture, cloud infrastructure cost reductions, and team scale.',
        architecture:
          'Describe systems you designed, your architecture decisions, and scale (QPS, users, regions).',
        infrastructure:
          'Quantify cloud impact: QPS, latency reduction %, AWS cost savings, capacity, uptime.',
        skills: 'Categorize skills by Languages, Frameworks, Cloud & DevOps, Databases.',
        projects: 'Highlight large-scale systems you designed, scaled, or led.',
        experience: 'Lead with system architecture decisions, cost savings, team size, and leadership impact.',
      },
    },
  },
  mba: {
    junior: {
      order: ['summary', 'education', 'caseCompetitions', 'experience', 'skills', 'certifications'],
      labels: {
        skills: 'Analytical Tooling',
        education: 'Education & Academic Achievements',
      },
      hints: {
        summary: 'Emphasize analytical skills (SQL, Excel, Tableau), case competitions, and academic achievements.',
        skills: 'List analytical tools such as SQL, Excel, Tableau, and Python for analytics.',
        caseCompetitions:
          'Highlight B-school case competitions and live consulting projects with outcomes.',
        experience: 'Include internships, live consulting projects, and B-school case competitions.',
        education: 'Highlight GPA, scholarships, and academic achievements.',
      },
    },
    senior: {
      order: ['summary', 'financials', 'leadership', 'strategy', 'experience', 'skills', 'certifications', 'education'],
      labels: {
        financials: 'P&L & Financial Metrics',
        leadership: 'Leadership Highlights',
        strategy: 'Strategic Projects',
        skills: 'Leadership & Analytical Tooling',
      },
      hints: {
        summary: 'Lead with revenue growth, P&L responsibility, cross-functional leadership, and operational efficiency.',
        financials: 'Quantify P&L ownership, revenue growth %, ARR impact, and budget managed.',
        leadership: 'Call out team size managed, market expansion %, and executive-level decisions.',
        strategy: 'Describe strategic initiatives and their measurable deliverables.',
        skills: 'Combine analytical tools with leadership and operational skills.',
        experience: 'Emphasize revenue growth %, P&L responsibility, team size, and operational efficiency.',
      },
    },
  },
}

export function getPersonaConfig(persona, level) {
  return framework[persona]?.[level] || framework.tech.junior
}

export function getSectionOrder(persona, level) {
  return getPersonaConfig(persona, level).order
}

export function getSectionLabel(persona, level, section) {
  const config = getPersonaConfig(persona, level)
  return config.labels?.[section] || sectionMeta[section]?.label || section
}

export function getSectionHint(persona, level, section) {
  return getPersonaConfig(persona, level).hints?.[section] || ''
}

export function hasSectionContent(resume, section) {
  switch (section) {
    case 'summary':
      return !!(resume.personal && resume.personal.summary && resume.personal.summary.trim())
    case 'experience':
      return (resume.experience || []).length > 0
    case 'projects':
      return (resume.projects || []).length > 0
    case 'architecture':
      return (resume.architecture || []).length > 0
    case 'opensource':
      return (resume.opensource || []).length > 0
    case 'infrastructure':
      return (resume.infrastructure || []).length > 0
    case 'education':
      return (resume.education || []).length > 0
    case 'skills':
      return (resume.skills || []).length > 0
    case 'certifications':
      return (resume.certifications || []).length > 0
    case 'languages':
      return (resume.languages || []).length > 0
    case 'financials':
      return (resume.financials || []).length > 0
    case 'strategy':
      return (resume.strategy || []).length > 0
    case 'caseCompetitions':
      return (resume.caseCompetitions || []).length > 0
    case 'leadership':
      return (resume.leadership || []).length > 0
    default:
      return false
  }
}

export function contentSections(persona, level, resume) {
  return getSectionOrder(persona, level).filter((s) => hasSectionContent(resume, s))
}

export function groupSkills(skills) {
  const map = {}
  for (const skill of skills) {
    const category = skill.category || 'Other'
    if (!map[category]) map[category] = []
    map[category].push(skill)
  }
  return map
}

export function extractCallouts(resume) {
  const sources = [
    ...(resume.infrastructure || []).map((i) => ({ title: i.title, metrics: i.metrics })),
    ...(resume.financials || []).map((f) => ({ title: f.title, metrics: f.metrics })),
    ...(resume.leadership || []).map((l) => ({ title: l.title, metrics: l.metrics })),
    ...(resume.strategy || []).map((s) => ({ title: s.title, metrics: s.metrics })),
    ...(resume.architecture || []).map((a) => ({ title: a.title, metrics: a.scale })),
  ]
  const out = []
  for (const src of sources) {
    if (!src.metrics) continue
    const parts = String(src.metrics)
      .split(/[,;]/)
      .map((p) => p.trim())
      .filter(Boolean)
    for (const part of parts) {
      if (out.length >= 4) break
      const labeled = part.match(/^([^:]{1,22}):\s*(.+)$/)
      if (labeled) out.push({ label: labeled[1].trim(), value: labeled[2].trim() })
      else if (/^[\d$.\-+kKmMxX%QPSARR\s]+$/.test(part) && part.trim())
        out.push({ label: src.title, value: part.trim() })
    }
    if (out.length >= 4) break
  }
  return out.slice(0, 4)
}
