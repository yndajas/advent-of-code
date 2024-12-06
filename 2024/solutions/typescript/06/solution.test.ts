import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2024 day 6", () => {
	describe("part 1", () => {
		it("returns 4752", async () => {
			expect(partOne()).toEqual(4752);
		});
	});
});
