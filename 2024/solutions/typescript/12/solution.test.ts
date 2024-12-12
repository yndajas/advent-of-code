import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 12", () => {
	describe("part 1", () => {
		it("returns 1488414", () => {
			expect(partOne()).toEqual(1488414);
		});
	});

	describe("part 2", () => {
		it("returns 911750", () => {
			expect(partTwo()).toEqual(911750);
		});
	});
});
