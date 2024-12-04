import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 4", () => {
	describe("part 1", () => {
		it("returns 2562", async () => {
			expect(partOne()).toEqual(2562);
		});
	});

	describe("part 2", () => {
		it("returns 1902", async () => {
			expect(partTwo()).toEqual(1902);
		});
	});
});
