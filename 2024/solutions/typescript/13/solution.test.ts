import { describe, expect, it } from "bun:test";

import {
	partOneBruteForce,
	partOneWithDivideAndConquer,
	partOneWithDivision,
	partTwo,
} from "./solution";

describe("2024 day 13", () => {
	describe("part 1 brute force", () => {
		it("returns 27157", () => {
			expect(partOneBruteForce()).toEqual(27157);
		});
	});

	describe("part 1 with division", () => {
		it("returns 27157", () => {
			expect(partOneWithDivision()).toEqual(27157);
		});
	});

	describe("part 1 with divide and conquer", () => {
		it("returns 27157", () => {
			expect(partOneWithDivideAndConquer()).toEqual(27157);
		});
	});

	describe("part 2", () => {
		it("returns 104015411578548", () => {
			expect(partTwo()).toEqual(104015411578548);
		});
	});
});
