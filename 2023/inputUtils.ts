export default class InputUtils {
  static async getInput(zeroPaddedDay: string): Promise<string> {
    const path = `${import.meta.dir}/${zeroPaddedDay}/input`
    return Bun.file(path).text()
  }

  static async getInputLines(path: string): Promise<Array<string>> {
    const input = await InputUtils.getInput(path)
    return input.split('\n')
  }
}
