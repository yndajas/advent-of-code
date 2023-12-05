import InputUtils from '../inputUtils'

const inputPath = './2023/04/input'

const countWinningNumbersYouHave = (line: string): number => {
  const numbersStartingIndex = line.indexOf(':') + 2
  const [winningNumbersString, numbersYouHaveString] = line.substring(numbersStartingIndex).split('|')
  const winningNumbers = winningNumbersString.match(/[0-9]+/g) as RegExpMatchArray
  const numbersYouHave = numbersYouHaveString.match(/[0-9]+/g) as RegExpMatchArray

  return numbersYouHave.reduce(
    (winningNumbersYouHaveCountAccumulator, numberYouHave) =>
      winningNumbers.includes(numberYouHave)
        ? winningNumbersYouHaveCountAccumulator + 1
        : winningNumbersYouHaveCountAccumulator,
    0,
  )
}

const partOne = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(inputPath)

  return lines.reduce((pointsAccumulator, line) => {
    const winningNumbersYouHaveCount = countWinningNumbersYouHave(line)
    const pointsForLine = winningNumbersYouHaveCount ? 2 ** (winningNumbersYouHaveCount - 1) || 1 : 0

    return pointsAccumulator + pointsForLine
  }, 0)
}

const partTwo = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(inputPath)
  const lineDetails = lines.map(line => ({
    count: 1,
    winningNumbersYouHave: countWinningNumbersYouHave(line),
  }))

  lineDetails.forEach((lineDetail, lineDetailIndex) => {
    for (let lineOffset = 1; lineOffset <= lineDetail.winningNumbersYouHave; lineOffset++) {
      lineDetails[lineDetailIndex + lineOffset].count += lineDetail.count
    }
  })

  return lineDetails.reduce((accumulator, lineDetail) => accumulator + lineDetail.count, 0)
}

export { partOne, partTwo }
