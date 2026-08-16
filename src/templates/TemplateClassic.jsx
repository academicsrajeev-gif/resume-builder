import { contactItems } from './helpers'
import { contentSections } from '../data'
import { SectionBlocks } from './Sections'

export default function TemplateClassic({ resume, accent, persona, level }) {
  const { personal } = resume
  const contacts = contactItems(personal)
  const sections = contentSections(persona, level, resume)

  return (
    <div className="template classic">
      <header className="classic-header">
        <h1 className="classic-name">{personal.fullName}</h1>
        <p className="classic-title">{personal.title}</p>
        {contacts.length > 0 && (
          <div className="classic-contact">
            {contacts.map((c) => (
              <span key={c.text} className="classic-contact-item">
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
