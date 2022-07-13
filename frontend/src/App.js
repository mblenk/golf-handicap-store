import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import RecordScore from './pages/record/RecordScore';
import LandingPage from './pages/landing/LandingPage';
import Login from './pages/login_signup/Login'
import Signup from './pages/login_signup/Signup'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { authIsReady, user  } = useAuthContext()

  return (
    <div className="App">
      { authIsReady && 
        <BrowserRouter>
          <Routes>
            { !user && <Route path="/" element={<LandingPage />}/> }
            { user && <Route path="/" element={<Navigate to='/home' />}/> }
            { !user && <Route path="/login" element={<Login />}/> }
            { user && <Route path="/login" element={<Navigate to='/home' />}/>}
            { !user && <Route path="/signup" element={<Signup />}/> }
            { user && <Route path="/signup" element={<Navigate to='/home' />}/> }
            { !user && <Route path="/home" element={<Navigate to='/login' />}/> }
            { user && <Route path="/home" element={<Home />}/> }
            { !user && <Route path="/record" element={<Navigate to='/login' />}/> }
            { user && <Route path="/record" element={<RecordScore />}/> }
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
