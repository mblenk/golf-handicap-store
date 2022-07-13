import axios from 'axios'
import { useState } from 'react'


export const useAxios = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)

    const fetchUserData = async (url, id) => {
      setError(null)
      setIsPending(true)
      try {
        const response = await axios.get(url + id, { 
          withCredentials: true, 
          credentials: 'include' 
        })
        setIsPending(false)
        return response

      }
      catch(err) {
        setError(err.message)
        setIsPending(false)
      }
    }

    const updateUserData = async (url, id, object) => {
      setError(null)
      setIsPending(true)
      try {
        const response = await axios.patch(url + id, object, { 
          withCredentials: true, 
          credentials: 'include' 
        })
        setIsPending(false)
      }
      catch(err) {
        setError(err.message)
        setIsPending(false)
      }
    }

    return { fetchUserData, updateUserData, error, isPending }
}