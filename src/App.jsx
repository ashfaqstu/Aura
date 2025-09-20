import { useEffect, useMemo } from 'react'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext.js'
import { DRAFT_MODE } from './config/appConfig.js'
import { normalizePath } from './router/routerUtils.js'
import { useRouter } from './router/RouterContext.js'

const ROUTES = [
  {
    path: '/aura',
    element: <Home />,
    protected: false, // Set `protected: true` on any route that should require authentication.
  },
  { path: '/aura/login', element: <Login />, skipLayout: true },
  { path: '/aura/not-found', element: <NotFound />, skipLayout: true },
]

export default function App() {
  const { path, navigate } = useRouter()
  const { isAuthenticated } = useAuth()

  const activeRoute = useMemo(
    () => ROUTES.find((route) => normalizePath(route.path) === path),
    [path],
  )

  useEffect(() => {
    if (!activeRoute) {
      if (path !== '/aura/not-found') {
        navigate('/aura/not-found', { replace: true })
      }
      return
    }

    if (activeRoute.protected && !isAuthenticated && !DRAFT_MODE) {
      if (path !== '/aura/login') {
        navigate('/aura/login', { replace: true })
      }
      return
    }

    if (activeRoute.path === '/aura/login' && isAuthenticated && !DRAFT_MODE) {
      navigate('/aura', { replace: true })
    }
  }, [activeRoute, isAuthenticated, navigate, path])

  if (!activeRoute) {
    return <NotFound />
  }

  if (activeRoute.protected && !isAuthenticated && !DRAFT_MODE && path !== '/aura/login') {
    return null
  }

  if (activeRoute.path === '/aura/login' && isAuthenticated && !DRAFT_MODE) {
    return null
  }

  const content = activeRoute.element

  if (activeRoute.skipLayout) {
    return content
  }

  return <Layout>{content}</Layout>
}