import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 8", () => {
	describe("part 1", () => {
		it("returns 291", () => {
			expect(partOne()).toEqual(291);
		});
	});

	describe("part 2", () => {
		it("returns 1015", () => {
			expect(partTwo()).toEqual(1015);
		});
	});
});
