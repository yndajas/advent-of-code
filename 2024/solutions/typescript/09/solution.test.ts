import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 9", () => {
	describe("part 1", () => {
		it("returns 6283404590840", async () => {
			expect(partOne()).toEqual(6283404590840);
		});
	});

	describe("part 2", () => {
		it("returns 6304576012713", async () => {
			expect(partTwo()).toEqual(6304576012713);
		});
	});
});
