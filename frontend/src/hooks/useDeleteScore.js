import { useAxios } from './useAxios'
import { handicapIndex } from './useHandicapIndex'
import { lastTwentyScores } from './useUpdateData'

export const useDeleteScore = () => {
    const { updateUserData } = useAxios()

    const deleteScore = async (scores, handicapData, id, user) => {

        const updatedScores = scores.filter(score => score.round_id !== id)
        
        const { updatedDifferentials, updatedLastTwenty, eighteenHoleDiffs, nineHoleDiffs } = lastTwentyScores(updatedScores)

        const { newHandicapIndex, countingScores } = handicapIndex(eighteenHoleDiffs, nineHoleDiffs)
        const updatedHandicapData = handicapData.filter(score => score.roundData.round_id !== id)
  
        const dataUpdate = {
          last_twenty: updatedLastTwenty,
          differentials: updatedDifferentials,
          current_handicap: newHandicapIndex,
          handicap_history: updatedHandicapData,
          counting: [...countingScores]
        }
  
        await updateUserData('http://localhost:5000/api/handicap/update/', user, dataUpdate)

    }
    return { deleteScore }
}