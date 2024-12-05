import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 5", () => {
	describe("part 1", () => {
		it("returns 4905", async () => {
			expect(partOne()).toEqual(4905);
		});
	});

	describe("part 2", () => {
		it("returns 6204", async () => {
			expect(partTwo()).toEqual(6204);
		});
	});
});
