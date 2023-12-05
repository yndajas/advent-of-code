import InputUtils from '../inputUtils'

const inputPath = './2023/04/input'

const partOne = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(inputPath)

  return lines.reduce((pointsAccumulator, line) => {
    const numbersStartingIndex = line.indexOf(':') + 2
    const [winningNumbersString, numbersYouHaveString] = line.substring(numbersStartingIndex).split('|')
    const winningNumbers = winningNumbersString.match(/[0-9]+/g) as RegExpMatchArray
    const numbersYouHave = numbersYouHaveString.match(/[0-9]+/g) as RegExpMatchArray

    const winningNumbersYouHaveCount = numbersYouHave.reduce(
      (winningNumbersYouHaveCountAccumulator, numberYouHave) =>
        winningNumbers.includes(numberYouHave)
          ? winningNumbersYouHaveCountAccumulator + 1
          : winningNumbersYouHaveCountAccumulator,
      0,
    )

    const pointsForLine = winningNumbersYouHaveCount ? 2 ** (winningNumbersYouHaveCount - 1) || 1 : 0

    return pointsAccumulator + pointsForLine
  }, 0)
}

export { partOne }
