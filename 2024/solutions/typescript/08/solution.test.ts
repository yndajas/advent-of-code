import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2024 day 7", () => {
	describe("part 1", () => {
		it("returns 291", async () => {
			expect(partOne()).toEqual(291);
		});
	});
});
