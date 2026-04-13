import { useNavigate } from 'react-router-dom'
import type { Course } from '../../types'
import { useProgress } from '../../hooks/useProgress'
import { getCourseCompletion, getCourseXP } from '../../utils'
import { ProgressBar } from '../ui/ProgressBar'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate()
  const { progress } = useProgress()
  const completion = getCourseCompletion(course, progress)
  const xp = getCourseXP(course.id, progress)
  const totalModules = course.modules.length
  const completedModules = course.modules.filter((m) => {
    const modP = progress.courses[course.id]?.modules[m.id]
    if (!modP) return false
    return m.lessons.every((l) => modP.lessonsProgress[l.id]?.completed)
  }).length

  return (
    <div
      onClick={() => navigate(`/learn/${course.id}`)}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform duration-100 touch-manipulation"
    >
      {/* Color banner */}
      <div className={`${course.bgGradient} p-4 flex items-center gap-3`}>
        <span className="text-4xl">{course.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-black text-lg leading-tight">{course.shortTitle}</p>
          <p className="text-white/80 text-xs leading-tight mt-0.5 line-clamp-1">{course.description}</p>
        </div>
        {completion === 100 && (
          <span className="text-2xl flex-shrink-0">🏆</span>
        )}
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {completedModules}/{totalModules} modules
          </span>
          <span className="text-xs font-bold text-amber-500">⭐ {xp} XP</span>
        </div>
        <ProgressBar value={completion} color={course.color} showLabel />
      </div>
    </div>
  )
}
