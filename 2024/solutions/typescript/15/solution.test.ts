import { describe, expect, it } from "bun:test";

import { partOne } from "./solutionPartOne";
import { partTwo } from "./solutionPartTwo";

describe("2024 day 15", () => {
	describe("part 1", () => {
		it("returns 1485257", () => {
			expect(partOne()).toEqual(1485257);
		});
	});

	describe("part 2", () => {
		it("returns 1475512", () => {
			expect(partTwo()).toEqual(1475512);
		});
	});
});
