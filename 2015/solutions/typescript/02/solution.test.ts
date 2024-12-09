import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2015 day 1", () => {
	describe("part 1", () => {
		it("returns 1588178", async () => {
			expect(partOne()).toEqual(1588178);
		});
	});

	describe("part 2", () => {
		it("returns 3783758", async () => {
			expect(partTwo()).toEqual(3783758);
		});
	});
});
