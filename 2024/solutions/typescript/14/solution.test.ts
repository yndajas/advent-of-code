import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2024 day 14", () => {
	describe("part 1", () => {
		it("returns 218619120", () => {
			expect(partOne({ width: 101, height: 103 })).toEqual(218619120);
		});
	});
});
