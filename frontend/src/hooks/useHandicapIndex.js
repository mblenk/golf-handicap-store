import { average } from "./useAverageCalculator";
import { oneDecimalPlace } from "./useOneDecimalPlace.js";
import { nineHoleDifferentialCombination } from "./useAdjustNineHole";

export const handicapIndex = (eighteenHoleDiffs, nineHoleDiffs) => {
    
    const combinedNineHoleDiffs = nineHoleDifferentialCombination(nineHoleDiffs)

    const finalDifferentials = eighteenHoleDiffs.concat(combinedNineHoleDiffs)

    finalDifferentials.sort((a,b) => a.differential - b.differential)
    
    const diffsCount = finalDifferentials.length
    let newHandicapIndex = 0
    let countingScores = []

    if(diffsCount < 3){
        newHandicapIndex = 54
    }

    if(diffsCount === 3){
        newHandicapIndex = finalDifferentials[0].differential - 2
        countingScores.push(finalDifferentials[0])
    }

    if(diffsCount === 4){
        newHandicapIndex = finalDifferentials[0].differential - 1
        countingScores.push(finalDifferentials[0])
    }

    if(diffsCount === 5){
        newHandicapIndex = finalDifferentials[0].differential
        countingScores.push(finalDifferentials[0])
    }

    if(diffsCount === 6){
        const { diffAverage, diffsToBeAveraged } = average(finalDifferentials, 2)
        newHandicapIndex = oneDecimalPlace(diffAverage - 1)
        countingScores = [...diffsToBeAveraged]
    }

    if(diffsCount === 7 || diffsCount === 8){
        const { diffAverage, diffsToBeAveraged } = average(finalDifferentials, 2)
        newHandicapIndex = oneDecimalPlace(diffAverage)
        countingScores = [...diffsToBeAveraged]
    }

    if(diffsCount >= 9 && diffsCount <= 11) {
        const { diffAverage, diffsToBeAveraged } = average(finalDifferentials, 3)
        newHandicapIndex = oneDecimalPlace(diffAverage)
        countingScores = [...diffsToBeAveraged]
    }

    if(diffsCount >= 12 && diffsCount <= 14) {
        const { diffAverage, diffsToBeAveraged } = average(finalDifferentials, 4)
        newHandicapIndex = oneDecimalPlace(diffAverage)
        countingScores = [...diffsToBeAveraged]
    }

    if(diffsCount === 15 || diffsCount === 16) {
        const { diffAverage, diffsToBeAveraged } = average(finalDifferentials, 5)
        newHandicapIndex = oneDecimalPlace(diffAverage)
        countingScores = [...diffsToBeAveraged]
    }

    if(diffsCount === 17 || diffsCount === 18) {
        const { diffAverage, diffsToBeAveraged } = average(finalDifferentials, 6)
        newHandicapIndex = oneDecimalPlace(diffAverage)
        countingScores = [...diffsToBeAveraged]
    }

    if(diffsCount === 19){
        const { diffAverage, diffsToBeAveraged } = average(finalDifferentials, 7)
        newHandicapIndex = oneDecimalPlace(diffAverage)
        countingScores = [...diffsToBeAveraged]
    }

    if(diffsCount === 20){
        const { diffAverage, diffsToBeAveraged } = average(finalDifferentials, 8)
        newHandicapIndex = oneDecimalPlace(diffAverage)
        countingScores = [...diffsToBeAveraged]
    }

   return { newHandicapIndex, countingScores }
    
}
