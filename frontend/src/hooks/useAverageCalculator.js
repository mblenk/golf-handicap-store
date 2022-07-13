
export const average = (array, number) => {
    const diffsToBeAveraged = array.slice(0,number)
    const sum = diffsToBeAveraged.reduce((a,b) => ({differential: a.differential + b.differential}))
    const diffAverage = sum.differential/number
    return { diffAverage, diffsToBeAveraged }
}
