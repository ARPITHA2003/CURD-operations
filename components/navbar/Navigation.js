import React from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'


function Navigation() {
  return (
    <div className=' container-fluid bg-info '>
      
      <ul className="nav nav-tabs nav-pills justify-content-end">
        
        <li className='nav-item '>
          <Link className='nav-link text-black' to="/users">Users</Link>
        </li>


      </ul>
    </div>
  )
}

export default Navigation