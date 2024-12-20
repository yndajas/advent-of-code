import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 10", () => {
	describe("part 1", () => {
		it("returns 816", () => {
			expect(partOne()).toEqual(816);
		});
	});

	describe("part 2", () => {
		it("returns 1960", () => {
			expect(partTwo()).toEqual(1960);
		});
	});
});
