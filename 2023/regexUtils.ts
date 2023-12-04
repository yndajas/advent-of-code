export default class RegexUtils {
  static isNumberCharacter(character: string | undefined): boolean {
    if (!character || character.length > 1) {
      return false
    }

    return !!character.match(/[0-9]/)
  }
}
