import './Sidebar.css'
import { Link } from '../router/Link.jsx'
import { useRouter } from '../router/RouterContext.js'
import { DRAFT_MODE } from '../config/appConfig'
import { useAuth } from '../context/AuthContext.js'

const navItems = [
  { path: '/', label: 'Home', icon: '🌌' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊', protected: true },
  { path: '/workspace', label: 'Workspace', icon: '🧠', protected: true },
]

export default function Sidebar() {
  const { path } = useRouter()
  const { isAuthenticated } = useAuth()

  const isNavDisabled = (item) => item.protected && !isAuthenticated && !DRAFT_MODE

  return (
    <aside className="sidebar">
      <div className="sidebar__section">
        <p className="sidebar__title">Navigation</p>
        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar__link${isNavDisabled(item) ? ' sidebar__link--disabled' : ''}`}
              activeClassName="sidebar__link--active"
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">
                {item.label}
                {isNavDisabled(item) && <span className="sidebar__lock">🔒</span>}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="sidebar__footer">
        <p className="sidebar__status">
          Status:{' '}
          <span className={DRAFT_MODE ? 'sidebar__badge--draft' : 'sidebar__badge--live'}>
            {DRAFT_MODE ? 'Draft mode' : 'Live'}
          </span>
        </p>
        {DRAFT_MODE && <p className="sidebar__hint">Auth bypassed for development</p>}
        <p className="sidebar__path">Current path: {path}</p>
      </div>
    </aside>
  )
}