import type { BubblegumTone } from '../components/bubblegum'

const ALBUM_TONES: Record<string, BubblegumTone> = {
  'notation-basics':  'lavender',
  'rhythm-and-meter': 'peach',
  'scales-and-keys':  'pink',
  'intervals':        'sky',
  'chords':           'mint',
}

export function getAlbumTone(
  courseId: string,
  fallback: BubblegumTone = 'cream'
): BubblegumTone {
  return ALBUM_TONES[courseId] ?? fallback
}

export const TONE_BG: Record<BubblegumTone, string> = {
  butter:   'bg-bubblegum-butter',
  peach:    'bg-bubblegum-peach',
  mint:     'bg-bubblegum-mint',
  sky:      'bg-bubblegum-sky',
  lavender: 'bg-bubblegum-lavender',
  pink:     'bg-bubblegum-pink',
  cherry:   'bg-bubblegum-cherry',
  plum:     'bg-bubblegum-plum',
  white:    'bg-white',
  cream:    'bg-bubblegum-cream-hi',
}

/** Module index → "A", "B", "C", … (zero-based) */
export function moduleLetter(idx: number): string {
  return String.fromCharCode(65 + idx)
}

/** "A1", "B2", … — lesson label combining module letter + 1-based lesson position */
export function trackLabel(moduleIdx: number, lessonIdx: number): string {
  return `${moduleLetter(moduleIdx)}${lessonIdx + 1}`
}
