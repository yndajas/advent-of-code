import InputUtils from '../inputUtils'

const inputPath = './2023/02/input'

type Colour = 'blue' | 'green' | 'red'

const partOne = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(inputPath)
  const maximums: Record<string, number> = { blue: 14, green: 13, red: 12 }
  const possibleGameIndices: Array<number> = []

  lines.forEach((line, lineIndex) => {
    const pullRecordStartingIndex = line.indexOf(':') + 2
    const pullRecords = line.substring(pullRecordStartingIndex).split(';')
    const impossibleGame = pullRecords.find(pullRecord => {
      const colourCountStrings = pullRecord.split(',')
      return colourCountStrings.find(colourCountString => {
        const colourCount = colourCountString.trim().split(' ') as [string, Colour]
        const count = Number(colourCount[0])
        const colour = colourCount[1]
        return count > maximums[colour]
      })
    })

    if (!impossibleGame) {
      const gameId = lineIndex + 1
      possibleGameIndices.push(gameId)
    }
  })

  return possibleGameIndices.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)
}

console.log(await partOne())

export { partOne }
