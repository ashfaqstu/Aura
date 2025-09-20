import { useMemo, useState } from 'react'
import { AuthContext } from './AuthContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (credentials) => {
    setUser({
      email: credentials?.email ?? 'demo@aura.app',
      name: credentials?.name?.trim() || 'Aura Explorer',
    })
  }

  const logout = () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      user,
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}