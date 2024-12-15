import { describe, expect, it } from "bun:test";

import {
	partOne,
	partTwoFindLine,
	partTwoFindLineButWithBiggerIncrements,
	partTwoLookForLackOfOverlaps,
} from "./solution";

describe("2024 day 14", () => {
	describe("part 1", () => {
		it("returns 218619120", () => {
			expect(partOne({ width: 101, height: 103 })).toEqual(218619120);
		});
	});

	describe("part 2 by looking for a lack of overlapping robots", () => {
		it("returns 7055", () => {
			expect(partTwoLookForLackOfOverlaps({ width: 101, height: 103 })).toEqual(
				7055,
			);
		});
	});

	describe("part 2 by finding a line of adjacent robots over a manually-found threshold", () => {
		it("returns 7055", () => {
			expect(partTwoFindLine({ width: 101, height: 103 })).toEqual(7055);
		});
	});

	describe("part 2 by finding a line of adjacent robots over a manually-found threshold, but incrementing the seconds checked by the index of the second with the most robots in a single line", () => {
		it("returns 7055", () => {
			expect(
				partTwoFindLineButWithBiggerIncrements({ width: 101, height: 103 }),
			).toEqual(7055);
		});
	});
});
