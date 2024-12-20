import { describe, expect, it } from "bun:test";
import { partOne, partTwo } from "./solution";

describe("2024 day 18", () => {
	describe("part 1", () => {
		it("returns 446", () => {
			expect(partOne()).toEqual(446);
		});
	});

	describe("part 2", () => {
		it("returns 39,40", () => {
			expect(partTwo()).toEqual("39,40");
		});
	});
});
