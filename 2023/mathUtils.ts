export default class MathUtils {
  static sumNumbers(numbers: Array<number>): number {
    return numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)
  }
}
