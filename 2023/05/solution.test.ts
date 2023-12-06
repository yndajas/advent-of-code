import { describe, expect, it } from 'bun:test'

import { partOne } from './solution'

describe('2023 day 5', () => {
  describe('part 1', () => {
    it('returns 313045984', async () => {
      expect(await partOne()).toEqual(313045984)
    })
  })
})
