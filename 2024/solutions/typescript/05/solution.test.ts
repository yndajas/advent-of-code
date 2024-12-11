import { describe, expect, it } from "bun:test";

import { partOne, partTwoSolutionOne, partTwoSolutionTwo } from "./solution";

describe("2024 day 5", () => {
	describe("part 1", () => {
		it("returns 4905", () => {
			expect(partOne()).toEqual(4905);
		});
	});

	describe("part 2 solution 1", () => {
		it("returns 6204", () => {
			expect(partTwoSolutionOne()).toEqual(6204);
		});
	});

	describe("part 2 solution 2", () => {
		it("returns 6204", () => {
			expect(partTwoSolutionTwo()).toEqual(6204);
		});
	});
});
