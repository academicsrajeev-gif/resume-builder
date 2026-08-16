const SKILL_DICTIONARY = [
  // Languages
  { name: 'JavaScript', aliases: ['js'], category: 'Languages' },
  { name: 'TypeScript', aliases: ['ts'], category: 'Languages' },
  { name: 'Python', aliases: [], category: 'Languages' },
  { name: 'Java', aliases: [], category: 'Languages' },
  { name: 'Go', aliases: ['golang'], category: 'Languages' },
  { name: 'Rust', aliases: [], category: 'Languages' },
  { name: 'C++', aliases: ['cpp', 'c plus plus'], category: 'Languages' },
  { name: 'C#', aliases: ['csharp'], category: 'Languages' },
  { name: 'SQL', aliases: [], category: 'Databases' },
  { name: 'Ruby', aliases: [], category: 'Languages' },
  { name: 'PHP', aliases: [], category: 'Languages' },
  { name: 'Kotlin', aliases: [], category: 'Languages' },
  { name: 'Swift', aliases: [], category: 'Languages' },
  // Frameworks
  { name: 'React', aliases: ['react.js', 'reactjs'], category: 'Frameworks' },
  { name: 'Vue', aliases: ['vue.js', 'vuejs'], category: 'Frameworks' },
  { name: 'Angular', aliases: [], category: 'Frameworks' },
  { name: 'Next.js', aliases: ['nextjs'], category: 'Frameworks' },
  { name: 'Node.js', aliases: ['node', 'nodejs'], category: 'Frameworks' },
  { name: 'Django', aliases: [], category: 'Frameworks' },
  { name: 'Flask', aliases: [], category: 'Frameworks' },
  { name: 'Spring Boot', aliases: ['spring'], category: 'Frameworks' },
  { name: 'Express', aliases: [], category: 'Frameworks' },
  { name: 'Tailwind', aliases: ['tailwind css'], category: 'Frameworks' },
  { name: 'TensorFlow', aliases: ['tensorflow', 'tf'], category: 'Frameworks' },
  { name: 'PyTorch', aliases: [], category: 'Frameworks' },
  { name: 'Kafka', aliases: [], category: 'Other' },
  // Databases & storage
  { name: 'PostgreSQL', aliases: ['postgres'], category: 'Databases' },
  { name: 'MySQL', aliases: [], category: 'Databases' },
  { name: 'MongoDB', aliases: ['mongo'], category: 'Databases' },
  { name: 'Redis', aliases: [], category: 'Databases' },
  { name: 'Elasticsearch', aliases: ['elastic'], category: 'Databases' },
  { name: 'Snowflake', aliases: [], category: 'Databases' },
  { name: 'BigQuery', aliases: [], category: 'Databases' },
  { name: 'DynamoDB', aliases: ['dynamo'], category: 'Databases' },
  { name: 'GraphQL', aliases: [], category: 'Databases' },
  // Cloud & DevOps
  { name: 'AWS', aliases: ['amazon web services'], category: 'Cloud & DevOps' },
  { name: 'Azure', aliases: [], category: 'Cloud & DevOps' },
  { name: 'GCP', aliases: ['google cloud'], category: 'Cloud & DevOps' },
  { name: 'Docker', aliases: [], category: 'Cloud & DevOps' },
  { name: 'Kubernetes', aliases: ['k8s'], category: 'Cloud & DevOps' },
  { name: 'Terraform', aliases: [], category: 'Cloud & DevOps' },
  { name: 'Serverless', aliases: ['lambda'], category: 'Cloud & DevOps' },
  { name: 'Nginx', aliases: [], category: 'Cloud & DevOps' },
  { name: 'CI/CD', aliases: ['cicd', 'continuous integration', 'continuous delivery'], category: 'CI/CD' },
  { name: 'Jenkins', aliases: [], category: 'CI/CD' },
  { name: 'GitHub Actions', aliases: ['github actions'], category: 'CI/CD' },
  { name: 'GitLab CI', aliases: ['gitlab'], category: 'CI/CD' },
  { name: 'Git', aliases: ['github'], category: 'CI/CD' },
  // Testing
  { name: 'Jest', aliases: [], category: 'Testing' },
  { name: 'Playwright', aliases: [], category: 'Testing' },
  { name: 'Cypress', aliases: [], category: 'Testing' },
  { name: 'Selenium', aliases: [], category: 'Testing' },
  { name: 'pytest', aliases: [], category: 'Testing' },
  // Analytics / data
  { name: 'Excel', aliases: [], category: 'Analytics Tools' },
  { name: 'Tableau', aliases: [], category: 'Analytics Tools' },
  { name: 'Power BI', aliases: ['power bi', 'powerbi'], category: 'Analytics Tools' },
  { name: 'Looker', aliases: [], category: 'Analytics Tools' },
  { name: 'R', aliases: [], category: 'Analytics Tools' },
  { name: 'Data Analysis', aliases: ['data analytics', 'analytics'], category: 'Analytics Tools' },
  { name: 'Machine Learning', aliases: ['ml'], category: 'Analytics Tools' },
  // Platforms & tools
  { name: 'Jira', aliases: [], category: 'Platforms' },
  { name: 'Confluence', aliases: [], category: 'Platforms' },
  { name: 'Salesforce', aliases: ['sfdc'], category: 'Platforms' },
  { name: 'HubSpot', aliases: [], category: 'Platforms' },
  { name: 'Figma', aliases: [], category: 'Platforms' },
  { name: 'Photoshop', aliases: [], category: 'Platforms' },
  { name: 'SAP', aliases: [], category: 'Platforms' },
  { name: 'Microsoft Office', aliases: ['ms office', 'office suite'], category: 'Platforms' },
  // Methodologies
  { name: 'Agile', aliases: ['scrum'], category: 'Methodologies' },
  { name: 'Kanban', aliases: [], category: 'Methodologies' },
  { name: 'Lean Six Sigma', aliases: ['six sigma'], category: 'Methodologies' },
  { name: 'Design Thinking', aliases: [], category: 'Methodologies' },
  // Finance & business
  { name: 'Financial Modeling', aliases: ['financial modelling', 'financial model'], category: 'Finance & Reporting' },
  { name: 'Forecasting', aliases: ['budget forecasting'], category: 'Finance & Reporting' },
  { name: 'P&L Management', aliases: ['p&l', 'profit and loss'], category: 'Finance & Reporting' },
  { name: 'Budget Management', aliases: ['budgeting', 'budgets'], category: 'Finance & Reporting' },
  { name: 'Business Strategy', aliases: ['strategy'], category: 'Finance & Reporting' },
  { name: 'Stakeholder Management', aliases: ['stakeholder communication'], category: 'Finance & Reporting' },
  { name: 'Market Research', aliases: ['market analysis'], category: 'Finance & Reporting' },
]

