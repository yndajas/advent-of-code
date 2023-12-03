import { getInput } from '../inputUtils'

const inputPath = './2023/01/input'

const partOne = async (): Promise<number> => {
  const input = await getInput(inputPath)

  const lines = input.split('\n')
  const result = lines.reduce((accumulator, line) => {
    const digits = line.match(/[0-9]/g) as Array<string>
    const number = Number(digits[0] + digits[digits.length - 1])
    return accumulator + number
  }, 0)

  return result
}

type Digit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type DigitWord = 'eight' | 'five' | 'four' | 'nine' | 'one' | 'seven' | 'six' | 'three' | 'two'

const isDigit = (digitOrDigitWord: Digit | DigitWord): digitOrDigitWord is Digit => {
  return digitOrDigitWord.length === 1
}

const digitOrDigitWordToDigit = (digitOrDigitWord: Digit | DigitWord): Digit => {
  if (isDigit(digitOrDigitWord)) {
    return digitOrDigitWord
  }

  const digitWordToDigit: Record<string, Digit> = {
    eight: '8',
    five: '5',
    four: '4',
    nine: '9',
    one: '1',
    seven: '7',
    six: '6',
    three: '3',
    two: '2',
  }

  return digitWordToDigit[digitOrDigitWord]
}

const partTwo = async (): Promise<number> => {
  const input = await getInput(inputPath)
  const lines = input.split('\n')
  const result = lines.reduce((accumulator, line) => {
    const digitsAndDigitWords: Array<Digit | DigitWord> = []
    const regex = /^([0-9]|one|two|three|four|five|six|seven|eight|nine)/

    for (let characterIndex = 0; characterIndex < line.length; characterIndex++) {
      const matchArray = line.substring(characterIndex).match(regex)

      if (matchArray) {
        digitsAndDigitWords.push(matchArray[0] as Digit | DigitWord)
      }
    }

    const number = Number(
      digitOrDigitWordToDigit(digitsAndDigitWords[0]) +
        digitOrDigitWordToDigit(digitsAndDigitWords[digitsAndDigitWords.length - 1]),
    )

    return accumulator + number
  }, 0)

  return result
}

export { partOne, partTwo }
