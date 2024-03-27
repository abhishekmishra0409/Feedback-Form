import React from 'react'
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
                <button className='button2'>
                    ADMIN
                </button>
            </div>
    
  )
}

export default Navbar
