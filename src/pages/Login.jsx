import { useState } from 'react'
import './Login.css'
import { useAuth } from '../context/AuthContext.js'
import { useRouter } from '../router/RouterContext.js'

export default function Login() {
  const { login } = useAuth()
  const { navigate } = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ email, name })
    navigate('/aura', { replace: true })
  }

  return (
    <div className="login">
      <div className="login__panel">
        <h2>Sign in to Aura</h2>
        <p className="login__subtitle">
          Use any email to begin a session. Credentials are persisted locally so you stay signed in between visits.
        </p>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label">
            Display name
            <input
              className="login__input"
              placeholder="Aura Explorer"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className="login__label">
            Email address
            <input
              type="email"
              className="login__input"
              placeholder="you@aura.app"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <button type="submit" className="login__button">
            Enter Aura
          </button>
        </form>
        <button type="button" className="login__back" onClick={() => navigate('/aura')}>
          Return home
        </button>
      </div>
    </div>
  )
}