const BLOCKLIST = new Set([
  'the', 'we', 'our', 'your', 'you', 'this', 'that', 'these', 'those', 'with',
  'from', 'are', 'will', 'have', 'has', 'had', 'for', 'and', 'but', 'who',
  'what', 'when', 'where', 'how', 'why', 'more', 'most', 'per', 'can', 'new',
  'key', 'plus', 'each', 'also', 'into', 'over', 'under', 'than', 'then',
  'they', 'them', 'their', 'there', 'role', 'team', 'teams', 'work', 'join',
  'company', 'about', 'being', 'other', 'should', 'would', 'could', 'such',
  'including', 'inc', 'ltd', 'llc', 'job', 'apply', 'position', 'candidate',
  'experience', 'years', 'plus', 'related', 'equivalent', 'ability', 'within',
  'strong', 'strongest', 'skills', 'skill', 'ability', 'able', 'related',
  'senior', 'junior', 'engineer', 'engineering', 'engineers', 'frontend',
  'backend', 'fullstack', 'full', 'stack', 'software', 'developer',
  'development', 'designer', 'designers', 'manager', 'managerial', 'lead',
  'leads', 'leadership', 'required', 'requirement', 'requirements', 'must',
  'preferred', 'ideal', 'plus', 'familiarity', 'knowledge', 'understanding',
  'working', 'excellent', 'experience', 'professional', 'professionalism',
  'communication', 'communications', 'ability', 'attention', 'detail',
  'environment', 'environments', 'dynamic', 'fast', 'paced', 'office',
  'customer', 'customers', 'client', 'clients', 'projects', 'project',
  'support', 'provide', 'providing', 'ensure', 'ensuring', 'build', 'building',
  'help', 'helping', 'business', 'industry', 'industries', 'markets', 'market',
  'technology', 'technologies', 'product', 'products', 'including', 'using',
  'used', 'use', 'work', 'worked', 'working', 'grow', 'growing', 'scale',
  'scaling', 'responsible', 'ownership', 'own', 'directly', 'indirectly',
  'across', 'within', 'between', 'multiple', 'various', 'different', 'other',
])

