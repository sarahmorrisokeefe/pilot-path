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
import { PlacementTest } from './pages/PlacementTest'
import { useDarkMode } from './hooks/useDarkMode'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AuthPromptProvider } from './context/AuthPromptContext'
import { RequireAuth } from './components/auth/RequireAuth'

// ─── Routes ─────────────────────────────────────────────────────────────────

function AppRoutes() {
  const { loading } = useAuth()
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

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-bubblegum-cream dark:bg-night-ink flex items-center justify-center">
        <div className="text-center">
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            className="mx-auto h-12 w-12 -rotate-[10deg]"
          />
          <p className="mt-2 text-bubblegum-plum-soft dark:text-night-fg2 text-sm font-bold">Tuning up…</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Courses />} />
      <Route path="/learn/:courseId" element={<CourseDetail />} />
      <Route path="/learn/:courseId/modules/:moduleId" element={<ModuleDetail />} />
      <Route
        path="/learn/:courseId/modules/:moduleId/lessons/:lessonId"
        element={
          <RequireAuth message="Grab a backstage pass to play tracks">
            <Lesson />
          </RequireAuth>
        }
      />
      <Route
        path="/practice"
        element={
          <RequireAuth message="Grab a backstage pass for Practice">
            <PracticeTest />
          </RequireAuth>
        }
      />
      <Route
        path="/review"
        element={
          <RequireAuth message="Grab a backstage pass for Review">
            <WeakAreas />
          </RequireAuth>
        }
      />
      <Route
        path="/progress"
        element={
          <RequireAuth message="Grab a backstage pass to see your records">
            <Progress />
          </RequireAuth>
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/placement"
        element={
          <RequireAuth message="Grab a backstage pass to take the placement test">
            <PlacementTest />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth message="Grab a backstage pass to open Backstage">
            <Settings />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthPromptProvider>
          <AppRoutes />
          <Analytics />
        </AuthPromptProvider>
      </AuthProvider>
      <SpeedInsights />
    </BrowserRouter>
  )
}
