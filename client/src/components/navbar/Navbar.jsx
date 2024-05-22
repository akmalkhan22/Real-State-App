import { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const user = false;
  return (
    <nav>
      <div className="left">
        <a href="" className='logo'>
          <img src="./logo.png" alt="" />
          <span>Property Shop</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>

      </div>
      <div className="right">
        { user ? (
          <div className="user">
            <img src="./logo.jpg" alt="" />
            
            <span>Akmal Khan</span>
            <Link to='/profile' className='profile'>
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ):(<>
        
        <Link to={"/login"}>Sign in</Link>
        <Link to={"/register"} className='register'>Sign up</Link>
        </>)}
        <div className="menuIcon" onClick={()=>setOpen((prev)=>!prev)}>
          <img src="./menu.png" alt="" />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
