import { useMemo, useState } from 'react'
import { getSectionHint } from '../data'
import { sharpenDescription } from '../sharpen'

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  )
}

function Hint({ persona, level, section }) {
  const hint = getSectionHint(persona, level, section)
  if (!hint) return null
  return <p className="editor-hint">{hint}</p>
}

export function PersonalEditor({ personal, onChange }) {
  const set = (key, value) => onChange(key, value)
  return (
    <div className="editor-section">
      <h2 className="editor-title">Personal Details</h2>
      <div className="grid-2">
        <Field label="Full Name">
          <input
            type="text"
            value={personal.fullName}
            onChange={(e) => set('fullName', e.target.value)}
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Job Title">
          <input
            type="text"
            value={personal.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="Software Engineer"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={personal.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="jane@example.com"
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            value={personal.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="+1 555 000 0000"
          />
        </Field>
        <Field label="Location">
          <input
            type="text"
            value={personal.location}
            onChange={(e) => set('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </Field>
        <Field label="Website / LinkedIn">
          <input
            type="text"
            value={personal.website}
            onChange={(e) => set('website', e.target.value)}
            placeholder="linkedin.com/in/janedoe"
          />
        </Field>
      </div>
      <Field label="Professional Summary">
        <textarea
          rows={4}
          value={personal.summary}
          onChange={(e) => set('summary', e.target.value)}
          placeholder="Write a short summary of your experience and goals..."
        />
      </Field>
    </div>
  )
}

export function ExperienceEditor({ experience, onUpdate, onAdd, onRemove, onSharpen, persona, level }) {
  return (
    <div className="editor-section">
      <div className="editor-head">
        <h2 className="editor-title">Work Experience</h2>
        <button type="button" className="btn btn-small btn-add" onClick={onAdd}>
          + Add
        </button>
      </div>
      <Hint persona={persona} level={level} section="experience" />
      {experience.length === 0 && (
        <p className="editor-empty">No experience added yet. Click "+ Add" to get started.</p>
      )}
      {experience.map((item) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-head">
            <span className="editor-card-index">{experience.indexOf(item) + 1}</span>
            <button
              type="button"
              className="btn btn-small btn-remove"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
          <div className="grid-2">
            <Field label="Company">
              <input
                type="text"
                value={item.company}
                onChange={(e) => onUpdate(item.id, 'company', e.target.value)}
                placeholder="Acme Corp"
              />
            </Field>
            <Field label="Position">
              <input
                type="text"
                value={item.position}
                onChange={(e) => onUpdate(item.id, 'position', e.target.value)}
                placeholder="Senior Engineer"
              />
            </Field>
            <Field label="Location">
              <input
                type="text"
                value={item.location}
                onChange={(e) => onUpdate(item.id, 'location', e.target.value)}
                placeholder="New York, NY"
              />
            </Field>
            <div className="grid-2">
              <Field label="Start Date">
                <input
                  type="text"
                  value={item.startDate}
                  onChange={(e) => onUpdate(item.id, 'startDate', e.target.value)}
                  placeholder="Jan 2020"
                />
              </Field>
              <Field label="End Date">
                <input
                  type="text"
                  value={item.endDate}
                  onChange={(e) => onUpdate(item.id, 'endDate', e.target.value)}
                  placeholder="Present"
                />
              </Field>
            </div>
          </div>
          <Field label="Description (one bullet per line)">
            <textarea
              rows={5}
              value={item.description}
              onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements, one bullet per line..."
            />
          </Field>
          {item.description && (
            <button
              type="button"
              className="btn btn-small btn-sharpen"
              onClick={() => onSharpen(item.id)}
            >
              Sharpener
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export function ProjectsEditor({ projects, onUpdate, onAdd, onRemove, persona, level }) {
  return (
    <div className="editor-section">
      <div className="editor-head">
        <h2 className="editor-title">Projects</h2>
        <button type="button" className="btn btn-small btn-add" onClick={onAdd}>
          + Add
        </button>
      </div>
      <Hint persona={persona} level={level} section="projects" />
      {projects.length === 0 && (
        <p className="editor-empty">No projects added yet. Click "+ Add" to get started.</p>
      )}
      {projects.map((item) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-head">
            <span className="editor-card-index">{projects.indexOf(item) + 1}</span>
            <button
              type="button"
              className="btn btn-small btn-remove"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
          <div className="grid-2">
            <Field label="Project Name">
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
                placeholder="Hackathon: Campus Transit Tracker"
              />
            </Field>
            <Field label="Link (GitHub, demo)">
              <input
                type="text"
                value={item.link}
                onChange={(e) => onUpdate(item.id, 'link', e.target.value)}
                placeholder="github.com/you/project"
              />
            </Field>
          </div>
          <Field label="Technologies">
            <input
              type="text"
              value={item.tech}
              onChange={(e) => onUpdate(item.id, 'tech', e.target.value)}
              placeholder="React, TypeScript, AWS"
            />
          </Field>
          <Field label="Description">
            <textarea
              rows={3}
              value={item.description}
              onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
              placeholder="What you built, your role, and the impact..."
            />
          </Field>
        </div>
      ))}
    </div>
  )
}

export function EducationEditor({ education, onUpdate, onAdd, onRemove, persona, level }) {
  return (
    <div className="editor-section">
      <div className="editor-head">
        <h2 className="editor-title">Education</h2>
        <button type="button" className="btn btn-small btn-add" onClick={onAdd}>
          + Add
        </button>
      </div>
      <Hint persona={persona} level={level} section="education" />
      {education.length === 0 && (
        <p className="editor-empty">No education added yet. Click "+ Add" to get started.</p>
      )}
      {education.map((item) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-head">
            <span className="editor-card-index">{education.indexOf(item) + 1}</span>
            <button
              type="button"
              className="btn btn-small btn-remove"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
          <div className="grid-2">
            <Field label="School">
              <input
                type="text"
                value={item.school}
                onChange={(e) => onUpdate(item.id, 'school', e.target.value)}
                placeholder="State University"
              />
            </Field>
            <Field label="Degree">
              <input
                type="text"
                value={item.degree}
                onChange={(e) => onUpdate(item.id, 'degree', e.target.value)}
                placeholder="B.S. Computer Science"
              />
            </Field>
            <div className="grid-2">
              <Field label="Start Date">
                <input
                  type="text"
                  value={item.startDate}
                  onChange={(e) => onUpdate(item.id, 'startDate', e.target.value)}
                  placeholder="2014"
                />
              </Field>
              <Field label="End Date">
                <input
                  type="text"
                  value={item.endDate}
                  onChange={(e) => onUpdate(item.id, 'endDate', e.target.value)}
                  placeholder="2018"
                />
              </Field>
            </div>
          </div>
          <Field label="Description (optional)">
            <textarea
              rows={2}
              value={item.description}
              onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
              placeholder="Honors, activities, or relevant coursework..."
            />
          </Field>
        </div>
      ))}
    </div>
  )
}

export function SkillsEditor({ skills, categories, onUpdate, onAdd, onRemove, persona, level }) {
  return (
    <div className="editor-section">
      <div className="editor-head">
        <h2 className="editor-title">Skills</h2>
        <button type="button" className="btn btn-small btn-add" onClick={onAdd}>
          + Add
        </button>
      </div>
      <Hint persona={persona} level={level} section="skills" />
      {skills.length === 0 && (
        <p className="editor-empty">No skills added yet. Click "+ Add" to get started.</p>
      )}
      <div className="skills-list">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-row">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => onUpdate(skill.id, 'name', e.target.value)}
              placeholder="e.g. React, Python, SQL..."
            />
            <select
              className="skill-category"
              value={skill.category || 'Other'}
              onChange={(e) => onUpdate(skill.id, 'category', e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn btn-small btn-remove"
              onClick={() => onRemove(skill.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CertificationsEditor({ certifications, onUpdate, onAdd, onRemove }) {
  return (
    <div className="editor-section">
      <div className="editor-head">
        <h2 className="editor-title">Certifications</h2>
        <button type="button" className="btn btn-small btn-add" onClick={onAdd}>
          + Add
        </button>
      </div>
      {certifications.length === 0 && (
        <p className="editor-empty">No certifications added yet. Click "+ Add" to get started.</p>
      )}
      {certifications.map((item) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-head">
            <span className="editor-card-index">{certifications.indexOf(item) + 1}</span>
            <button
              type="button"
              className="btn btn-small btn-remove"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
          <div className="grid-2">
            <Field label="Certification">
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
              />
            </Field>
            <Field label="Issuer">
              <input
                type="text"
                value={item.issuer}
                onChange={(e) => onUpdate(item.id, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
              />
            </Field>
          </div>
          <Field label="Year">
            <input
              type="text"
              value={item.year}
              onChange={(e) => onUpdate(item.id, 'year', e.target.value)}
              placeholder="2023"
            />
          </Field>
        </div>
      ))}
    </div>
  )
}

export function LanguagesEditor({ languages, onUpdate, onAdd, onRemove }) {
  return (
    <div className="editor-section">
      <div className="editor-head">
        <h2 className="editor-title">Languages</h2>
        <button type="button" className="btn btn-small btn-add" onClick={onAdd}>
          + Add
        </button>
      </div>
      {languages.length === 0 && (
        <p className="editor-empty">No languages added yet. Click "+ Add" to get started.</p>
      )}
      <div className="skills-list">
        {languages.map((lang) => (
          <div key={lang.id} className="skill-row">
            <input
              type="text"
              value={lang.name}
              onChange={(e) => onUpdate(lang.id, 'name', e.target.value)}
              placeholder="English"
            />
            <input
              className="lang-level"
              value={lang.level}
              onChange={(e) => onUpdate(lang.id, 'level', e.target.value)}
              placeholder="Native / Fluent"
            />
            <button
              type="button"
              className="btn btn-small btn-remove"
              onClick={() => onRemove(lang.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MetricSectionEditor({ title, metricLabel, metricPlaceholder, items, onUpdate, onAdd, onRemove, hint }) {
  return (
    <div className="editor-section">
      <div className="editor-head">
        <h2 className="editor-title">{title}</h2>
        <button type="button" className="btn btn-small btn-add" onClick={onAdd}>
          + Add
        </button>
      </div>
      {hint}
      {items.length === 0 && (
        <p className="editor-empty">No entries added yet. Click "+ Add" to get started.</p>
      )}
      {items.map((item) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-head">
            <span className="editor-card-index">{items.indexOf(item) + 1}</span>
            <button
              type="button"
              className="btn btn-small btn-remove"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
          <Field label={title}>
            <input
              type="text"
              value={item.title}
              onChange={(e) => onUpdate(item.id, 'title', e.target.value)}
              placeholder="e.g. Cloud Cost Optimization"
            />
          </Field>
          <Field label={metricLabel}>
            <input
              type="text"
              value={item.metrics || item.scale || ''}
              onChange={(e) => onUpdate(item.id, 'metrics' in item ? 'metrics' : 'scale', e.target.value)}
              placeholder={metricPlaceholder}
            />
          </Field>
          <Field label="Description">
            <textarea
              rows={3}
              value={item.description}
              onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
              placeholder="What you did and why it mattered..."
            />
          </Field>
        </div>
      ))}
    </div>
  )
}

export function OpenSourceEditor({ opensource, onUpdate, onAdd, onRemove, hint }) {
  return (
    <div className="editor-section">
      <div className="editor-head">
        <h2 className="editor-title">Open Source & GitHub</h2>
        <button type="button" className="btn btn-small btn-add" onClick={onAdd}>
          + Add
        </button>
      </div>
      {hint}
      {opensource.length === 0 && (
        <p className="editor-empty">No repositories added yet. Click "+ Add" to get started.</p>
      )}
      {opensource.map((item) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-head">
            <span className="editor-card-index">{opensource.indexOf(item) + 1}</span>
            <button
              type="button"
              className="btn btn-small btn-remove"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
          <div className="grid-2">
            <Field label="Repository">
              <input
                type="text"
                value={item.repo}
                onChange={(e) => onUpdate(item.id, 'repo', e.target.value)}
                placeholder="react-table-pro"
              />
            </Field>
            <Field label="Link">
              <input
                type="text"
                value={item.link}
                onChange={(e) => onUpdate(item.id, 'link', e.target.value)}
                placeholder="github.com/you/repo"
              />
            </Field>
          </div>
          <Field label="Highlights">
            <textarea
              rows={3}
              value={item.description}
              onChange={(e) => onUpdate(item.id, 'description', e.target.value)}
              placeholder="Stars, contributors, adoption, or what the project does..."
            />
          </Field>
        </div>
      ))}
    </div>
  )
}

export function CaseCompetitionEditor({ caseCompetitions, onUpdate, onAdd, onRemove, hint }) {
  return (
    <div className="editor-section">
      <div className="editor-head">
        <h2 className="editor-title">B-School Case Competitions</h2>
        <button type="button" className="btn btn-small btn-add" onClick={onAdd}>
          + Add
        </button>
      </div>
      {hint}
      {caseCompetitions.length === 0 && (
        <p className="editor-empty">No competitions added yet. Click "+ Add" to get started.</p>
      )}
      {caseCompetitions.map((item) => (
        <div key={item.id} className="editor-card">
          <div className="editor-card-head">
            <span className="editor-card-index">{caseCompetitions.indexOf(item) + 1}</span>
            <button
              type="button"
              className="btn btn-small btn-remove"
              onClick={() => onRemove(item.id)}
            >
              Remove
            </button>
          </div>
          <div className="grid-2">
            <Field label="Competition">
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
                placeholder="National Retail Case Challenge"
              />
            </Field>
            <Field label="Year">
              <input
                type="text"
                value={item.year}
                onChange={(e) => onUpdate(item.id, 'year', e.target.value)}
                placeholder="2023"
              />
            </Field>
          </div>
          <Field label="Outcome">
            <textarea
              rows={3}
              value={item.outcome}
              onChange={(e) => onUpdate(item.id, 'outcome', e.target.value)}
              placeholder="Placement, the problem solved, and tools used..."
            />
          </Field>
        </div>
      ))}
    </div>
  )
}

export function SharpenModal({ text, persona, onApply, onClose }) {
  const [copied, setCopied] = useState(null)
  const variants = useMemo(() => {
    const r = sharpenDescription(text, persona)
    return r
      ? [
          { id: 'metric', name: 'Metric-Driven', desc: 'Quantify impact with metrics or placeholders.', text: r.metric },
          { id: 'action', name: 'Strong Action Verbs', desc: 'Lead with powerful, specific verbs.', text: r.action },
          { id: 'ats', name: 'ATS Optimized', desc: 'Emphasize relevant competencies & keywords.', text: r.ats, keywords: r.atsKeywords },
        ]
      : []
  }, [text, persona])

  const copy = (id, value) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 1200)
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2 className="modal-title">Sharpen Bullet Points</h2>
          <button type="button" className="btn btn-small btn-remove" onClick={onClose}>
            x
          </button>
        </div>
        <p className="modal-sub">
          Pick a rewrite below to replace the description. All rewriting happens on your device.
        </p>
        <div className="sharpen-options">
          {variants.map((v) => (
            <div key={v.id} className="sharpen-card">
              <div className="sharpen-card-head">
                <strong>{v.name}</strong>
                <span className="sharpen-badge">{v.id}</span>
              </div>
              <p className="sharpen-desc">{v.desc}</p>
              <pre className="sharpen-text">{v.text}</pre>
              {v.keywords && (
                <div className="sharpen-keywords">
                  {v.keywords.map((k) => (
                    <span key={k} className="skill-tag">
                      {k}
                    </span>
                  ))}
                </div>
              )}
              <div className="sharpen-actions">
                <button
                  type="button"
                  className="btn btn-small btn-primary"
                  onClick={() => onApply(v.text)}
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="btn btn-small btn-ghost"
                  onClick={() => copy(v.id, v.text)}
                >
                  {copied === v.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
