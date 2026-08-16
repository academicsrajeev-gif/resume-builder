import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import {
  accentColors,
  fontPairings,
  getSectionLabel,
  getSectionOrder,
  getSectionHint,
  pageSizes,
  personaLevels,
  personas,
  skillCategories,
  templates,
} from './data'
import { exportResumeJSON, importResumeJSON, useResume } from './useResume'
import { generateCoverLetter } from './coverLetter'
import {
  PersonalEditor,
  ExperienceEditor,
  ProjectsEditor,
  EducationEditor,
  SkillsEditor,
  CertificationsEditor,
  LanguagesEditor,
  OpenSourceEditor,
  CaseCompetitionEditor,
  MetricSectionEditor,
  SharpenModal,
} from './components/Editor'
import JobMatcher from './components/JobMatcher'
import TemplateTech from './templates/TemplateModern'
import TemplateExecutive from './templates/TemplateSidebar'
import TemplateMinimal from './templates/TemplateMinimal'
import TemplateClassic from './templates/TemplateClassic'

const templateComponents = {
  tech: TemplateTech,
  executive: TemplateExecutive,
  minimal: TemplateMinimal,
  classic: TemplateClassic,
}

function PageFit({ autoFit, pages, pageSize, resume, templateId, persona, level, view, pageRef }) {
  useEffect(() => {
    const page = pageRef.current
    if (!page) return
    const pageHeight = (pageSizes.find((p) => p.id === pageSize) || pageSizes[0]).height
    const target = pageHeight * pages - (pages > 1 ? 10 : 2)
    let font = 13
    let line = 1.55
    let section = 26
    let entry = 16

    if (autoFit) {
      page.style.setProperty('--fit-font', `${font}px`)
      page.style.setProperty('--fit-line', String(line))
      page.style.setProperty('--fit-section', `${section}px`)
      page.style.setProperty('--fit-entry', `${entry}px`)
      void page.offsetHeight
      let height = page.scrollHeight

      while (height > target && font > 9.5) {
        font = Math.max(9.5, font - 0.25)
        page.style.setProperty('--fit-font', `${font}px`)
        void page.offsetHeight
        height = page.scrollHeight
      }
      while (height > target && line > 1.15) {
        line -= 0.05
        page.style.setProperty('--fit-line', String(line))
        void page.offsetHeight
        height = page.scrollHeight
      }
      while (height > target && section > 10) {
        section -= 2
        entry = Math.max(6, entry - 1)
        page.style.setProperty('--fit-section', `${section}px`)
        page.style.setProperty('--fit-entry', `${entry}px`)
        void page.offsetHeight
        height = page.scrollHeight
      }
    } else {
      page.style.setProperty('--fit-font', `${font}px`)
      page.style.setProperty('--fit-line', String(line))
      page.style.setProperty('--fit-section', `${section}px`)
      page.style.setProperty('--fit-entry', `${entry}px`)
    }
  }, [autoFit, pages, pageSize, resume, templateId, persona, level, view, pageRef])

  return null
}

