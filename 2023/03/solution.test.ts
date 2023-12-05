import { describe, expect, it } from 'bun:test'

import { partOne, partTwo } from './solution'

describe('2023 day 3', () => {
  describe('part 1', () => {
    it('returns 527364', async () => {
      expect(await partOne()).toEqual(527364)
    })
  })

  describe('part 2', () => {
    it('returns 79026871', async () => {
      expect(await partTwo()).toEqual(79026871)
    })
  })
})
