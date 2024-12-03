import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2024 day 3", () => {
	describe("part 1", () => {
		it("returns 159892596", async () => {
			expect(await partOne()).toEqual(159892596);
		});
	});
});
