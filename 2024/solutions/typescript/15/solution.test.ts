import { describe, expect, it } from "bun:test";

import { partOne } from "./solution";

describe("2024 day 15", () => {
	describe("part 1", () => {
		it("returns 1485257", () => {
			expect(partOne()).toEqual(1485257);
		});
	});
});
