import { useCallback, useEffect, useMemo, useState } from 'react'
import { RouterContext } from './RouterContext.js'
import { normalizePath } from './routerUtils.js'

export function RouterProvider({ children }) {
  const getInitialPath = () => {
    if (typeof window === 'undefined') {
      return '/'
    }
    return normalizePath(window.location.pathname)
  }

  const [path, setPath] = useState(getInitialPath)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback(
    (to, options = {}) => {
      if (typeof window === 'undefined') {
        return
      }

      const normalizedTarget = normalizePath(to)
      const replace = options.replace ?? false

      if (!replace && normalizedTarget === path) {
        return
      }

      const method = replace ? 'replaceState' : 'pushState'
      window.history[method]({}, '', normalizedTarget)
      setPath(normalizedTarget)
    },
    [path],
  )

  const value = useMemo(
    () => ({
      path,
      navigate,
    }),
    [path, navigate],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}