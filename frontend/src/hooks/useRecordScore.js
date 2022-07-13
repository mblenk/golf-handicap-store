import { handicapIndex } from './useHandicapIndex'
import { lastTwentyScores, updateHandicapHistory } from './useUpdateData'
import { calculateScoreDifferentials } from './useCalculateScoreDifferential'
import { useAxios } from './useAxios'
import { useState } from 'react'

export const useRecordScore = () => {
    const { updateUserData } = useAxios()
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)

    const recordScore = async (golfRound, userData, id) => {
      setError(null)
      setIsPending(true)

      const round_id = Date.now()
      const [eighteenHoles, nineHoles, courseSlope, courseRating, playingConditions,date] = golfRound

      if(!eighteenHoles && !nineHoles) {
        setError('Please enter either an 18 hole or a 9 hole score')
        setIsPending(false)
        throw new Error()
      }

      const [differential, holesPlayed] = calculateScoreDifferentials(golfRound)
      const { differentials, handicap_history } = userData

      let score
      holesPlayed === 18 ? score = eighteenHoles : score = nineHoles

      const roundObject = {
        round_id,
        date,
        holesPlayed,
        score,
        differential,
        courseSlope,
        courseRating,
        playingConditions
      }

      const { updatedDifferentials, updatedLastTwenty, eighteenHoleDiffs, nineHoleDiffs } = lastTwentyScores(differentials, roundObject)

      const { newHandicapIndex, countingScores } = handicapIndex(eighteenHoleDiffs, nineHoleDiffs)
      const history = updateHandicapHistory(handicap_history, roundObject, newHandicapIndex, updatedDifferentials, countingScores)

      const dataUpdate = {
        last_twenty: updatedLastTwenty,
        differentials: updatedDifferentials,
        current_handicap: newHandicapIndex,
        handicap_history: history,
        counting: [...countingScores]
      }

      try {
        await updateUserData('http://localhost:5000/api/handicap/update/', id, dataUpdate)
        setIsPending(false)
      }
      catch(err) {
        setError(err.message)
        setIsPending(false)
      }
      
    } 

    return { recordScore, error, isPending }
}

