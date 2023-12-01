import { describe, expect, it } from 'bun:test'

import { partOne, partTwo } from './solution'

describe('2023 day one', () => {
  describe('part one', () => {
    it('returns 54877', async () => {
      expect(await partOne()).toEqual(54877)
    })
  })

  describe('part two', () => {
    it('returns 54100', async () => {
      expect(await partTwo()).toEqual(54100)
    })
  })
})
