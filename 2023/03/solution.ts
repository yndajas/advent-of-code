import InputUtils from '../inputUtils'

const inputPath = './2023/03/input'

const hasSymbolNeighbour = (lines: Array<string>, lineIndex: number, characterIndex: number): boolean => {
  return !![
    lines[lineIndex - 1]?.[characterIndex - 1],
    lines[lineIndex - 1]?.[characterIndex],
    lines[lineIndex - 1]?.[characterIndex + 1],
    lines[lineIndex]?.[characterIndex - 1],
    lines[lineIndex]?.[characterIndex + 1],
    lines[lineIndex + 1]?.[characterIndex - 1],
    lines[lineIndex + 1]?.[characterIndex],
    lines[lineIndex + 1]?.[characterIndex + 1],
  ].find(character => character && !character.match(/[0-9\.]/))
}

const partOne = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(inputPath)
  const partNumbers: Array<number> = []
  const currentNumberString = {
    adjacentToSymbol: false,
    value: '',
  }

  lines.forEach((line, lineIndex) => {
    line.split('').forEach((character, characterIndex) => {
      if (character.match(/[0-9]/)) {
        currentNumberString.value += character

        if (!currentNumberString.adjacentToSymbol && hasSymbolNeighbour(lines, lineIndex, characterIndex)) {
          currentNumberString.adjacentToSymbol = true
        }
      } else {
        if (currentNumberString.adjacentToSymbol) {
          partNumbers.push(Number(currentNumberString.value))
        }

        currentNumberString.value = ''
        currentNumberString.adjacentToSymbol = false
      }
    })
  })

  return partNumbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)
}

export { partOne }
