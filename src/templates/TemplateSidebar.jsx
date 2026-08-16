import { contactItems } from './helpers'
import { contentSections, extractCallouts } from '../data'
import { SectionBlocks, SidebarSkills, SidebarLanguages } from './Sections'

export default function TemplateExecutive({ resume, accent, persona, level }) {
  const { personal } = resume
  const contacts = contactItems(personal)
  const sections = contentSections(persona, level, resume)
  const callouts = extractCallouts(resume)
  const sidebarSections = sections.filter((s) => s === 'skills' || s === 'languages')
  const mainSections = sections.filter((s) => s !== 'skills' && s !== 'languages')

  return (
    <div className="template executive">
      <aside className="executive-aside" style={{ background: accent }}>
        <div className="sidebar-pic">
          {(personal.fullName || '?')
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()}
        </div>
        <h1 className="sidebar-name">{personal.fullName}</h1>
        <p className="sidebar-title">{personal.title}</p>

        {contacts.length > 0 && (
          <div className="sidebar-block">
            <h3 className="sidebar-heading">Contact</h3>
            {contacts.map((c) => (
              <div key={c.text} className="sidebar-contact">
                <span className="sidebar-icon">{c.icon}</span>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        )}

        {sidebarSections.includes('skills') && resume.skills.length > 0 && (
          <SidebarSkills skills={resume.skills} />
        )}
        {sidebarSections.includes('languages') && resume.languages.length > 0 && (
          <SidebarLanguages languages={resume.languages} />
        )}
      </aside>

      <main className="sidebar-main">
        {callouts.length > 0 && (
          <div className="callout-row">
            {callouts.map((c, i) => (
              <div key={`${c.label}-${i}`} className="callout-box" style={{ borderTopColor: accent }}>
                <span className="callout-value">{c.value}</span>
                <span className="callout-label">{c.label}</span>
              </div>
            ))}
          </div>
        )}
        <SectionBlocks resume={resume} accent={accent} sections={mainSections} />
      </main>
    </div>
  )
}
