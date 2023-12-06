import InputUtils from '../inputUtils'
import RegexUtils from '../regexUtils'

const inputPath = './2023/05/input'

type Range = { delta: number; sourceMax: number; sourceMin: number }
type Map = Array<Range>

const partOne = async (): Promise<number> => {
  const input = await InputUtils.getInput(inputPath)
  const [seedsString, ...mapStrings] = input.split('\n\n')
  const seedNumbers = RegexUtils.getIntegers(seedsString)

  const maps: Array<Map> = mapStrings.map(mapString => {
    const rangeStrings = mapString.split('\n').slice(1)

    return rangeStrings
      .map(rangeString => {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = RegexUtils.getIntegers(rangeString)
        return {
          delta: destinationRangeStart - sourceRangeStart,
          sourceMax: sourceRangeStart + rangeLength - 1,
          sourceMin: sourceRangeStart,
        }
      })
      .sort((rangeA, rangeB) => rangeA.sourceMin - rangeB.sourceMin)
  })

  return seedNumbers.reduce((accumulator, seedNumber, seedNumberIndex) => {
    let currentNumber = seedNumber

    maps.forEach(map => {
      map.find(range => {
        if (currentNumber < range.sourceMin) {
          return true
        } else if (currentNumber >= range.sourceMin && currentNumber <= range.sourceMax) {
          currentNumber += range.delta
          return true
        }
      })
    })

    if (seedNumberIndex === 0 || currentNumber < accumulator) {
      return currentNumber
    } else {
      return accumulator
    }
  }, 0)
}

export { partOne }
