import { oneDecimalPlace } from "./useOneDecimalPlace.js"



export const calculateScoreDifferentials = (array) => {
    const [scoreEighteen, scoreNine, slopeRating, courseRating, playingConditions] = array

    if(scoreEighteen || scoreNine === 0) {
        const type = 18
        const index = (113 / slopeRating) * (scoreEighteen - courseRating - playingConditions)
        const rounded = Number(oneDecimalPlace(index)) 
        return [rounded, type]
    } else if (scoreNine || scoreEighteen === 0) {
        const type = 9
        const index = (113 / slopeRating) * (scoreNine - courseRating - (playingConditions / 2))
        return [index, type]
    }
    
}

