import { useState, useCallback, useEffect } from 'react'
import { Preferences } from '@capacitor/preferences'
import { Capacitor } from '@capacitor/core'

const isNative = Capacitor.isNativePlatform()

/**
 * Cross-platform storage abstraction.
 * Uses Capacitor Preferences on native iOS/Android, localStorage on web.
 * All methods are async.
 */
export const storage = {
  get: async (key: string) => {
    if (isNative) {
      const { value } = await Preferences.get({ key })
      return value ? JSON.parse(value) : null
    }
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },
  set: async (key: string, value: unknown) => {
    if (isNative) {
      await Preferences.set({ key, value: JSON.stringify(value) })
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  remove: async (key: string) => {
    if (isNative) {
      await Preferences.remove({ key })
    } else {
      localStorage.removeItem(key)
    }
  },
}

/**
 * React hook backed by the cross-platform storage abstraction.
 * Initializes with initialValue, then loads persisted value asynchronously on mount.
 * The splash screen covers any brief flash before async load completes on native.
 */
export function useStorage<T>(key: string, initialValue: T) {
  // On web: seed synchronously from localStorage (no flash).
  // On native: start with initialValue; async load below (splash screen covers the flash).
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isNative) return initialValue
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  // On native: async-load the persisted value after mount.
  useEffect(() => {
    if (!isNative) return
    Preferences.get({ key }).then(({ value }) => {
      if (value !== null) {
        try {
          setStoredValue(JSON.parse(value) as T)
        } catch {
          // Malformed data — keep initialValue
        }
      }
    })
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore =
          typeof value === 'function'
            ? (value as (prev: T) => T)(prev)
            : value
        // Fire-and-forget async write
        void storage.set(key, valueToStore)
        return valueToStore
      })
    },
    [key]
  )

  const removeValue = useCallback(() => {
    void storage.remove(key)
    setStoredValue(initialValue)
  }, [key, initialValue]) // eslint-disable-line react-hooks/exhaustive-deps

  return [storedValue, setValue, removeValue] as const
}
