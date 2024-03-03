import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from '../../store/auth';


const Navbar = () => {
  const {isLoggedIn, user} = useAuth();
  return (
    <>
      <div className="container-nav">
        <div className="logo-brand">
            <NavLink className={(e)=>{return e.isActive? "red": ""}} to="/"><img src="/images/logo.jpg" alt="logo" className="logo" height="80px" width="80px" /></NavLink>
        </div>

        <nav>
            <ul>
                <li> <NavLink className={(e)=>{return e.isActive? "red": ""}} to="/">Home</NavLink></li>
                <li> <NavLink className={(e)=>{return e.isActive? "red": ""}} to="/about">About</NavLink></li>
                <li> <NavLink className={(e)=>{return e.isActive? "red": ""}} to="/service">Services</NavLink></li>
                {
                  user.isAdmin ? <li> <NavLink className={(e)=>{return e.isActive? "red": ""}} to="/admin">Admin</NavLink></li> : ""
                }
                
                <li> <NavLink className={(e)=>{return e.isActive? "red": ""}} to="/contact">Contact</NavLink></li>
                { isLoggedIn ?
                  <li> <NavLink className={(e)=>{return e.isActive? "red": ""}} to="/logout">Logout</NavLink></li>
                 :
                  <>
                    <li> <NavLink className={(e)=>{return e.isActive? "red": ""}} to="/register">Register</NavLink></li>
                    <li> <NavLink className={(e)=>{return e.isActive? "red": ""}} to="/login">Login</NavLink></li>
                  </>
                }
                
            </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar
