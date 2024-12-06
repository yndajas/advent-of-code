import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 6", () => {
	describe("part 1", () => {
		it("returns 4752", async () => {
			expect(partOne()).toEqual(4752);
		});
	});

	describe("part 2", () => {
		it("returns 1719", async () => {
			expect(partTwo()).toEqual(1719);
		});
	});
});
