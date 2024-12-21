import { describe, expect, it } from "bun:test";
import { partOne, partTwo } from "./solution";

describe("2024 day 20", () => {
	describe("part 1", () => {
		it("returns 1351", () => {
			expect(partOne()).toEqual(1351);
		});
	});

	describe("part 2", () => {
		it("returns 966130", () => {
			expect(partTwo()).toEqual(966130);
		});
	});
});
