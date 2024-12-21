import { describe, expect, it } from "bun:test";
import { partOne, partTwo } from "./solution";

describe("2024 day 19", () => {
	describe("part 1", () => {
		it("returns 344", () => {
			expect(partOne()).toEqual(344);
		});
	});

	describe("part 2", () => {
		it("returns 996172272010026", () => {
			expect(partTwo()).toEqual(996172272010026);
		});
	});
});
