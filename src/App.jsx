import { useEffect, useMemo } from 'react'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Workspace from './pages/Workspace'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext.js'
import { DRAFT_MODE } from './config/appConfig'
import { normalizePath } from './router/routerUtils.js'
import { useRouter } from './router/RouterContext.js'

const ROUTES = [
  { path: '/Aura', element: <Home /> },
  { path: '/Aura/dashboard', element: <Dashboard />, protected: true },
  { path: '/Aura/workspace', element: <Workspace />, protected: true },
  { path: '/Aura/login', element: <Login />, skipLayout: true },
  { path: '/Aura/not-found', element: <NotFound />, skipLayout: true },
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
      if (path !== '/Aura/not-found') {
        navigate('/Aura/not-found', { replace: true })
      }
      return
    }

    if (activeRoute.protected && !isAuthenticated && !DRAFT_MODE) {
      if (path !== '/Aura/login') {
        navigate('/Aura/login', { replace: true })
      }
      return
    }

    if (activeRoute.path === '/Aura/login' && isAuthenticated && !DRAFT_MODE) {
      navigate('/Aura', { replace: true })
    }
  }, [activeRoute, isAuthenticated, navigate, path])

  if (!activeRoute) {
    return <NotFound />
  }

  if (activeRoute.protected && !isAuthenticated && !DRAFT_MODE && path !== '/Aura/login') {
    return null
  }

  if (activeRoute.path === '/Aura/login' && isAuthenticated && !DRAFT_MODE) {
    return null
  }

  const content = activeRoute.element

  if (activeRoute.skipLayout) {
    return content
  }

  return <Layout>{content}</Layout>
}