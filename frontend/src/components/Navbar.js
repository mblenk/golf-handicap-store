import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'


export default function Navbar() {
  const { user, dispatch } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = async () => {
    const response = await axios.get('http://localhost:5000/user/logout', { 
      withCredentials: true, 
      credentials: 'include' 
    })
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  return (
    <div className='navbar'>
        <h2>Handicap Store</h2>
        { user && 
        <>
          <div className='navbar-links'>
              <NavLink to='/home'>
                <span>Home</span>
              </NavLink>
              <NavLink to='/record'>
                <span>Add score</span>
              </NavLink>
          </div>
          <button onClick={handleClick}>Log out</button>
        </>
        }
        { !user &&
          <div className='navbar-btns'>
            <NavLink to="/login">
              <span>Log In</span>
            </NavLink>
            <NavLink to="/signup">
              <span>Sign Up</span>
            </NavLink>
          </div>
        }
    </div>
  )
}
