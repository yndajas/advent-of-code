import { describe, expect, it } from "bun:test";

import { partOne, partTwoSolutionOne, partTwoSolutionTwo } from "./solution";

describe("2024 day 1", () => {
	describe("part 1", () => {
		it("returns 1189304", () => {
			expect(partOne()).toEqual(1189304);
		});
	});

	describe("part 2 solution 1", () => {
		it("returns 24349736", () => {
			expect(partTwoSolutionOne()).toEqual(24349736);
		});
	});

	describe("part 2 solution 2", () => {
		it("returns 24349736", () => {
			expect(partTwoSolutionTwo()).toEqual(24349736);
		});
	});
});
