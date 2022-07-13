import { handicapIndex } from './useHandicapIndex'

export const lastTwentyScores = (array, object) => {
  const updatedDifferentials = [...array]

  if(object){updatedDifferentials.push(object)}
  updatedDifferentials.sort((a,b) => new Date(b.date) - new Date(a.date))

  const updatedLastTwenty = updatedDifferentials.slice(0, 20)
  updatedLastTwenty.push(object)
  updatedLastTwenty.pop()

  const eighteenHoleDiffs = []
  const nineHoleDiffs = []

  updatedLastTwenty.forEach(round => {
    if(round.holesPlayed === 18) {
      eighteenHoleDiffs.push(round)
    }
    if(round.holesPlayed === 9) {
      nineHoleDiffs.push(round)
    }
  })

  return { updatedDifferentials, updatedLastTwenty, eighteenHoleDiffs, nineHoleDiffs }
}



export const updateHandicapHistory = (history, object, index, diffs, counting) => {

  const stillValidHistory = history.filter(entry => new Date(entry.roundData.date) < new Date(object.date))
  const matchingRound = history.find(a => a.roundData.date < object.date)
  let oldHandicap
  matchingRound ? oldHandicap = matchingRound.newIndex : oldHandicap = 54

  const remainingDiffs = diffs.filter(diff => new Date(diff.date) < new Date(object.date))
  const diffsToReCalculate = diffs.filter(diff => new Date(diff.date) >= new Date(object.date))
  const dateOrder = diffsToReCalculate.sort((a,b) => new Date(a.date) - new Date(b.date)) 

  const updatedHistory = [...stillValidHistory]
  let handicapIndexValue = oldHandicap

  let testArray = [...remainingDiffs]

  dateOrder.forEach(round => {
    const { updatedDifferentials, eighteenHoleDiffs, nineHoleDiffs } = lastTwentyScores(testArray, round)

    const { newHandicapIndex, countingScores } = handicapIndex(eighteenHoleDiffs, nineHoleDiffs)

    testArray = [...updatedDifferentials]

    if(handicapIndexValue !== newHandicapIndex) {
      updatedHistory.push({
          oldIndex: handicapIndexValue,
          newIndex: newHandicapIndex,
          roundData: round,
          countingScores
      })
    }
    handicapIndexValue = newHandicapIndex
  })

  
  updatedHistory.sort((a,b) => new Date(b.roundData.date) - new Date(a.roundData.date))

  return updatedHistory
}