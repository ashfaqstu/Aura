import './Navbar.css'
import { useAuth } from '../context/AuthContext.js'
import { useRouter } from '../router/RouterContext.js'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { navigate } = useRouter()

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout()
      navigate('/aura/login')
    } else {
      navigate('/aura/login')
    }
  }

  return (
    <header className="navbar">
      <button type="button" className="navbar__brand text-blue-300" onClick={() => navigate('/aura')}>
        Aura
      </button>
      <div className="navbar__greeting">
        Your Companion
      </div>
    </header>
  )
}