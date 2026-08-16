import { contactItems } from './helpers'
import { contentSections } from '../data'
import { SectionBlocks } from './Sections'

export default function TemplateMinimal({ resume, accent, persona, level }) {
  const { personal } = resume
  const contacts = contactItems(personal)
  const sections = contentSections(persona, level, resume)

  return (
    <div className="template minimal">
      <header className="minimal-header">
        <h1 className="minimal-name">{personal.fullName}</h1>
        <p className="minimal-title">{personal.title}</p>
        {contacts.length > 0 && (
          <div className="minimal-contact">
            {contacts.map((c) => (
              <span key={c.text} className="minimal-contact-item">
                {c.text}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="minimal-rule" style={{ background: accent }} />
      <SectionBlocks resume={resume} accent={accent} sections={sections} />
    </div>
  )
}
