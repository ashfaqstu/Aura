
import { Children } from 'react'
import './Layout.css'
import Navbar from './Navbar'

export default function Layout({ children }) {
  const childArray = Children.toArray(children)
  const hideNavbar = childArray.some((child) => child?.props?.['data-hide-navbar'])

  return (
    <div className="app-shell">
      <main>{children}</main>
      {!hideNavbar && <Navbar />}
    </div>
  )
}