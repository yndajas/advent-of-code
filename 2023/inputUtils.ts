export default class InputUtils {
  static async getInput(zeroPaddedDay: string): Promise<string> {
    const path = `${process.env.ASSETS_REPO}/2023/input/${zeroPaddedDay}`
    return Bun.file(path).text()
  }

  static async getInputLines(path: string): Promise<Array<string>> {
    const input = await InputUtils.getInput(path)
    return input.split('\n')
  }
}
