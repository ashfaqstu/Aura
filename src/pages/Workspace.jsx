import './Workspace.css'

export default function Workspace() {
  return (
    <section className="workspace">
      <div className="workspace__intro">
        <h2>Creative workspace</h2>
        <p>
          Jot ideas, orchestrate launches, and keep everyone synced inside Aura&apos;s adaptable
          workspace.
        </p>
      </div>
      <div className="workspace__board">
        <div className="workspace__column">
          <p className="workspace__column-title">Ideas</p>
          <div className="workspace__card">
            <h4>Voice-guided insights</h4>
            <p>Bring AI voice agents into dashboards for a hands-free walkthrough.</p>
          </div>
          <div className="workspace__card">
            <h4>Spotlight themes</h4>
            <p>Curate weekly highlights to keep the team aligned on wins.</p>
          </div>
        </div>
        <div className="workspace__column">
          <p className="workspace__column-title">In motion</p>
          <div className="workspace__card">
            <h4>Persona research</h4>
            <p>Gather qualitative interviews inside Aura to connect customer context.</p>
          </div>
          <div className="workspace__card">
            <h4>Flow automation</h4>
            <p>Map triggers to your product stack for instant action on insights.</p>
          </div>
        </div>
      </div>
    </section>
  )
}