import { dates } from './helpers'
import { groupSkills } from '../data'
export function SectionTitle({ accent, children }) {
  return (
    <h2 className="section-title" style={{ color: accent }}>
      {children}
    </h2>
  )
}

export function EntryHead({ title, subtitle, metaLeft, metaRight }) {
  return (
    <div className="entry-head">
      <div>
        <h3 className="entry-title">{title}</h3>
        {subtitle && <p className="entry-sub">{subtitle}</p>}
      </div>
      <div className="entry-meta">
        {metaLeft && <span>{metaLeft}</span>}
        {metaRight && <span>{metaRight}</span>}
      </div>
    </div>
  )
}

export function SummarySection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Summary</SectionTitle>
      <p className="resume-text">{resume.personal.summary}</p>
    </section>
  )
}

export function MetricEntry({ item, metricsKey }) {
  const metricValue = item[metricsKey] || item.metrics || item.scale || ''
  return (
    <div className="resume-entry">
      <div className="entry-head">
        <div>
          <h3 className="entry-title">{item.title}</h3>
        </div>
        {metricValue && <span className="metric-pill">{metricValue}</span>}
      </div>
      {item.description && <p className="resume-text">{item.description}</p>}
    </div>
  )
}

export function ArchitectureSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>System Architecture</SectionTitle>
      {resume.architecture.map((item) => (
        <MetricEntry key={item.id} item={item} metricsKey="scale" />
      ))}
    </section>
  )
}

export function OpenSourceSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Open Source & GitHub</SectionTitle>
      {resume.opensource.map((item) => (
        <div key={item.id} className="resume-entry">
          <div className="entry-head">
            <div>
              <h3 className="entry-title">
                {item.repo}
                {item.link && <span className="entry-link"> · {item.link}</span>}
              </h3>
            </div>
          </div>
          {item.description && <p className="resume-text">{item.description}</p>}
        </div>
      ))}
    </section>
  )
}

export function InfrastructureSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Cloud & Scale Metrics</SectionTitle>
      {resume.infrastructure.map((item) => (
        <MetricEntry key={item.id} item={item} metricsKey="metrics" />
      ))}
    </section>
  )
}

export function FinancialsSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>P&L & Financial Metrics</SectionTitle>
      {resume.financials.map((item) => (
        <MetricEntry key={item.id} item={item} metricsKey="metrics" />
      ))}
    </section>
  )
}

export function StrategySection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Strategic Projects</SectionTitle>
      {resume.strategy.map((item) => (
        <MetricEntry key={item.id} item={item} metricsKey="metrics" />
      ))}
    </section>
  )
}

export function LeadershipSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Leadership Highlights</SectionTitle>
      {resume.leadership.map((item) => (
        <MetricEntry key={item.id} item={item} metricsKey="metrics" />
      ))}
    </section>
  )
}

export function CaseCompetitionsSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Case Competitions</SectionTitle>
      {resume.caseCompetitions.map((item) => (
        <div key={item.id} className="resume-entry">
          <div className="entry-head">
            <div>
              <h3 className="entry-title">{item.name}</h3>
            </div>
            {item.year && <span className="entry-meta">{item.year}</span>}
          </div>
          {item.outcome && <p className="resume-text">{item.outcome}</p>}
        </div>
      ))}
    </section>
  )
}

export function ExperienceSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Experience</SectionTitle>
      {resume.experience.map((item) => (
        <div key={item.id} className="resume-entry">
          <EntryHead
            title={item.position}
            subtitle={item.company}
            metaLeft={dates(item.startDate, item.endDate)}
            metaRight={item.location}
          />
          {item.description && (
            <ul className="resume-bullets">
              {item.description
                .split('\n')
                .filter((l) => l.trim())
                .map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  )
}

export function ProjectsSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Projects</SectionTitle>
      {resume.projects.map((item) => (
        <div key={item.id} className="resume-entry">
          <div className="entry-head">
            <div>
              <h3 className="entry-title">
                {item.name}
                {item.link && (
                  <span className="entry-link"> · {item.link}</span>
                )}
              </h3>
              {item.tech && <p className="entry-sub">{item.tech}</p>}
            </div>
          </div>
          {item.description && <p className="resume-text">{item.description}</p>}
        </div>
      ))}
    </section>
  )
}

export function EducationSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Education</SectionTitle>
      {resume.education.map((item) => (
        <div key={item.id} className="resume-entry">
          <EntryHead
            title={item.degree}
            subtitle={item.school}
            metaLeft={dates(item.startDate, item.endDate)}
            metaRight={item.location}
          />
          {item.description && <p className="resume-text">{item.description}</p>}
        </div>
      ))}
    </section>
  )
}

export function SkillsSection({ resume, accent }) {
  const grouped = groupSkills(resume.skills)
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Skills</SectionTitle>
      {Object.entries(grouped).map(([category, skills]) => (
        <div key={category} className="skill-group">
          <span className="skill-group-label">{category}</span>
          <div className="skill-tags">
            {skills.map((skill) => (
              <span key={skill.id} className="skill-tag">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export function CertificationsSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Certifications</SectionTitle>
      {resume.certifications.map((item) => (
        <div key={item.id} className="resume-entry">
          <EntryHead
            title={item.name}
            subtitle={item.issuer}
            metaRight={item.year}
          />
        </div>
      ))}
    </section>
  )
}

export function LanguagesSection({ resume, accent }) {
  return (
    <section className="resume-section">
      <SectionTitle accent={accent}>Languages</SectionTitle>
      {resume.languages.map((lang) => (
        <div key={lang.id} className="resume-entry language-line">
          <EntryHead title={lang.name} metaRight={lang.level} />
        </div>
      ))}
    </section>
  )
}

export function SidebarSkills({ skills }) {
  const grouped = groupSkills(skills)
  return (
    <div className="sidebar-block">
      <h3 className="sidebar-heading">Skills</h3>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="sidebar-skill-group">
          <span className="sidebar-skill-category">{category}</span>
          <ul className="sidebar-skills">
            {items.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function SidebarLanguages({ languages }) {
  return (
    <div className="sidebar-block">
      <h3 className="sidebar-heading">Languages</h3>
      <ul className="sidebar-skills">
        {languages.map((lang) => (
          <li key={lang.id}>
            {lang.name}
            {lang.level ? ` (${lang.level})` : ''}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SectionBlocks({ resume, accent, sections }) {
  const map = {
    summary: SummarySection,
    experience: ExperienceSection,
    projects: ProjectsSection,
    architecture: ArchitectureSection,
    opensource: OpenSourceSection,
    infrastructure: InfrastructureSection,
    education: EducationSection,
    skills: SkillsSection,
    certifications: CertificationsSection,
    languages: LanguagesSection,
    financials: FinancialsSection,
    strategy: StrategySection,
    caseCompetitions: CaseCompetitionsSection,
    leadership: LeadershipSection,
  }
  return (
    <>
      {sections.map((s) => {
        const Block = map[s]
        if (!Block) return null
        return <Block key={s} resume={resume} accent={accent} />
      })}
    </>
  )
}
