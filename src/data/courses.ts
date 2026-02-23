import type { Course } from '../types'
import { groundSchoolModules } from './groundSchool'
import { pplModules } from './ppl'
import { irModules } from './ir'
import { cplModules } from './cpl'

export const COURSES: Course[] = [
  {
    id: 'ground-school',
    title: 'Ground School Basics',
    shortTitle: 'Ground School',
    description: 'Airspace, weather, charts, regulations & aerodynamics fundamentals',
    icon: '🎓',
    color: 'bg-emerald-500',
    bgGradient: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    modules: groundSchoolModules,
    testConfig: {
      questionCount: 60,
      timeLimit: 150,
      passingScore: 70,
    },
  },
  {
    id: 'ppl',
    title: 'Private Pilot License',
    shortTitle: 'PPL',
    description: 'FAA PAR written exam — all topics for the private pilot certificate',
    icon: '🛩️',
    color: 'bg-sky-500',
    bgGradient: 'bg-gradient-to-r from-sky-500 to-blue-600',
    modules: pplModules,
    testConfig: {
      questionCount: 60,
      timeLimit: 150,
      passingScore: 70,
    },
  },
  {
    id: 'ir',
    title: 'Instrument Rating',
    shortTitle: 'Instrument Rating',
    description: 'IFR procedures, approaches, holds, weather minimums & IFR planning',
    icon: '🌫️',
    color: 'bg-violet-500',
    bgGradient: 'bg-gradient-to-r from-violet-500 to-purple-700',
    modules: irModules,
    testConfig: {
      questionCount: 60,
      timeLimit: 180,
      passingScore: 70,
    },
  },
  {
    id: 'cpl',
    title: 'Commercial Pilot Certificate',
    shortTitle: 'Commercial',
    description: 'Commercial FARs, complex aircraft, performance & advanced operations',
    icon: '🏆',
    color: 'bg-amber-500',
    bgGradient: 'bg-gradient-to-r from-amber-500 to-orange-600',
    modules: cplModules,
    testConfig: {
      questionCount: 100,
      timeLimit: 180,
      passingScore: 70,
    },
  },
]

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id)
}
