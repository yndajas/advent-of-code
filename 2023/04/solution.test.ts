import { describe, expect, it } from 'bun:test'

import { partOne, partTwo } from './solution'

describe('2023 day 4', () => {
  describe('part 1', () => {
    it('returns 24848', async () => {
      expect(await partOne()).toEqual(24848)
    })
  })

  describe('part 2', () => {
    it('returns 7258152', async () => {
      expect(await partTwo()).toEqual(7258152)
    })
  })
})
