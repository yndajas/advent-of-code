import { mkdirSync } from 'node:fs'

const getInput = async (prompt: string, errorMessage: string, length: number) => {
  process.stdout.write(prompt)

  for await (const line of console) {
    if (line.length === length && Number(line)) {
      return Number(line)
    } else {
      console.log(errorMessage)
      process.stdout.write(prompt)
    }
  }
}

const day = (await getInput('Day: ', 'Day must be two digits (zero-padded)', 2)) as number
const zeroPaddedDayString = day < 10 ? `0${day}` : day.toString()

const newDirectoryPath = `${import.meta.dir}/../${zeroPaddedDayString}`

mkdirSync(newDirectoryPath, { recursive: true })
Bun.write(newDirectoryPath + '/input', '')
Bun.write(newDirectoryPath + '/prompt.html', `<a href="https://adventofcode.com/2023/day/${day}">Webpage</a>\n`)
Bun.write(
  newDirectoryPath + '/solution.test.ts',
  `import { describe, expect, it } from 'bun:test'

import { partOne } from './solution'

describe('2023 day ${day}', () => {
  describe('part 1', () => {
    // it('returns NUMBER', async () => {
    //   expect(await partOne()).toEqual(NUMBER)
    // })
  })
})
`,
)
Bun.write(
  newDirectoryPath + '/solution.ts',
  `import InputUtils from '../inputUtils'

const inputPath = './${zeroPaddedDayString}/input'

const partOne = async (): Promise<number> => {
  const lines = await InputUtils.getInputLines(inputPath)
}

export { partOne }
`,
)

process.exit()
