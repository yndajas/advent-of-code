import { describe, expect, it } from 'bun:test'

import { partOne } from './solution'

describe('2023 day 4', () => {
  describe('part 1', () => {
    it('returns 24848', async () => {
      expect(await partOne()).toEqual(24848)
    })
  })
})