function App() {
  const resumeApi = useResume()
  const { resume } = resumeApi
  const [view, setView] = useState('resume')
  const [templateId, setTemplateId] = useState('tech')
  const [accent, setAccent] = useState('#2563eb')
  const [zoom, setZoom] = useState(80)
  const [activeSection, setActiveSection] = useState('personal')
  const [persona, setPersona] = useState('tech')
  const [level, setLevel] = useState('senior')
  const [pageSize, setPageSize] = useState('a4')
  const [pages, setPages] = useState(1)
  const [autoFit, setAutoFit] = useState(false)
  const [fontPair, setFontPair] = useState(fontPairings[0])
  const [showMatcher, setShowMatcher] = useState(false)
  const [sharpenTarget, setSharpenTarget] = useState(null)
  const [coverRole, setCoverRole] = useState('')
  const [coverCompany, setCoverCompany] = useState('')
  const fileInputRef = useRef(null)
  const pageRef = useRef(null)

  const Template = templateComponents[templateId]
  const categories = skillCategories[persona] || skillCategories.tech
  const levels = personaLevels[persona] || personaLevels.tech
  const sectionOrder = getSectionOrder(persona, level)

  useEffect(() => {
    const styleId = 'page-size-style'
    let el = document.getElementById(styleId)
    if (!el) {
      el = document.createElement('style')
      el.id = styleId
      document.head.appendChild(el)
    }
    const size = pageSize === 'a4' ? 'A4' : 'Letter'
    el.textContent = `@media print { @page { size: ${size}; margin: 0; } }`
    return () => {
      document.getElementById(styleId)?.remove()
    }
  }, [pageSize])

  const pageStyle = useMemo(
    () => ({
      '--fit-font': '13px',
      '--fit-line': '1.55',
      '--fit-section': '26px',
      '--fit-entry': '16px',
      '--resume-body': fontPair.body,
      '--resume-heading': fontPair.heading,
      '--resume-mono': fontPair.mono,
    }),
    [fontPair],
  )

  const insertSkill = (name, category) => {
    resumeApi.insertSkill(name, category)
  }

  const handlePrint = () => window.print()

  const handleExport = () => exportResumeJSON(resume)

  const handleImportFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = importResumeJSON(String(reader.result), resumeApi.setAll)
      window.alert(result.ok ? 'Resume imported successfully.' : result.error)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const generateCover = () =>
    resumeApi.setCoverLetter(generateCoverLetter(resume, coverRole, coverCompany))

  const editorSections = [
    { id: 'personal', label: 'Personal', component: <PersonalEditor personal={resume.personal} onChange={resumeApi.updatePersonal} /> },
    ...sectionOrder.map((section) => ({
      id: section,
      label: getSectionLabel(persona, level, section),
      component: buildSectionEditor(section, resumeApi, resume, persona, level, categories, setSharpenTarget),
    })),
  ]

  const activeEditor = editorSections.find((s) => s.id === activeSection)
  const sharpenEntry = sharpenTarget
    ? resume.experience.find((item) => item.id === sharpenTarget)
    : null

  return (
    <div className={`app view-${view}`}>
      <header className="app-header">
        <h1 className="app-logo">Resume Maker</h1>
        <span className="app-tag">Free online resume builder</span>
        <div className="view-switch">
          <button
            type="button"
            className={`view-btn ${view === 'resume' ? 'active' : ''}`}
            onClick={() => setView('resume')}
          >
            Resume
          </button>
          <button
            type="button"
            className={`view-btn ${view === 'cover' ? 'active' : ''}`}
            onClick={() => setView('cover')}
          >
            Cover Letter
          </button>
        </div>
        <div className="header-actions">
          {view === 'resume' && (
            <button type="button" className="btn btn-ghost" onClick={() => setShowMatcher(true)}>
              Target Job Matching
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={resumeApi.loadSample}>
            Load sample
          </button>
          <button type="button" className="btn btn-ghost" onClick={resumeApi.clearAll}>
            Clear
          </button>
          <button type="button" className="btn btn-ghost" onClick={handleExport}>
            Export JSON
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => fileInputRef.current?.click()}
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            style={{ display: 'none' }}
            onChange={handleImportFile}
          />
          <button type="button" className="btn btn-primary" onClick={handlePrint}>
            Download PDF
          </button>
        </div>
      </header>

      <div className="toolbar">
        <div className="toolbar-group">
          <span className="toolbar-label">Persona</span>
          <select
            className="toolbar-select"
            value={persona}
            onChange={(e) => {
              setPersona(e.target.value)
              setActiveSection('personal')
            }}
          >
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="toolbar-group">
          <span className="toolbar-label">Level</span>
          <select
            className="toolbar-select"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value)
              setActiveSection('personal')
            }}
          >
            {levels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <div className="toolbar-group">
          <span className="toolbar-label">Template</span>
          <div className="template-picker">
            {templates.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`template-btn ${templateId === t.id ? 'active' : ''}`}
                onClick={() => setTemplateId(t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <div className="toolbar-group">
          <span className="toolbar-label">Fonts</span>
          <select
            className="toolbar-select"
            value={fontPair.id}
            onChange={(e) => setFontPair(fontPairings.find((f) => f.id === e.target.value))}
          >
            {fontPairings.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <div className="toolbar-group">
          <span className="toolbar-label">Accent</span>
          <div className="color-picker">
            {accentColors.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`color-swatch ${accent === c.value ? 'active' : ''}`}
                style={{ background: c.value }}
                title={c.name}
                onClick={() => setAccent(c.value)}
              />
            ))}
          </div>
        </div>
        <div className="toolbar-group">
          <span className="toolbar-label">Paper</span>
          <select
            className="toolbar-select"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            {pageSizes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div className="toolbar-group">
          <span className="toolbar-label">Pages</span>
          <select
            className="toolbar-select"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
          >
            <option value={1}>1 page</option>
            <option value={2}>2 pages</option>
          </select>
        </div>
        <div className="toolbar-group">
          <label className="toggle">
            <input
              type="checkbox"
              checked={autoFit}
              onChange={(e) => setAutoFit(e.target.checked)}
            />
            <span>Auto-Fit</span>
          </label>
        </div>
        <div className="toolbar-group">
          <span className="toolbar-label">Zoom</span>
          <input
            type="range"
            min="50"
            max="120"
            step="5"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
          <span className="zoom-value">{zoom}%</span>
        </div>
      </div>

      <div className="workspace">
        {view === 'resume' ? (
          <>
            <aside className="editor-panel">
              <nav className="section-nav">
                {editorSections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`nav-btn ${activeSection === s.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
              <div className="editor-scroll">
                {activeEditor && <div className="editor-pane">{activeEditor.component}</div>}
              </div>
            </aside>

            <main className="preview-panel">
              <div className="resume-scroll" style={{ transform: `scale(${zoom / 100})` }}>
                <div ref={pageRef} className="resume-page" style={pageStyle}>
                  <Template resume={resume} accent={accent} persona={persona} level={level} />
                </div>
              </div>
            </main>
          </>
        ) : (
          <>
            <aside className="editor-panel cover-editor">
              <div className="editor-section">
                <h2 className="editor-title">Cover Letter</h2>
                <p className="editor-hint">
                  Auto-populated from your resume. Edit freely, then export to PDF with the same
                  typography as your resume.
                </p>
                <div className="grid-2">
                  <Field label="Target Role">
                    <input
                      type="text"
                      value={coverRole}
                      onChange={(e) => setCoverRole(e.target.value)}
                      placeholder="Senior Frontend Engineer"
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      type="text"
                      value={coverCompany}
                      onChange={(e) => setCoverCompany(e.target.value)}
                      placeholder="Acme Corp"
                    />
                  </Field>
                </div>
                <button type="button" className="btn btn-primary" onClick={generateCover}>
                  Generate from Resume
                </button>
                <div style={{ marginTop: 16 }}>
                  <Field label="Letter text">
                    <textarea
                      rows={24}
                      value={resumeApi.coverLetter}
                      onChange={(e) => resumeApi.setCoverLetter(e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </aside>

            <main className="preview-panel">
              <div className="resume-scroll" style={{ transform: `scale(${zoom / 100})` }}>
                <div className="cover-letter-page" style={pageStyle}>
                  <pre className="cover-letter-text">{resumeApi.coverLetter}</pre>
                </div>
              </div>
            </main>
          </>
        )}
      </div>

      <footer className="app-footer">
        <p>
          Your data is saved automatically in your browser and never leaves your device. JSON backups
          keep you in full control of your data.
        </p>
      </footer>

      {showMatcher && (
        <JobMatcher
          resume={resume}
          jobTarget={resumeApi.jobTarget}
          onJobTargetChange={resumeApi.setJobTarget}
          onInsertSkill={insertSkill}
          onClose={() => setShowMatcher(false)}
        />
      )}

      {sharpenEntry && (
        <SharpenModal
          text={sharpenEntry.description}
          persona={persona}
          onApply={(text) => {
            resumeApi.experience.update(sharpenEntry.id, 'description', text)
            setSharpenTarget(null)
          }}
          onClose={() => setSharpenTarget(null)}
        />
      )}

      <PageFit
        autoFit={autoFit}
        pages={pages}
        pageSize={pageSize}
        resume={resume}
        templateId={templateId}
        persona={persona}
        level={level}
        view={view}
        pageRef={pageRef}
      />
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  )
}

function buildSectionEditor(section, resumeApi, resume, persona, level, categories, setSharpenTarget) {
  switch (section) {
    case 'experience':
      return (
        <ExperienceEditor
          experience={resume.experience}
          onUpdate={resumeApi.experience.update}
          onAdd={resumeApi.experience.add}
          onRemove={resumeApi.experience.remove}
          onSharpen={setSharpenTarget}
          persona={persona}
          level={level}
        />
      )
    case 'projects':
      return (
        <ProjectsEditor
          projects={resume.projects}
          onUpdate={resumeApi.projects.update}
          onAdd={resumeApi.projects.add}
          onRemove={resumeApi.projects.remove}
          persona={persona}
          level={level}
        />
      )
    case 'architecture':
      return (
        <MetricSectionEditor
          title="System Architecture"
          metricLabel="Scale"
          metricPlaceholder="e.g. 12M req/day, 3 regions, p95 250ms"
          items={resume.architecture}
          onUpdate={resumeApi.architecture.update}
          onAdd={resumeApi.architecture.add}
          onRemove={resumeApi.architecture.remove}
          hint={<Hint persona={persona} level={level} section="architecture" />}
        />
      )
    case 'infrastructure':
      return (
        <MetricSectionEditor
          title="Cloud & Scale Metrics"
          metricLabel="Metrics"
          metricPlaceholder="e.g. QPS 15k, latency -40%, AWS $48k/mo saved"
          items={resume.infrastructure}
          onUpdate={resumeApi.infrastructure.update}
          onAdd={resumeApi.infrastructure.add}
          onRemove={resumeApi.infrastructure.remove}
          hint={<Hint persona={persona} level={level} section="infrastructure" />}
        />
      )
    case 'financials':
      return (
        <MetricSectionEditor
          title="P&L & Financial Metrics"
          metricLabel="Metrics"
          metricPlaceholder="e.g. ARR +34% YoY, $4.2M, opex -12%"
          items={resume.financials}
          onUpdate={resumeApi.financials.update}
          onAdd={resumeApi.financials.add}
          onRemove={resumeApi.financials.remove}
          hint={<Hint persona={persona} level={level} section="financials" />}
        />
      )
    case 'strategy':
      return (
        <MetricSectionEditor
          title="Strategic Projects"
          metricLabel="Metrics"
          metricPlaceholder="e.g. 3 new markets, +18% revenue"
          items={resume.strategy}
          onUpdate={resumeApi.strategy.update}
          onAdd={resumeApi.strategy.add}
          onRemove={resumeApi.strategy.remove}
          hint={<Hint persona={persona} level={level} section="strategy" />}
        />
      )
    case 'leadership':
      return (
        <MetricSectionEditor
          title="Leadership Highlights"
          metricLabel="Metrics"
          metricPlaceholder="e.g. Managed 28 FTEs, team scale"
          items={resume.leadership}
          onUpdate={resumeApi.leadership.update}
          onAdd={resumeApi.leadership.add}
          onRemove={resumeApi.leadership.remove}
          hint={<Hint persona={persona} level={level} section="leadership" />}
        />
      )
    case 'opensource':
      return (
        <OpenSourceEditor
          opensource={resume.opensource}
          onUpdate={resumeApi.opensource.update}
          onAdd={resumeApi.opensource.add}
          onRemove={resumeApi.opensource.remove}
          hint={<Hint persona={persona} level={level} section="opensource" />}
        />
      )
    case 'caseCompetitions':
      return (
        <CaseCompetitionEditor
          caseCompetitions={resume.caseCompetitions}
          onUpdate={resumeApi.caseCompetitions.update}
          onAdd={resumeApi.caseCompetitions.add}
          onRemove={resumeApi.caseCompetitions.remove}
          hint={<Hint persona={persona} level={level} section="caseCompetitions" />}
        />
      )
    case 'education':
      return (
        <EducationEditor
          education={resume.education}
          onUpdate={resumeApi.education.update}
          onAdd={resumeApi.education.add}
          onRemove={resumeApi.education.remove}
          persona={persona}
          level={level}
        />
      )
    case 'skills':
      return (
        <SkillsEditor
          skills={resume.skills}
          categories={categories}
          onUpdate={resumeApi.skills.update}
          onAdd={resumeApi.skills.add}
          onRemove={resumeApi.skills.remove}
          persona={persona}
          level={level}
        />
      )
    case 'certifications':
      return (
        <CertificationsEditor
          certifications={resume.certifications}
          onUpdate={resumeApi.certifications.update}
          onAdd={resumeApi.certifications.add}
          onRemove={resumeApi.certifications.remove}
        />
      )
    case 'languages':
      return (
        <LanguagesEditor
          languages={resume.languages}
          onUpdate={resumeApi.languages.update}
          onAdd={resumeApi.languages.add}
          onRemove={resumeApi.languages.remove}
        />
      )
    default:
      return null
  }
}

function Hint({ persona, level, section }) {
  const hint = getSectionHint(persona, level, section)
  if (!hint) return null
  return <p className="editor-hint">{hint}</p>
}

export default App
