import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from '../components'

const HomeLayout = () => {
  return (
    <div>
        <Navbar/>
        <Sidebar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default HomeLayout