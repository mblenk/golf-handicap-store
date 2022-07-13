import './login_signup.css'
import { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import Navbar from '../../components/Navbar';



export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { dispatch } = useAuthContext()


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')

    if(password === passwordCheck) {
      try {
        const res = await axios.post('http://localhost:5000/user/signup', {
            email,
            password,
            name: displayName
        },
        { 
          withCredentials: true, 
          credentials: 'include' 
        })
        if(res.data.user){
          const create = await axios.post('http://localhost:5000/api/handicap/create', {
              user_id: res.data.user
          },
          { 
            withCredentials: true, 
            credentials: 'include' 
          })
          if(create) {
            dispatch({ type: 'LOGIN', payload: res.data.user })
            navigate('/home')
          }
        }
      } 
      catch (err) {
        console.log(err)
        if(err.response.data) {
          setEmailError(err.response.data.errors.email)
          setPasswordError(err.response.data.errors.password)
        }
        if(err.message === "Network Error") {
          setPasswordError('A connection could not be establised with the server. Please try again later.')
        }
      }
    } else {
      setPasswordError('The passwords provided do not match, please try again.')
    }
  }

  return (
    <div className='background'>
      <Navbar />
      <form className='user-forms' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>
          <span>Display Name:</span>
          <input 
            type="text" 
            required 
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
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
        </label>
        <label> 
          <span>Confirm Password:</span>
          <input 
            type="password" 
            value={passwordCheck}  
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
          { passwordError && <p>{passwordError}</p> }
        </label>
        <button>Sign Up</button>
        <NavLink to='/'>
          <span>Return to homepage</span>
        </NavLink>
      </form>
    </div>
  )
}
