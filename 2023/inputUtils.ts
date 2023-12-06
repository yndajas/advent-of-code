export default class InputUtils {
  static async getInput(path: string): Promise<string> {
    return Bun.file(path).text()
  }

  static async getInputLines(path: string): Promise<Array<string>> {
    const input = await InputUtils.getInput(path)
    return input.split('\n')
  }
}
