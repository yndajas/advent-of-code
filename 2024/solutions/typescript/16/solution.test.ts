import { describe, expect, it } from "bun:test";

import { partOne } from "./solutionPartOne";
import { partTwo } from "./solutionPartTwo";

describe("2024 day 16", () => {
	describe("part 1", () => {
		it("returns 135512", () => {
			expect(partOne()).toEqual(135512);
		});
	});

	describe("part 2", () => {
		it("returns 541", () => {
			expect(partTwo()).toEqual(541);
		});
	});
});
