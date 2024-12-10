import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2024 day 10", () => {
	describe("part 1", () => {
		it("returns 816", async () => {
			expect(partOne()).toEqual(816);
		});
	});
});
