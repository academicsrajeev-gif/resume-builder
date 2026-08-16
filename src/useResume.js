import { useEffect, useState } from 'react'
import { emptyResume, mergeResume, sampleResume, skillCategories } from './data'

const STORAGE_KEY = 'resume-maker-data-v1'
const COVER_KEY = 'resume-maker-cover-v1'
const JOB_KEY = 'resume-maker-jobtarget-v1'

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return mergeResume(emptyResume, JSON.parse(raw))
  } catch {
    // ignore corrupt storage
  }
  return sampleResume
}

function loadJson(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage may be unavailable; ignore
  }
}

function listHandlers(setResume, field, defaults) {
  const add = () =>
    setResume((r) => ({
      ...r,
      [field]: [...(r[field] || []), { ...defaults, id: `${field}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }],
    }))
  const update = (id, key, value) =>
    setResume((r) => ({
      ...r,
      [field]: (r[field] || []).map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }))
  const remove = (id) =>
    setResume((r) => ({
      ...r,
      [field]: (r[field] || []).filter((item) => item.id !== id),
    }))
  return { add, update, remove }
}

export function useResume() {
  const [resume, setResume] = useState(loadInitial)
  const [coverLetter, setCoverLetter] = useState(() => loadJson(COVER_KEY) || '')
  const [jobTarget, setJobTarget] = useState(() => loadJson(JOB_KEY) || { text: '' })

  useEffect(() => {
    saveJson(STORAGE_KEY, resume)
  }, [resume])

  useEffect(() => {
    saveJson(COVER_KEY, coverLetter)
  }, [coverLetter])

  useEffect(() => {
    saveJson(JOB_KEY, jobTarget)
  }, [jobTarget])

  const updatePersonal = (field, value) =>
    setResume((r) => ({
      ...r,
      personal: { ...r.personal, [field]: value },
    }))

  const experience = listHandlers(setResume, 'experience', {
    company: '', position: '', location: '', startDate: '', endDate: '', description: '',
  })
  const projects = listHandlers(setResume, 'projects', {
    name: '', link: '', tech: '', description: '',
  })
  const architecture = listHandlers(setResume, 'architecture', {
    title: '', scale: '', description: '',
  })
  const opensource = listHandlers(setResume, 'opensource', {
    repo: '', link: '', description: '',
  })
  const infrastructure = listHandlers(setResume, 'infrastructure', {
    title: '', metrics: '', description: '',
  })
  const education = listHandlers(setResume, 'education', {
    school: '', degree: '', location: '', startDate: '', endDate: '', description: '',
  })
  const skills = listHandlers(setResume, 'skills', { name: '', category: 'Other' })
  const certifications = listHandlers(setResume, 'certifications', {
    name: '', issuer: '', year: '',
  })
  const languages = listHandlers(setResume, 'languages', { name: '', level: '' })
  const financials = listHandlers(setResume, 'financials', {
    title: '', metrics: '', description: '',
  })
  const strategy = listHandlers(setResume, 'strategy', {
    title: '', metrics: '', description: '',
  })
  const caseCompetitions = listHandlers(setResume, 'caseCompetitions', {
    name: '', year: '', outcome: '',
  })
  const leadership = listHandlers(setResume, 'leadership', {
    title: '', metrics: '', description: '',
  })

  const insertSkill = (name, category) =>
    setResume((r) => ({
      ...r,
      skills: [
        ...(r.skills || []),
        {
          id: `skill-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name,
          category: category && skillCategories.tech.concat(skillCategories.mba).includes(category) ? category : 'Other',
        },
      ],
    }))

  const loadSample = () => setResume(sampleResume)
  const clearAll = () => setResume(emptyResume)
  const setAll = (data) => setResume(mergeResume(emptyResume, data))

  return {
    resume,
    coverLetter,
    setCoverLetter,
    jobTarget,
    setJobTarget,
    updatePersonal,
    experience,
    projects,
    architecture,
    opensource,
    infrastructure,
    education,
    skills,
    certifications,
    languages,
    financials,
    strategy,
    caseCompetitions,
    leadership,
    insertSkill,
    loadSample,
    clearAll,
    setAll,
  }
}

export function exportResumeJSON(resume) {
  const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'resume-data.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function importResumeJSON(text, onSuccess) {
  try {
    const data = JSON.parse(text)
    if (!data || typeof data !== 'object') throw new Error('Invalid data')
    const cleaned = mergeResume(emptyResume, data)
    onSuccess(cleaned)
    return { ok: true }
  } catch {
    return { ok: false, error: 'Import failed. Please choose a valid resume-data.json backup file.' }
  }
}
