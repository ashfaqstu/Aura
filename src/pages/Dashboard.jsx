import './Dashboard.css'

const metrics = [
  { label: 'Active sessions', value: '1,204', trend: '+12%' },
  { label: 'Conversion rate', value: '7.3%', trend: '+0.8%' },
  { label: 'Avg. response time', value: '320ms', trend: '-15%' },
]

export default function Dashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard__header">
        <h2>Insight dashboard</h2>
        <p>Monitor the pulse of your product experience with Aura analytics.</p>
      </div>
      <div className="dashboard__metrics">
        {metrics.map((metric) => (
          <div key={metric.label} className="dashboard__metric">
            <p className="dashboard__metric-label">{metric.label}</p>
            <p className="dashboard__metric-value">{metric.value}</p>
            <p className="dashboard__metric-trend">{metric.trend}</p>
          </div>
        ))}
      </div>
      <div className="dashboard__panel">
        <h3>Engagement timeline</h3>
        <p>Connect Aura to your data warehouse to surface engagement journeys in real time.</p>
      </div>
    </section>
  )
}