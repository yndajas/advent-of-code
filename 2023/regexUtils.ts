export default class RegexUtils {
  static getIntegers(string: string): Array<number> {
    return RegexUtils.getIntegerStrings(string).map(integerString => Number(integerString))
  }

  static getIntegerStrings(string: string): RegExpMatchArray {
    return string.match(/[0-9]+/g) as RegExpMatchArray
  }

  static isNumberCharacter(character: string | undefined): boolean {
    if (!character || character.length > 1) {
      return false
    }

    return !!character.match(/[0-9]/)
  }
}
