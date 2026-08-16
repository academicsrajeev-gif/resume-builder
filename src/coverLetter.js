function cleanBullet(bullet) {
  return bullet.replace(/\[[^\]]*\]/g, '').replace(/[.!?]+\s*$/, '').trim()
}

function today() {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateCoverLetter(resume, targetRole, targetCompany) {
  const { personal } = resume
  const name = personal.fullName || 'Your Name'
  const title = personal.title || 'Professional'
  const role = targetRole || personal.title || 'the position'
  const company = targetCompany || 'your organization'

  const contact = [personal.email, personal.phone, personal.location]
    .filter(Boolean)
    .join('  |  ')

  const topBullets = []
  for (const exp of resume.experience || []) {
    if (!exp.description) continue
    const lines = exp.description
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.includes('[add metric'))
      .slice(0, 2)
    if (lines.length) {
      topBullets.push({ company: exp.company || 'a prior role', position: exp.position, lines })
    }
    if (topBullets.length >= 2) break
  }

  const opening = `I am writing to apply for the ${role} position at ${company}. As a ${title} with${
    personal.summary ? ' a track record of delivering measurable results' : ''
  }, I am excited about the opportunity to bring my experience to your team.`

  const summaryPara = personal.summary
    ? `My background aligns closely with what you are looking for: ${personal.summary}`
    : 'My experience has prepared me to contribute from day one, and I am eager to apply my skills to your team\u2019s goals.'

  let experiencePara = ''
  if (topBullets.length) {
    const first = topBullets[0]
    experiencePara = `In my current position${first.position ? ` as ${first.position}` : ''} at ${
      first.company
    }, I have delivered results such as:\n${first.lines
      .map((l) => `\u2022 ${cleanBullet(l)}.`)
      .join('\n')}`
  } else {
    experiencePara =
      'I bring strong skills and a demonstrated ability to learn quickly, collaborate across teams, and drive initiatives to completion.'
  }

  const rolePara = `I understand this role requires someone who can ${
    role.toLowerCase().includes('manag') || role.toLowerCase().includes('lead')
      ? 'lead initiatives, make sound decisions, and inspire cross-functional teams'
      : 'deliver high-quality work, solve problems, and collaborate effectively'
  }. I am confident my background in ${title} makes me a strong fit, and I would welcome the chance to discuss how I can contribute at ${company}.`

  const closing = `Thank you for considering my application. I look forward to the opportunity to speak with you about how my experience aligns with the goals of ${company}.`

  const signoff = `Sincerely,\n${name}`

  return [
    today(),
    name,
    personal.title,
    contact,
    '',
    'Dear Hiring Manager,',
    '',
    opening,
    '',
    summaryPara,
    '',
    experiencePara,
    '',
    rolePara,
    '',
    closing,
    '',
    signoff,
  ].join('\n')
}
