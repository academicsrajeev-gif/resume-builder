import { contactItems } from './helpers'
import { contentSections } from '../data'
import { SectionBlocks } from './Sections'

export default function TemplateTech({ resume, accent, persona, level }) {
  const { personal } = resume
  const contacts = contactItems(personal)
  const sections = contentSections(persona, level, resume)

  return (
    <div className="template tech">
      <header className="tech-header">
        <h1 className="tech-name">{personal.fullName}</h1>
        <p className="tech-title">{personal.title}</p>
        {contacts.length > 0 && (
          <div className="tech-contact">
            {contacts.map((c) => (
              <span key={c.text} className="tech-contact-item">
                {c.text}
              </span>
            ))}
          </div>
        )}
      </header>
      <SectionBlocks resume={resume} accent={accent} sections={sections} />
    </div>
  )
}
