const STRONG_VERBS = [
  'Spearheaded', 'Engineered', 'Architected', 'Delivered', 'Optimized', 'Drove',
  'Led', 'Launched', 'Scaled', 'Streamlined', 'Orchestrated', 'Implemented',
  'Accelerated', 'Negotiated', 'Automated', 'Designed', 'Directed', 'Owned',
  'Reduced', 'Increased', 'Improved', 'Established', 'Transformed', 'Pioneered',
  'Developed', 'Managed', 'Created', 'Executed',
]

const WEAK_TO_STRONG = {
  helped: 'Accelerated',
  'helped to': 'Accelerated',
  'helped with': 'Contributed to',
  help: 'Accelerated',
  worked: 'Delivered',
  'worked on': 'Delivered',
  work: 'Delivered',
  'work on': 'Delivered',
  did: 'Executed',
  do: 'Executed',
  made: 'Created',
  make: 'Created',
  'was responsible for': 'Owned',
  'responsible for': 'Owned',
  'was in charge of': 'Directed',
  'in charge of': 'Directed',
  handled: 'Managed',
  handle: 'Managed',
  assisted: 'Supported',
  'assisted with': 'Supported',
  assist: 'Supported',
  used: 'Leveraged',
  use: 'Leveraged',
  built: 'Engineered',
  build: 'Engineered',
  wrote: 'Developed',
  write: 'Developed',
  created: 'Designed',
  create: 'Designed',
  developed: 'Developed',
  develop: 'Developed',
  improved: 'Optimized',
  improve: 'Improved',
  increased: 'Increased',
  increase: 'Increased',
  reduced: 'Reduced',
  reduce: 'Reduced',
  led: 'Led',
  lead: 'Led',
  managed: 'Managed',
  manage: 'Managed',
  implemented: 'Implemented',
  implement: 'Implemented',
  launched: 'Launched',
  launch: 'Launched',
  designed: 'Designed',
  directed: 'Directed',
  owned: 'Owned',
  own: 'Owned',
  supported: 'Supported',
  support: 'Supported',
  'participated in': 'Contributed to',
  'participate in': 'Contributed to',
  'took part in': 'Contributed to',
  'was able to': '',
  'managed to': '',
  'tasked with': '',
  'responsible': 'Owned',
}

const PREFIXES = [
  'i was responsible for',
  'i was in charge of',
  'i was tasked with',
  'i was able to',
  'i managed to',
  'i helped to',
  'i helped',
  'i worked on',
  'i worked',
  'i participated in',
  'i handled',
  'i assisted',
  'i did',
  'i used',
  'i built',
  'i made',
  'i created',
  'i ',
  'was responsible for',
  'responsible for',
  'was in charge of',
  'in charge of',
  'was tasked with',
  'tasked with',
  'was able to',
  'managed to',
  'helped to',
  'helped',
]

const STOPWORDS = new Set([
  'about', 'above', 'after', 'again', 'against', 'also', 'among', 'and', 'been',
  'before', 'being', 'below', 'between', 'both', 'but', 'came', 'can', 'could',
  'did', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'has', 'have', 'having', 'here', 'how', 'into', 'just', 'like', 'more',
  'most', 'much', 'must', 'new', 'not', 'now', 'off', 'only', 'other', 'our',
  'out', 'over', 'same', 'should', 'such', 'than', 'that', 'the', 'their',
  'them', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to',
  'too', 'under', 'until', 'upon', 'use', 'used', 'very', 'was', 'were', 'what',
  'when', 'where', 'which', 'while', 'with', 'within', 'without', 'would', 'you',
  'your', 'its', 'who', 'whom', 'why', 'will', 'get', 'got', 'take', 'took',
  'make', 'made', 'work', 'team', 'teams', 'across', 'also', 'company', 'year',
  'years', 'one', 'two', 'time', 'people', 'project', 'projects', 'user', 'users',
])

const ATS_KEYWORDS = {
  tech: [
    'System Architecture', 'Scalability', 'Cloud Infrastructure', 'CI/CD', 'Automation',
    'Performance Optimization', 'Reliability', 'API Design', 'Microservices',
    'Test Automation', 'Mentorship', 'Cross-functional Collaboration',
  ],
  mba: [
    'Revenue Growth', 'P&L Management', 'Forecasting', 'Stakeholder Management',
    'Operational Efficiency', 'Cross-functional Leadership', 'Financial Analysis',
    'Process Improvement', 'Budget Management', 'Business Strategy', 'Market Analysis',
  ],
}

const METRIC_RE = /\d+(?:\.\d+)?\s*(?:%|x|\+|k|\$)|[$]\d|(?:N%|NN|xxx)/i
const METRIC_PLACEHOLDER = ' [add metric, e.g. 30%, 2x, 100+ users]'

function stripPrefix(text) {
  const lower = text.trim().toLowerCase()
  for (const prefix of PREFIXES) {
    if (lower === prefix) return text.trim()
    if (lower.startsWith(prefix)) {
      return text.trim().slice(prefix.length).trim()
    }
  }
  return text.trim()
}

function capitalize(word) {
  return word ? word[0].toUpperCase() + word.slice(1) : word
}

function firstWord(text) {
  const match = text.match(/^[A-Za-z]+/)
  return match ? match[0] : ''
}

function hasMetric(line) {
  return METRIC_RE.test(line)
}

function normalizeLead(text) {
  let cleaned = stripPrefix(text)
  if (!cleaned) return ''
  const words = cleaned.split(/\s+/)
  const first = firstWord(cleaned)
  const weak = WEAK_TO_STRONG[first.toLowerCase()] !== undefined
  if (weak) {
    const replacement = WEAK_TO_STRONG[first.toLowerCase()]
    if (replacement) {
      cleaned = `${replacement} ${words.slice(1).join(' ')}`.trim()
    }
  }
  return capitalize(cleaned)
}

function actionLine(line) {
  const cleaned = stripPrefix(line)
  if (!cleaned) return ''
  let result = normalizeLead(cleaned)
  if (!result.endsWith('.') && !result.endsWith('!')) result += '.'
  return result
}

function metricLine(line) {
  const cleaned = stripPrefix(line)
  if (!cleaned) return ''
  let result = normalizeLead(cleaned)
  if (hasMetric(line)) {
    if (!result.endsWith('.') && !result.endsWith('!')) result += '.'
    return result
  }
  result = result.replace(/[.!?]+$/, '')
  return result + METRIC_PLACEHOLDER + '.'
}

const WEAK_WORDS = new Set([
  ...Object.keys(WEAK_TO_STRONG),
  'improve', 'improved', 'helped', 'help', 'build', 'built', 'develop',
  'created', 'create', 'made', 'make', 'used', 'use', 'work', 'worked',
  'did', 'do', 'made', 'make', 'write', 'wrote', 'page', 'pages', 'login',
  'website', 'site', 'thing', 'things', 'stuff', 'new', 'get', 'got',
  'way', 'ways', 'able', 'better', 'great', 'good', 'really',
])

function extractKeywords(text, persona) {
  const tokens = text
    .toLowerCase()
    .split(/[^a-z0-9+#./-]+/i)
    .filter(
      (t) =>
        t.length > 3 &&
        !STOPWORDS.has(t.toLowerCase()) &&
        !WEAK_WORDS.has(t.toLowerCase()) &&
        !/^\d+$/.test(t),
    )
  const unique = []
  for (const t of tokens) {
    if (!unique.includes(t)) unique.push(t)
  }
  const extra = ATS_KEYWORDS[persona] || []
  for (const k of extra) {
    const key = k.toLowerCase()
    if (!unique.includes(key)) unique.push(k)
  }
  return unique.slice(0, 6)
}

function atsLine(line, persona) {
  const cleaned = stripPrefix(line)
  if (!cleaned) return { text: '', keywords: [] }
  const text = actionLine(cleaned)
  const keywords = extractKeywords(line, persona)
  const append = keywords.length ? ` · Competencies: ${keywords.slice(0, 4).join(', ')}` : ''
  return { text: text.replace(/\.\s*$/, '') + append + '.', keywords }
}

export function sharpenDescription(text, persona) {
  const lines = text.split('\n').filter((l) => l.trim())
  if (lines.length === 0) return null

  const metric = []
  const action = []
  const atsLines = []
  const allKeywords = []

  for (const line of lines) {
    metric.push(metricLine(line))
    action.push(actionLine(line))
    const { text: atsText, keywords } = atsLine(line, persona)
    atsLines.push(atsText)
    for (const k of keywords) if (!allKeywords.includes(k)) allKeywords.push(k)
  }

  return {
    metric: metric.join('\n'),
    action: action.join('\n'),
    ats: atsLines.join('\n'),
    atsKeywords: allKeywords.slice(0, 6),
  }
}

export function randomStrongVerb() {
  return STRONG_VERBS[Math.floor(Math.random() * STRONG_VERBS.length)]
}

export function isStrongVerb(word) {
  return STRONG_VERBS.includes(capitalize(word))
}
