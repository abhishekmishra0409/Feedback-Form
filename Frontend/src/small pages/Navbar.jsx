import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
       <div className='nav'>
                <div className='clglogo'>
                    <img src="SVCE Logo.jpg" alt=""/>
                </div>
                <div className='c-name'>
                    <h2>Swami Vivekanand Groups of Institutions</h2>
                    <p>Engineering | Pharmacy | Management | Diploma</p>
                </div>
                
                    <Link to={'/login'}>
                    <button className='button2'>
                    ADMIN
                    </button>
                    </Link>
                    
                
            </div>
    
  )
}

export default Navbar
