import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2023 day 5", () => {
	describe("part 1", () => {
		it("returns 1189304", async () => {
			expect(await partOne()).toEqual(1189304);
		});
	});
});
