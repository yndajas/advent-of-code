export default class InputUtils {
  static async getInputLines(path: string): Promise<Array<string>> {
    const input = await Bun.file(path).text()
    return input.split('\n')
  }
}
