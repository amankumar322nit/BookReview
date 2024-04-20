import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Footer from './components/navbar/Footer.jsx'

function Layout() {
  return (
    <div>
    <Navbar/>
    <Outlet />
    <Footer/>
    </div>
  )
}

export default Layout