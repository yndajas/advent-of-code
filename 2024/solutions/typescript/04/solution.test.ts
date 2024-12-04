import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2024 day 4", () => {
	describe("part 1", () => {
		it("returns 2562", async () => {
			expect(partOne()).toEqual(2562);
		});
	});
});
