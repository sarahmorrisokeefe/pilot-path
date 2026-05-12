import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export interface ToastAction {
  label: string
  path: string
}

interface ToastProps {
  message: string
  visible: boolean
  onDismiss: () => void
  /** Single action (legacy). Use `actions` for multiple. */
  actionLabel?: string
  actionPath?: string
  /** Optional list of actions. If provided, overrides actionLabel/actionPath. */
  actions?: ToastAction[]
  duration?: number
}

export function Toast({
  message,
  visible,
  onDismiss,
  actionLabel,
  actionPath,
  actions,
  duration = 4000,
}: ToastProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [visible, duration, onDismiss])

  const resolvedActions: ToastAction[] =
    actions && actions.length > 0
      ? actions
      : actionLabel && actionPath
      ? [{ label: actionLabel, path: actionPath }]
      : []

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 left-4 right-4 z-50 max-w-lg mx-auto"
        >
          <div className="bg-slate-900 dark:bg-slate-700 text-white rounded-xl px-4 py-3 shadow-lg flex items-center justify-between gap-3">
            <p className="text-sm font-medium flex-1">{message}</p>
            {resolvedActions.length > 0 && (
              <div className="flex items-center gap-2">
                {resolvedActions.map((a, i) => (
                  <button
                    key={`${a.label}-${i}`}
                    onClick={() => {
                      onDismiss()
                      navigate(a.path)
                    }}
                    className="text-sky-400 text-sm font-bold whitespace-nowrap touch-manipulation"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
