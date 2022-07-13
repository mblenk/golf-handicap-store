import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useAxios } from '../../hooks/useAxios'
import './Home.css'
import Navbar from '../../components/Navbar';
import DataSets from './DataSets';
import Graph from './Graph';


export default function Home() {
  const { user } = useAuthContext()
  const { fetchUserData } = useAxios()
  const [data, setData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const response = await fetchUserData('http://localhost:5000/api/handicap/', user._id)
      setData(response)
    }
    getData()
  }, [user])


  return (
    <div className="background">
      <Navbar />
      { !data && <h2 className="error-heading">The server is currently experiencing problems. Please close the page and come back later.</h2> }
      { data && 
        <div className="history">
          <div className='user-data'>
            <h2>Welcome back, {user.display_name}</h2>
            <h4>Your current handicap index is:</h4>
            <h1>{data.data.current_handicap}</h1>
            <DataSets 
              scores={data.data.differentials}
              lastTwenty={data.data.last_twenty}
              counting={data.data.counting}
              handicapData={data.data.handicap_history}
            />
          </div>
          <Graph 
            handicapData={data.data.handicap_history}
          />
        </div>
      }
    </div>
  )
}

