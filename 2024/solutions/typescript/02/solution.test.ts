import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 2", () => {
	describe("part 1", () => {
		it("returns 220", () => {
			expect(partOne()).toEqual(220);
		});
	});

	describe("part 2", () => {
		it("returns 296", () => {
			expect(partTwo()).toEqual(296);
		});
	});
});
