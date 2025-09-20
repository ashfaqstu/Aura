import './Layout.css'
import Navbar from './Navbar'


export default function Layout({ children }) {
  return (
    <div>
      {/* <Navbar /> */}
      <div className>
        <main >{children}</main>
      </div>
    </div>
  )
}