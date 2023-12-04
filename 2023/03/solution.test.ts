import { describe, expect, it } from 'bun:test'

import { partOne } from './solution'

describe('2023 day one', () => {
  describe('part one', () => {
    it('returns 527364', async () => {
      expect(await partOne()).toEqual(527364)
    })
  })
})
