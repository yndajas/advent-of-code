import { describe, expect, it } from 'bun:test'

import { partOne, partTwo } from './solution'

describe('2023 day 5', () => {
  describe('part 1', () => {
    it('returns 313045984', async () => {
      expect(await partOne()).toEqual(313045984)
    })
  })

  describe('part 2', () => {
    it('returns 20283860', async () => {
      expect(await partTwo()).toEqual(20283860)
    })
  })
})
