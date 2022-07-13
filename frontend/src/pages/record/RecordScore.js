import './RecordScore.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useAxios } from '../../hooks/useAxios'
import { useRecordScore } from '../../hooks/useRecordScore'
import Navbar from '../../components/Navbar';


export default function RecordScore() {
  const [date, setDate] = useState('')
  const [eighteenHoles, setEighteenHoles] = useState('')
  const [nineHoles, setNineHoles] = useState('')
  const [courseRating, setCourseRating] = useState('')
  const [courseSlope, setCourseSlope] = useState('')
  const [playingConditions, setPlayingConditions] = useState('')
  const [userData, setUserData] = useState(null)

  const { user } = useAuthContext()
  const { fetchUserData } = useAxios()
  const { recordScore, error, isPending } = useRecordScore()
  const navigate = useNavigate()
  
  useEffect(() => {
    const getData = async () => {
      const response = await fetchUserData('http://localhost:5000/api/handicap/', user._id)
      console.log(response)
      setUserData(response.data)
    }
    getData()
  }, [user])

  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const golfRound = [eighteenHoles, nineHoles, courseSlope, courseRating, playingConditions, date]

    await recordScore(golfRound, userData, user._id)
    navigate('/home')
  }

  return (
    <div className='background'>
      <Navbar />
      { !userData && <h2 className="error-heading">The server is currently experiencing problems. Please close the page and come back later.</h2> }
      { userData && 
      <>
        <div className='record'>
          <form className='record-score' onSubmit={handleSubmit}>
            <h2>Input Score</h2>
            <label> 
              <span>Date:</span>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <label> 
              <span>Eighteen Hole Score:</span>
              <input 
                type="number" 
                value={eighteenHoles}  
                onChange={(e) => setEighteenHoles(e.target.value)}
              />
            </label>
            <label> 
              <span>Nine Hole Score:</span>
              <input 
                type="number" 
                value={nineHoles}  
                onChange={(e) => setNineHoles(e.target.value)}
              />
            </label>
            <label> 
              <span>Course Rating:</span>
              <input 
                type="number" 
                value={courseRating}  
                onChange={(e) => setCourseRating(e.target.value)}
                required
              />
            </label>
            <label> 
              <span>Course Slope:</span>
              <input 
                type="number" 
                value={courseSlope}  
                onChange={(e) => setCourseSlope(e.target.value)}
                required
              />
            </label>
            <label> 
              <span>Playing Conditions:</span>
              <input 
                type="number" 
                value={playingConditions}  
                onChange={(e) => setPlayingConditions(e.target.value)}
              />
            </label>
            { error && <p>{error}</p> }
            { !isPending && <button>Submit</button> }
            { isPending && <button disabled>Loading...</button> }
          </form>
          <div className='instructions'>
            <h2>Instructions</h2>
            <p>Input your recent scores along with the course rating and slope rating. If you enter a 9 hole score, you should enter the course rating for the 9 holes you have played, and not the rating for the full 18 holes. If you are not sure of the ratings for the courses you have played, please use the link below to access the course handicap calculator provided by The R&A: <br /><a href="https://www.randa.org/course-handicap-calculator" target="_blank" rel="noreferrer">R&A Course Handicap Calculator</a></p>
            <p>To calculate an accurate handicap you must input at least 54 holes of scores, made up of either 18 hole or 9 hole rounds. Please don't provide an 18 hole and 9 hole score in the same line otherwise the 9 hole score will be ignored. If you don't know the Playing Condition value, the calculator will default to "0". </p>
            <p>For 9 hole rounds, the differential for each set of 9 holes will be calculated and then two 9 hole rounds will be combined into one 18 hole differential. The handicap index is then calculated as per the table below:</p>
            <img src={require('../../assets/WHS-Calculations.png')} alt="WHSCalculations" className="diffs-graphic"></img>
          </div>
        </div>
      </>  
      }
    </div>
  )
}
