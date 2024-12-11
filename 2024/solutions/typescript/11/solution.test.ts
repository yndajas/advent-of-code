import { describe, expect, it } from "bun:test";

import { partOne, partTwo } from "./solution";

describe("2024 day 11", () => {
	describe("part 1", () => {
		it("returns 199986", () => {
			expect(partOne()).toEqual(199986);
		});
	});

	describe("part 2", () => {
		it("returns 236804088748754", () => {
			expect(partTwo()).toEqual(236804088748754);
		});
	});
});
