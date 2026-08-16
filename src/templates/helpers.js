export function contactItems(personal) {
  return [
    personal.email && { icon: '@', text: personal.email },
    personal.phone && { icon: '+', text: personal.phone },
    personal.location && { icon: '\u2295', text: personal.location },
    personal.website && { icon: '\u2297', text: personal.website },
  ].filter(Boolean)
}

export function dates(start, end) {
  if (!start && !end) return ''
  if (start && end) return `${start} \u2014 ${end}`
  return start || end
}
