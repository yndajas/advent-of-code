import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2024 day 11", () => {
	describe("part 1", () => {
		it("returns 199986", async () => {
			expect(partOne()).toEqual(199986);
		});
	});
});
