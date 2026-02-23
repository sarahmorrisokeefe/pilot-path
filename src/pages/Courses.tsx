import { motion } from 'framer-motion'
import { Layout } from '../components/layout/Layout'
import { CourseCard } from '../components/dashboard/CourseCard'
import { COURSES } from '../data/courses'

export function Courses() {
  return (
    <Layout title="Courses">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Work through each course in order or jump to any topic. Complete modules to unlock the next.
        </p>
        {COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </motion.div>
    </Layout>
  )
}
