import { useMemo } from 'react'
import { analyzeMatch } from '../ats'

export default function JobMatcher({ resume, jobTarget, onJobTargetChange, onInsertSkill, onClose }) {
  const analysis = useMemo(() => analyzeMatch(resume, jobTarget.text), [resume, jobTarget.text])

  const metric = analysis.metricDensity
  const metricHint =
    metric.count >= 3
      ? 'This role rewards quantified impact (percentages, budgets, scale metrics). Make sure your bullets include numbers.'
      : metric.count > 0
        ? 'This job description mentions some metrics. Try to include similar quantification in your bullets.'
        : 'No obvious metric signals in this description. ATS matching still works via keywords.'

  return (
    <div className="matcher-overlay">
      <aside className="matcher-drawer">
        <div className="matcher-head">
          <h2 className="matcher-title">Target Job Matching</h2>
          <button type="button" className="btn btn-small btn-remove" onClick={onClose}>
            x
          </button>
        </div>

        <label className="field">
          <span className="field-label">Paste the job description</span>
          <textarea
            rows={8}
            value={jobTarget.text}
            onChange={(e) => onJobTargetChange({ ...jobTarget, text: e.target.value })}
            placeholder="Paste a job description here. Keywords are extracted and matched against your resume in real time..."
          />
        </label>

        {jobTarget.text.trim() && (
          <div className="matcher-results">
            <div className="match-score-row">
              <span className="match-score-label">Resume match</span>
              <span className={`match-score-value ${analysis.score >= 70 ? 'good' : analysis.score >= 40 ? 'ok' : 'low'}`}>
                {analysis.score}%
              </span>
              <div className="match-bar">
                <div className="match-bar-fill" style={{ width: `${analysis.score}%` }} />
              </div>
            </div>

            <p className="matcher-hint">{metricHint}</p>

            <div className="matcher-group">
              <h3 className="matcher-group-title">
                Missing ({analysis.missing.length})
              </h3>
              {analysis.missing.length === 0 && (
                <p className="matcher-empty">All detected skills are covered. Nice work!</p>
              )}
              <div className="matcher-chips">
                {analysis.missing.map((item) => (
                  <div key={item.name} className="matcher-chip missing">
                    <span className="matcher-chip-name">{item.name}</span>
                    <span className="matcher-chip-cat">{item.category}</span>
                    <button
                      type="button"
                      className="btn btn-small btn-add"
                      onClick={() => onInsertSkill(item.name, item.category)}
                    >
                      Insert
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="matcher-group">
              <h3 className="matcher-group-title">
                Covered ({analysis.matched.length})
              </h3>
              <div className="matcher-chips">
                {analysis.matched.map((item) => (
                  <span key={item.name} className="matcher-chip covered">
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {!jobTarget.text.trim() && (
          <p className="matcher-empty matcher-tip">
            Tip: skills are matched against your summary, experience, projects, and categorized skills.
            High-impact keywords you are missing get an "Insert" button that adds them to your Skills section.
          </p>
        )}
      </aside>
    </div>
  )
}
