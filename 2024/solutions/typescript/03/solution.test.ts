import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 3", () => {
	describe("part 1", () => {
		it("returns 159892596", () => {
			expect(partOne()).toEqual(159892596);
		});
	});

	describe("part 2", () => {
		it("returns 92626942", () => {
			expect(partTwo()).toEqual(92626942);
		});
	});
});
