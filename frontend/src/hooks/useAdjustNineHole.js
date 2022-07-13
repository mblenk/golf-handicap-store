import { oneDecimalPlace } from "./useOneDecimalPlace.js"


export const nineHoleDifferentialCombination = (array) => {
    const combinedDiffs = []
    const length = array.length

    // Remove any single 9 hole score that won't be combined
    if(length % 2 !== 0) {
        array.pop()
    }

    //Combine two 9-hole scores and round to one decimal place to make an 18 hole differential
    for(let i = 0; i < length - 1; i += 2) {
        const combined = (array[i].differential + array[i+1].differential)
        const rounded = Number(oneDecimalPlace(combined))
        const combinedRound = {
            differential: rounded,
            combined: true,
            roundOne: array[i],
            roundTwo: array[i+1]
        }
        combinedDiffs.push(combinedRound)
    }
    return combinedDiffs
}