import { useEffect } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Home } from './pages/Home'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { ModuleDetail } from './pages/ModuleDetail'
import { Lesson } from './pages/Lesson'
import { PracticeTest } from './pages/PracticeTest'
import { WeakAreas } from './pages/WeakAreas'
import { Progress } from './pages/Progress'
import { Auth } from './pages/Auth'
import { Settings } from './pages/Settings'
import { useDarkMode } from './hooks/useDarkMode'
import { useProgress, pushProgressToSupabase } from './hooks/useProgress'
import { AuthProvider, useAuth } from './context/AuthContext'

// ─── Background cloud sync ──────────────────────────────────────────────────
// Renderless component: syncs progress to Supabase whenever it changes while
// the user is signed in, and loads remote progress on sign-in.

function ProgressSyncEffect() {
  const { user } = useAuth()
  const { progress, loadFromSupabase } = useProgress()

  // On sign-in: fetch remote progress and merge (remote wins if totalXP >= local)
  useEffect(() => {
    if (user) {
      loadFromSupabase(user.id)
    }
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // On any progress change while signed in: push to Supabase (fire-and-forget)
  useEffect(() => {
    if (user) {
      pushProgressToSupabase(user.id, progress)
    }
  }, [progress, user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

// ─── Routes ─────────────────────────────────────────────────────────────────

function AppRoutes() {
  // Initialize dark mode on mount
  const { isDark } = useDarkMode()

  // Add platform class so CSS can target native-only styles
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      document.body.classList.add('cap-native')
    }
  }, [])

  // Sync iOS status bar style with dark mode
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return
    StatusBar.setStyle({ style: isDark ? Style.Light : Style.Dark }).catch(() => {})
  }, [isDark])

  return (
    <>
      <ProgressSyncEffect />
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
        <Route path="/auth" element={<Auth />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Analytics />
      </AuthProvider>
      <SpeedInsights />
    </BrowserRouter>
  )
}
