import { describe, expect, it } from "bun:test";
import { partOne } from "./solution";

describe("2024 day 17", () => {
	describe("part 1", () => {
		it("outputs 3,6,7,0,5,7,3,1,4", () => {
			expect(partOne().output).toEqual("3,6,7,0,5,7,3,1,4");
		});

		describe("when C is 9 with program 2,6", () => {
			it("sets B to 1", () => {
				const unparsedRegisters = "Register A: 0\nRegister B: 0\nRegister C: 9";
				const unparsedProgram = "Program: 2,6";

				const result = partOne(unparsedRegisters, unparsedProgram);

				expect(result.registers.b).toEqual(1);
			});
		});

		describe("when A is 10 with program 5,0,5,1,5,4", () => {
			it("outputs 0,1,2", () => {
				const unparsedRegisters =
					"Register A: 10\nRegister B: 0\nRegister C: 0";
				const unparsedProgram = "Program: 5,0,5,1,5,4";

				const result = partOne(unparsedRegisters, unparsedProgram);

				expect(result.output).toEqual("0,1,2");
			});
		});

		describe("when A is 2024 with program 0,1,5,4,3,0", () => {
			it("sets A to 0 and outputs 4,2,5,6,7,7,7,7,3,1,0", () => {
				const unparsedRegisters =
					"Register A: 2024\nRegister B: 0\nRegister C: 0";
				const unparsedProgram = "Program: 0,1,5,4,3,0";

				const result = partOne(unparsedRegisters, unparsedProgram);

				expect(result.registers.a).toEqual(0);
				expect(result.output).toEqual("4,2,5,6,7,7,7,7,3,1,0");
			});
		});

		describe("when B is 29 with program 1,7", () => {
			it("sets B to 26", () => {
				const unparsedRegisters =
					"Register A: 0\nRegister B: 29\nRegister C: 0";
				const unparsedProgram = "Program: 1,7";

				const result = partOne(unparsedRegisters, unparsedProgram);

				expect(result.registers.b).toEqual(26);
			});
		});

		describe("when B is 2024 and C is 43690 with program 4,0", () => {
			it("sets B to 44354", () => {
				const unparsedRegisters =
					"Register A: 0\nRegister B: 2024\nRegister C: 43690";
				const unparsedProgram = "Program: 4,0";

				const result = partOne(unparsedRegisters, unparsedProgram);

				expect(result.registers.b).toEqual(44354);
			});
		});

		describe("when A is 729 with program 0,1,5,4,3,0", () => {
			it("outputs 4,6,3,5,6,3,5,2,1,0", () => {
				const unparsedRegisters =
					"Register A: 729\nRegister B: 0\nRegister C: 0";
				const unparsedProgram = "Program: 0,1,5,4,3,0";

				const result = partOne(unparsedRegisters, unparsedProgram);

				expect(result.output).toEqual("4,6,3,5,6,3,5,2,1,0");
			});
		});
	});
});
