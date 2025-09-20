import './Layout.css'
import Navbar from './Navbar'


export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* <Navbar /> */}
      <div className="layout__body">
        <main className="layout__content">{children}</main>
      </div>
    </div>
  )
}