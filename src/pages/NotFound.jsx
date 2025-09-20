import './NotFound.css'
import { Link } from '../router/Link.jsx'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__card">
        <p className="not-found__code">404</p>
        <h2>Lost in the aura</h2>
        <p>The page you&apos;re looking for drifted into the nebula. Let&apos;s head back.</p>
        <Link to="/aura" className="not-found__cta">
          Return to home
        </Link>
      </div>
    </div>
  )
}