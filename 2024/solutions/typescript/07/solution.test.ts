import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 7", () => {
	describe("part 1", () => {
		it("returns 3351424677624", () => {
			expect(partOne()).toEqual(3351424677624);
		});
	});

	describe("part 2", () => {
		it("returns 204976636995111", () => {
			expect(partTwo()).toEqual(204976636995111);
		});
	});
});
