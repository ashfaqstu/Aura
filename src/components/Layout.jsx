import './Layout.css'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <div className="layout__background" aria-hidden="true">
        <div className="layout__gradient" />
        <div className="layout__stars layout__stars--far" />
        <div className="layout__stars layout__stars--near" />
        <div className="layout__glow layout__glow--left" />
        <div className="layout__glow layout__glow--right" />
      </div>
      <Navbar />
      <main className="layout__main">{children}</main>
    </div>
  )
}
