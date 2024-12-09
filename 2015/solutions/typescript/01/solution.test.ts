import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2015 day 1", () => {
	describe("part 1", () => {
		it("returns 280", async () => {
			expect(partOne()).toEqual(280);
		});
	});

	describe("part 2", () => {
		it("returns 1797", async () => {
			expect(partTwo()).toEqual(1797);
		});
	});
});
