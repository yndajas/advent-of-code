import InputUtils from '../inputUtils'
import RegexUtils from '../regexUtils'

const zeroPaddedDay = '05'

type MapRange = { delta: number; sourceMax: number; sourceMin: number }
type Map = Array<MapRange>

const getMapsFromMapStrings = (mapStrings: Array<string>, sortMapsByDestinationMin = false): Array<Map> => {
  return mapStrings.map(mapString => {
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
      .sort((rangeA, rangeB) => {
        if (sortMapsByDestinationMin) {
          return rangeA.sourceMin + rangeA.delta - (rangeB.sourceMin + rangeB.delta)
        } else {
          return rangeA.sourceMin - rangeB.sourceMin
        }
      })
  })
}

const partOne = async (): Promise<number> => {
  const input = await InputUtils.getInput(zeroPaddedDay)
  const [seedsString, ...mapStrings] = input.split('\n\n')
  const maps = getMapsFromMapStrings(mapStrings)
  const seedNumbers = RegexUtils.getIntegers(seedsString)

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

type SeedNumberRange = { end: number; start: number }

const getSeedFromLocationNumber = (
  maps: Array<Map>,
  seedNumberRanges: Array<SeedNumberRange>,
  locationNumber: number,
): number | undefined => {
  let currentNumber = locationNumber
  maps.forEach(map => {
    map.find(range => {
      if (currentNumber < range.sourceMin + range.delta) {
        return true
      } else if (currentNumber >= range.sourceMin + range.delta && currentNumber <= range.sourceMax + range.delta) {
        currentNumber -= range.delta
        return true
      }
    })
  })

  if (
    seedNumberRanges.find(range => {
      return currentNumber >= range.start && currentNumber <= range.end
    })
  ) {
    return currentNumber
  } else {
    return undefined
  }
}

const partTwo = async (): Promise<number> => {
  const input = await InputUtils.getInput(zeroPaddedDay)
  const [seedRangesString, ...mapStrings] = input.split('\n\n')
  const seedNumberRanges: Array<SeedNumberRange> = (seedRangesString.match(/[0-9]+\s[0-9]+/g) as RegExpMatchArray).map(
    seedRangeString => {
      const [start, length] = seedRangeString.split(' ').map(number => Number(number))

      return { end: start + length - 1, start }
    },
  )
  const reversedMaps = getMapsFromMapStrings(mapStrings, true).reverse()

  let seedNumber: number | undefined

  let currentLocationNumber = 0

  while (!seedNumber) {
    currentLocationNumber++
    seedNumber = getSeedFromLocationNumber(reversedMaps, seedNumberRanges, currentLocationNumber)
  }

  return currentLocationNumber
}

export { partOne, partTwo }
