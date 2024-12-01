import InputUtils from '../inputUtils'
import MathUtils from '../mathUtils'
import RegexUtils from '../regexUtils'

const zeroPaddedDay = '03'

type Coordinate = { characterIndex: number; lineIndex: number }

const getNeighbour: Record<string, (lines: Array<string>, coordinate: Coordinate) => string> = {
  bottomLeft: (lines, coordinate) => lines[coordinate.lineIndex + 1]?.[coordinate.characterIndex - 1],
  bottomMiddle: (lines, coordinate) => lines[coordinate.lineIndex + 1]?.[coordinate.characterIndex],
  bottomRight: (lines, coordinate) => lines[coordinate.lineIndex + 1]?.[coordinate.characterIndex + 1],
  left: (lines, coordinate) => lines[coordinate.lineIndex]?.[coordinate.characterIndex - 1],
  right: (lines, coordinate) => lines[coordinate.lineIndex]?.[coordinate.characterIndex + 1],
  topLeft: (lines, coordinate) => lines[coordinate.lineIndex - 1]?.[coordinate.characterIndex - 1],
  topMiddle: (lines, coordinate) => lines[coordinate.lineIndex - 1]?.[coordinate.characterIndex],
  topRight: (lines, coordinate) => lines[coordinate.lineIndex - 1]?.[coordinate.characterIndex + 1],
}

const hasSymbolNeighbour = (lines: Array<string>, coordinate: Coordinate): boolean => {
  return !![
    getNeighbour.bottomLeft(lines, coordinate),
    getNeighbour.bottomMiddle(lines, coordinate),
    getNeighbour.bottomRight(lines, coordinate),
    getNeighbour.left(lines, coordinate),
    getNeighbour.right(lines, coordinate),
    getNeighbour.topLeft(lines, coordinate),
    getNeighbour.topMiddle(lines, coordinate),
    getNeighbour.topRight(lines, coordinate),
  ].find(character => character && !character.match(/[0-9\.]/))
}

const partOne = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(zeroPaddedDay)
  const partNumbers: Array<number> = []
  const currentNumberString = {
    adjacentToSymbol: false,
    value: '',
  }

  lines.forEach((line, lineIndex) => {
    line.split('').forEach((character, characterIndex) => {
      if (RegexUtils.isNumberCharacter(character)) {
        currentNumberString.value += character

        if (!currentNumberString.adjacentToSymbol && hasSymbolNeighbour(lines, { characterIndex, lineIndex })) {
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

const getUniquePartNumberNeighourCoordinates = (lines: Array<string>, coordinate: Coordinate): Array<Coordinate> => {
  const { characterIndex, lineIndex } = coordinate
  const coordinates: Array<Coordinate> = []

  if (RegexUtils.isNumberCharacter(getNeighbour.left(lines, coordinate))) {
    coordinates.push({ characterIndex: characterIndex - 1, lineIndex })
  }

  if (RegexUtils.isNumberCharacter(getNeighbour.right(lines, coordinate))) {
    coordinates.push({ characterIndex: characterIndex + 1, lineIndex })
  }

  if (lineIndex > 0) {
    if (RegexUtils.isNumberCharacter(getNeighbour.topLeft(lines, coordinate))) {
      coordinates.push({ characterIndex: characterIndex - 1, lineIndex: lineIndex - 1 })

      if (
        !RegexUtils.isNumberCharacter(getNeighbour.topMiddle(lines, coordinate)) &&
        RegexUtils.isNumberCharacter(getNeighbour.topRight(lines, coordinate))
      ) {
        coordinates.push({ characterIndex: characterIndex + 1, lineIndex: lineIndex - 1 })
      }
    } else if (RegexUtils.isNumberCharacter(getNeighbour.topMiddle(lines, coordinate))) {
      coordinates.push({ characterIndex, lineIndex: lineIndex - 1 })
    } else if (RegexUtils.isNumberCharacter(getNeighbour.topRight(lines, coordinate))) {
      coordinates.push({ characterIndex: characterIndex + 1, lineIndex: lineIndex - 1 })
    }
  }

  if (lineIndex < lines.length - 1) {
    if (RegexUtils.isNumberCharacter(getNeighbour.bottomLeft(lines, coordinate))) {
      coordinates.push({ characterIndex: characterIndex - 1, lineIndex: lineIndex + 1 })

      if (
        !RegexUtils.isNumberCharacter(getNeighbour.bottomMiddle(lines, coordinate)) &&
        RegexUtils.isNumberCharacter(getNeighbour.bottomRight(lines, coordinate))
      ) {
        coordinates.push({ characterIndex: characterIndex + 1, lineIndex: lineIndex + 1 })
      }
    } else if (RegexUtils.isNumberCharacter(getNeighbour.bottomMiddle(lines, coordinate))) {
      coordinates.push({ characterIndex, lineIndex: lineIndex + 1 })
    } else if (RegexUtils.isNumberCharacter(getNeighbour.bottomRight(lines, coordinate))) {
      coordinates.push({ characterIndex: characterIndex + 1, lineIndex: lineIndex + 1 })
    }
  }

  return coordinates
}

const isGear = (numberNeighbourCoordinates: Array<Coordinate>): boolean => {
  return numberNeighbourCoordinates.length === 2
}

const getPartNumberFromChildCoordinates = (lines: Array<string>, coordinate: Coordinate): number => {
  const line = lines[coordinate.lineIndex]
  let firstNumberCharacterIndex = coordinate.characterIndex
  let lastNumberCharacterIndex = coordinate.characterIndex

  while (firstNumberCharacterIndex > 0 && RegexUtils.isNumberCharacter(line[firstNumberCharacterIndex - 1])) {
    firstNumberCharacterIndex -= 1
  }

  while (
    lastNumberCharacterIndex < line.length - 1 &&
    RegexUtils.isNumberCharacter(line[lastNumberCharacterIndex + 1])
  ) {
    lastNumberCharacterIndex += 1
  }

  return Number(line.slice(firstNumberCharacterIndex, lastNumberCharacterIndex + 1))
}

const partTwo = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(zeroPaddedDay)
  const gearRatios: Array<number> = []

  lines.forEach((line, lineIndex) => {
    line.split('').forEach((character, characterIndex) => {
      if (character === '*') {
        const uniquePartNumberNeighourCoordinates = getUniquePartNumberNeighourCoordinates(lines, {
          characterIndex,
          lineIndex,
        })

        if (isGear(uniquePartNumberNeighourCoordinates)) {
          gearRatios.push(
            getPartNumberFromChildCoordinates(lines, uniquePartNumberNeighourCoordinates[0]) *
              getPartNumberFromChildCoordinates(lines, uniquePartNumberNeighourCoordinates[1]),
          )
        }
      }
    })
  })

  return MathUtils.sumNumbers(gearRatios)
}

export { partOne, partTwo }
