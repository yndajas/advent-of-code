import InputUtils from '../inputUtils'
import MathUtils from '../mathUtils'

const zeroPaddedDay = '02'

type Colour = 'blue' | 'green' | 'red'

const partOne = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(zeroPaddedDay)
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

  return MathUtils.sumNumbers(possibleGameIndices)
}

const partTwo = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(zeroPaddedDay)
  const minimumCubePowers: Array<number> = []

  lines.forEach(line => {
    const minimums = { blue: 0, green: 0, red: 0 }
    const pullRecordStartingIndex = line.indexOf(':') + 2
    const pullRecords = line.substring(pullRecordStartingIndex).split(';')
    pullRecords.forEach(pullRecord => {
      const colourCountStrings = pullRecord.split(',')
      colourCountStrings.forEach(colourCountString => {
        const colourCount = colourCountString.trim().split(' ') as [string, Colour]
        const count = Number(colourCount[0])
        const colour = colourCount[1]
        if (count > minimums[colour]) {
          minimums[colour] = count
        }
      })
    })

    minimumCubePowers.push(minimums.blue * minimums.green * minimums.red)
  })

  return MathUtils.sumNumbers(minimumCubePowers)
}

export { partOne, partTwo }
