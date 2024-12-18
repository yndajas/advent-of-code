import { describe, expect, it } from "bun:test";

import { partOne } from "./solutionPartOne";

describe("2024 day 16", () => {
	describe("part 1", () => {
		it("returns 135512", () => {
			expect(partOne()).toEqual(135512);
		});
	});
});
