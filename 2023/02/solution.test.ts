import { describe, expect, it } from 'bun:test'

import { partOne, partTwo } from './solution'

describe('2023 day 2', () => {
  describe('part 1', () => {
    it('returns 2149', async () => {
      expect(await partOne()).toEqual(2149)
    })
  })

  describe('part 2', () => {
    it('returns 71274', async () => {
      expect(await partTwo()).toEqual(71274)
    })
  })
})
