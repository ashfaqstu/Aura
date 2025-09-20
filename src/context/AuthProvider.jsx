import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext.js'

const STORAGE_KEY = 'aura.auth-state'

function getStoredUser() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    if (!storedValue) {
      return null
    }

    const parsed = JSON.parse(storedValue)
    if (parsed && typeof parsed === 'object' && parsed.email) {
      return parsed
    }
  } catch (error) {
    console.warn('Failed to parse stored auth state', error)
  }

  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())

  const login = useCallback((credentials) => {
    const normalizedUser = {
      email: credentials?.email ?? 'demo@aura.app',
      name: credentials?.name?.trim() || 'Aura Explorer',
    }

    setUser(normalizedUser)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedUser))
    }

    return normalizedUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handleStorage = (event) => {
      if (event.key !== STORAGE_KEY) {
        return
      }

      if (!event.newValue) {
        setUser(null)
        return
      }

      try {
        const nextUser = JSON.parse(event.newValue)
        setUser(nextUser)
      } catch (error) {
        console.warn('Failed to sync auth state from storage', error)
        setUser(null)
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      user,
      login,
      logout,
    }),
    [login, logout, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}