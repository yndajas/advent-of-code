import { describe, expect, it } from "bun:test";

import { partOne, partOneWithDivision } from "./solution";

describe("2024 day 13", () => {
	describe("part 1", () => {
		it("returns 27157", () => {
			expect(partOne()).toEqual(27157);
		});
	});

	describe("part 1 with division", () => {
		it("returns 27157", () => {
			expect(partOneWithDivision()).toEqual(27157);
		});
	});
});
