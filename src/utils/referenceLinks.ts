// ─── Reference Link Parser ─────────────────────────────────────────────────
// Converts FAA reference strings (e.g. "14 CFR 91.131", "AIM 7-1-30") into
// clickable URLs. Handles compound references split by " / ".

export interface ParsedReference {
  text: string
  url: string | null
}

// ─── Pattern matchers ──────────────────────────────────────────────────────

function matchCFR14(segment: string): string | null {
  const s = segment.trim()

  // "14 CFR 91.131" — part + section (most common)
  const withSection = /^14\s+CFR\s+(\d+)\.(\d+[a-z]?)$/i.exec(s)
  if (withSection) {
    const [, part, section] = withSection
    return `https://www.faraim.org/faa/far/cfr/title-14/part-${part}/section-${part}.${section}.html`
  }

  // "14 CFR 91.137-91.145" — range; link to the first section
  const range = /^14\s+CFR\s+(\d+)\.(\d+)-\d+\.\d+$/i.exec(s)
  if (range) {
    const [, part, section] = range
    return `https://www.faraim.org/faa/far/cfr/title-14/part-${part}/section-${part}.${section}.html`
  }

  // "14 CFR Part 119" or "14 CFR Part 135"
  const withPartWord = /^14\s+CFR\s+Part\s+(\d+)$/i.exec(s)
  if (withPartWord) {
    return `https://www.faraim.org/faa/far/cfr/title-14/part-${withPartWord[1]}/`
  }

  // "14 CFR 71" — bare part number, no dot, no "Part" keyword
  const bareNumber = /^14\s+CFR\s+(\d+)$/i.exec(s)
  if (bareNumber) {
    return `https://www.faraim.org/faa/far/cfr/title-14/part-${bareNumber[1]}/`
  }

  return null
}

function matchCFR49(segment: string): string | null {
  // "49 CFR 830.15"
  const m = /^49\s+CFR\s+(\d+)\.(\d+)$/i.exec(segment.trim())
  if (m) {
    const [, part, section] = m
    return `https://www.ecfr.gov/current/title-49/part-${part}/section-${part}.${section}`
  }
  return null
}

function matchAIM(segment: string): string | null {
  // "AIM 7-1-30" or "AIM 7-1" — chapter + section (paragraph ignored for URL)
  const m = /^AIM\s+(\d+)-(\d+)(?:-\d+)?$/i.exec(segment.trim())
  if (m) {
    const [, chap, section] = m
    return `https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap${chap}_section_${section}.html`
  }
  // "AIM 3-4" short form
  const short = /^AIM\s+(\d+)-(\d+)$/i.exec(segment.trim())
  if (short) {
    const [, chap, section] = short
    return `https://www.faa.gov/air_traffic/publications/atpubs/aim_html/chap${chap}_section_${section}.html`
  }
  return null
}

// Known FAA handbook codes → canonical URLs.
// The `Ch.N` / `Chapter N` suffix is stripped before lookup.
const HANDBOOK_URLS: Record<string, string> = {
  'FAA-H-8083-25B': 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak',
  'FAA-H-8083-28A': 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/instrument_flying_handbook',
  'FAA-H-8083-15B': 'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/instrument_procedures_handbook',
  'FAA-H-8083-3C':  'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/airplane_handbook',
  'FAA-H-8083-3B':  'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/airplane_handbook',
  'FAA-H-8083-1B':  'https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/media/FAA-H-8083-1B.pdf',
}

function matchHandbook(segment: string): string | null {
  // Strip trailing chapter/section suffixes: " Chapter 7", " Ch.7", " Ch. 7"
  const base = segment.trim()
    .replace(/\s+Chapter\s+\d+.*/i, '')
    .replace(/\s+Ch\.?\s*\d+.*/i, '')
    .trim()
  return HANDBOOK_URLS[base] ?? null
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Parses a FAA reference string into one or more {text, url} objects.
 * Handles compound references separated by " / " (e.g. "14 CFR 91.131 / AIM 7-1-6").
 * Returns url: null for unrecognised formats — render as plain text, no crash.
 */
export function parseReference(ref: string): ParsedReference[] {
  if (!ref?.trim()) return []

  return ref
    .split(' / ')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((segment) => ({
      text: segment,
      url:
        matchCFR14(segment) ??
        matchCFR49(segment) ??
        matchAIM(segment) ??
        matchHandbook(segment) ??
        null,
    }))
}
