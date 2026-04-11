import type { Course } from '../types'

export const COURSES: Course[] = [
  {
    id: 'notation-basics',
    title: 'Notation Basics',
    shortTitle: 'Notation',
    description:
      'Learn to read the staff, identify clefs, and understand accidentals.',
    icon: '🎼',
    color: 'cadence-800',
    bgGradient: 'bg-gradient-to-br from-cadence-800 to-cadence-600',
    modules: [],
    testConfig: { questionCount: 15, timeLimit: 10, passingScore: 70 },
  },
  {
    id: 'rhythm-and-meter',
    title: 'Rhythm & Meter',
    shortTitle: 'Rhythm',
    description:
      'Master note values, time signatures, and rhythmic patterns.',
    icon: '🥁',
    color: 'copper-500',
    bgGradient: 'bg-gradient-to-br from-copper-500 to-copper-700',
    modules: [],
    testConfig: { questionCount: 15, timeLimit: 10, passingScore: 70 },
  },
  {
    id: 'scales-and-keys',
    title: 'Scales & Keys',
    shortTitle: 'Scales',
    description:
      'Explore major and minor scales, key signatures, and the circle of fifths.',
    icon: '🎹',
    color: 'cadence-600',
    bgGradient: 'bg-gradient-to-br from-cadence-600 to-cadence-800',
    modules: [],
    testConfig: { questionCount: 20, timeLimit: 15, passingScore: 70 },
  },
  {
    id: 'intervals',
    title: 'Intervals',
    shortTitle: 'Intervals',
    description:
      'Identify and construct intervals — the building blocks of harmony.',
    icon: '📏',
    color: 'copper-600',
    bgGradient: 'bg-gradient-to-br from-copper-600 to-copper-500',
    modules: [],
    testConfig: { questionCount: 20, timeLimit: 15, passingScore: 70 },
  },
  {
    id: 'chords',
    title: 'Chords',
    shortTitle: 'Chords',
    description:
      'Build and identify triads, inversions, and seventh chords.',
    icon: '🎸',
    color: 'cadence-700',
    bgGradient: 'bg-gradient-to-br from-cadence-700 to-cadence-900',
    modules: [],
    testConfig: { questionCount: 20, timeLimit: 15, passingScore: 70 },
  },
]

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id)
}
