import './Home.css'
import { Link } from '../router/Link.jsx'

export default function Home() {
  return (
    <section className="home">
      <div className="home__headline">
        <p className="home__eyebrow">Welcome to</p>
        <h1 className="home__title">Aura</h1>
        <p className="home__subtitle">
          Illuminate your product journey with immersive insights, vibrant dashboards, and tools
          that keep your team aligned.
        </p>
        <div className="home__cta">
          <Link to="/dashboard" className="home__cta-primary">
            Explore dashboard
          </Link>
          <Link to="/workspace" className="home__cta-secondary">
            Visit workspace
          </Link>
        </div>
      </div>
      <div className="home__grid">
        <div className="home__card">
          <h3>Realtime intelligence</h3>
          <p>Transform raw data into action with real-time, contextual analytics.</p>
        </div>
        <div className="home__card">
          <h3>Collaborative spaces</h3>
          <p>Organize ideas, notes, and creative assets with a fluid, shared canvas.</p>
        </div>
        <div className="home__card">
          <h3>Ambient automation</h3>
          <p>Automate the everyday, leaving more room for curiosity and invention.</p>
        </div>
      </div>
    </section>
  )
}