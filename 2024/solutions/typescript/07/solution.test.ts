import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2024 day 7", () => {
	describe("part 1", () => {
		it("returns 3351424677624", async () => {
			expect(partOne()).toEqual(3351424677624);
		});
	});
});
