import { useState, useCallback } from 'react'

/**
 * Abstraction over localStorage — swap for Capacitor's Preferences plugin in the future.
 * All read/write operations go through this hook so the storage layer is isolated.
 */
export function useStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          typeof value === 'function'
            ? (value as (prev: T) => T)(storedValue)
            : value
        setStoredValue(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch {
        // Silently fail — Capacitor swap point
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch {
      // Silently fail
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}

/**
 * Simple one-shot storage helpers (not React state).
 * Useful for reading/writing outside of component lifecycle.
 */
export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : fallback
    } catch {
      return fallback
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Silently fail
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      // Silently fail
    }
  },
}
