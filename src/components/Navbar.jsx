import './Navbar.css'
import { useAuth } from '../context/AuthContext.js'
import { useRouter } from '../router/RouterContext.js'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { navigate } = useRouter()

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout()
      navigate('/Aura/login')
    } else {
      navigate('/Aura/login')
    }
  }

  return (
    <header className="navbar">
      <button type="button" className="navbar__brand" onClick={() => navigate('/')}>
        Aura
      </button>
      <div className="navbar__actions">
        {isAuthenticated && user ? (
          <span className="navbar__greeting">Hello, {user.name}</span>
        ) : (
          <span className="navbar__greeting">Welcome to Aura</span>
        )}
        <button type="button" className="navbar__button" onClick={handleAuthAction}>
          {isAuthenticated ? 'Sign out' : 'Sign in'}
        </button>
      </div>
    </header>
  )
}