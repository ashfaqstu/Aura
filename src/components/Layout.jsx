import './Layout.css'
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div>
     
      <main >{children}</main>
       <Navbar />
    </div>
  )
}
