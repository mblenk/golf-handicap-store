import './login_signup.css'
import { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import Navbar from '../../components/Navbar';



export default function Login() {
  const { dispatch } = useAuthContext()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    
    try {
      const res = await axios.post('http://localhost:5000/user/login', {
          email,
          password,
      },
      { 
        withCredentials: true, 
        credentials: 'include' 
      })
      if(res.data.user){
        dispatch({ type: 'LOGIN', payload: res.data.user })
        navigate('/home')
      }
    } 
    catch(err) {
      console.log(err)
      if(err.response.data) {
        setEmailError(err.response.data.errors.email)
        setPasswordError(err.response.data.errors.password)
      }
      if(err.message === "Network Error") {
        setPasswordError('A connection could not be establised with the server. Please try again later.')
      }
      
    }
  }

  return (
    <div className='background'>
      <Navbar />
      <form className='user-forms' onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <label> 
          <span>Email Address:</span>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          { emailError && <p>{emailError}</p> }
        </label>
        <label> 
          <span>Password:</span>
          <input 
            type="password" 
            value={password}  
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          { passwordError && <p>{passwordError}</p> }
        </label>
        <button>Log In</button>
        <NavLink to='/'>
          <span>Return to homepage</span>
        </NavLink>
      </form>
    </div>
  )
}