function normalize(name) {
  return String(name).toLowerCase()
}

function boundaryHit(text, term) {
  const esc = String(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[^a-z0-9])${esc}($|[^a-z0-9])`, 'i').test(text)
}

function addUnique(items, seen, name, category, aliases) {
  const key = normalize(name)
  if (seen.has(key)) return
  seen.add(key)
  items.push({ name, category, aliases: aliases || [] })
}

export function extractKeywords(jobText) {
  const text = String(jobText || '')
  const items = []
  const seen = new Set()

  for (const entry of SKILL_DICTIONARY) {
    const names = [entry.name, ...entry.aliases]
    const hit = names.some((n) => n && boundaryHit(text, n))
    if (hit) addUnique(items, seen, entry.name, entry.category, entry.aliases)
  }

  const words = text.split(/\s+/)
  for (let i = 0; i < words.length; i++) {
    let clean = words[i].replace(/[^A-Za-z0-9+#.-]/g, '').replace(/[.:]+$/, '')
    if (clean.length < 3) continue
    if (!/^[A-Z]/.test(clean)) continue
    if (i > 0 && /[.!?]$/.test(words[i - 1])) continue
    if (BLOCKLIST.has(clean.toLowerCase())) continue
    const known = SKILL_DICTIONARY.some(
      (e) => e.name.toLowerCase() === clean.toLowerCase() ||
        e.aliases.some((a) => a.toLowerCase() === clean.toLowerCase()),
    )
    if (known) continue
    addUnique(items, seen, clean, 'Other', [])
  }

  return items
}

export function detectMetrics(jobText) {
  const text = String(jobText || '')
  const percent = (text.match(/\d+(?:\.\d+)?\s*%/g) || []).length
  const currency = (text.match(/[$€£]\s?\d+[kmb]?/gi) || []).length
  const scale = (text.match(/\b(qps|arr|mrr|nps|maas|ftes?|users?|revenue|latency|uptime|coverage)\b/gi) || []).length
  return { count: percent + currency + scale, hasPercent: percent > 0, hasCurrency: currency > 0 }
}

function resumeBlob(resume) {
  const parts = []
  if (resume.personal?.summary) parts.push(resume.personal.summary)
  if (resume.personal?.title) parts.push(resume.personal.title)
  for (const e of resume.experience || []) parts.push(e.company, e.position, e.description)
  for (const p of resume.projects || []) parts.push(p.name, p.tech, p.description)
  for (const a of resume.architecture || []) parts.push(a.title, a.scale, a.description)
  for (const o of resume.opensource || []) parts.push(o.repo, o.description)
  for (const i of resume.infrastructure || []) parts.push(i.title, i.metrics, i.description)
  for (const s of resume.skills || []) parts.push(s.name)
  for (const c of resume.certifications || []) parts.push(c.name)
  for (const f of resume.financials || []) parts.push(f.title, f.metrics, f.description)
  for (const st of resume.strategy || []) parts.push(st.title, st.metrics, st.description)
  for (const l of resume.leadership || []) parts.push(l.title, l.metrics, l.description)
  return parts.filter(Boolean).join(' ').toLowerCase()
}

function keywordHit(item, blob) {
  const names = [item.name, ...(item.aliases || [])]
  return names.some((n) => n && boundaryHit(blob, n))
}

export function analyzeMatch(resume, jobText) {
  const keywords = extractKeywords(jobText)
  const blob = resumeBlob(resume)
  const items = keywords.map((k) => ({
    ...k,
    matched: keywordHit(k, blob) || looseSkillHit(k.name, resume.skills),
  }))
  const matched = items.filter((i) => i.matched)
  const missing = items.filter((i) => !i.matched)
  const score = items.length ? Math.round((matched.length / items.length) * 100) : 0
  return {
    items,
    matched,
    missing,
    score,
    metricDensity: detectMetrics(jobText),
  }
}

function looseSkillHit(name, skills) {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  return (skills || []).some((s) => {
    const sn = s.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    return sn.includes(norm) || (norm.length > 3 && norm.includes(sn) && sn.length > 2)
  })
}
