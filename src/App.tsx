import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { ModuleDetail } from './pages/ModuleDetail'
import { Lesson } from './pages/Lesson'
import { PracticeTest } from './pages/PracticeTest'
import { WeakAreas } from './pages/WeakAreas'
import { Progress } from './pages/Progress'
import { useDarkMode } from './hooks/useDarkMode'

function AppRoutes() {
  // Initialize dark mode on mount
  useDarkMode()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      <Route path="/courses/:courseId/modules/:moduleId" element={<ModuleDetail />} />
      <Route path="/courses/:courseId/modules/:moduleId/lessons/:lessonId" element={<Lesson />} />
      <Route path="/practice" element={<PracticeTest />} />
      <Route path="/practice/:courseId" element={<PracticeTest />} />
      <Route path="/weak-areas" element={<WeakAreas />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
