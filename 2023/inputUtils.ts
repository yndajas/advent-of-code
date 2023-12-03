export const getInput = async (path: string): Promise<string> => {
  return Bun.file(path).text()
}
