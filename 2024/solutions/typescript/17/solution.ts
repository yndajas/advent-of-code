const [defaultUnparsedRegisters, defaultUnparsedProgram] = (
	await Bun.file(`${process.env.ASSETS_REPO}/2024/input/17`).text()
).split("\n\n");

type Operator = number;
type Operand = number;
type Instruction = [Operator, Operand];
type Program = Instruction[];
type Registers = { a: bigint; b: bigint; c: bigint };

function partOne(
	unparsedRegisters = defaultUnparsedRegisters,
	unparsedProgram = defaultUnparsedProgram,
) {
	const registers = parseRegisters(unparsedRegisters);
	const program = parseProgram(unparsedProgram);
	let instructionPointer = 0;
	const outputArray: number[] = [];

	while (true) {
		const instruction = instructionAt(program, instructionPointer);

		if (!instruction) break;

		instructionPointer = performOperation(
			instruction,
			registers,
			outputArray,
			instructionPointer,
		);
	}

	return { registers, output: outputArray.join(",") };
}

function partTwo(
	unparsedRegisters = defaultUnparsedRegisters,
	unparsedProgram = defaultUnparsedProgram,
	a: bigint = BigInt(0),
	targetMatchLength = 1,
) {
	const registers = parseRegisters(unparsedRegisters);
	registers.a = a;
	const program = parseProgram(unparsedProgram);
	let instructionPointer = 0;
	const outputArray: number[] = [];

	while (true) {
		const instruction = instructionAt(program, instructionPointer);

		if (!instruction) break;

		instructionPointer = performOperation(
			instruction,
			registers,
			outputArray,
			instructionPointer,
		);
	}

	if (outputMatchesFullProgram(outputArray, program)) {
		return a;
	}

	if (outputMatchesEndOfProgram(targetMatchLength, outputArray, program)) {
		return partTwo(
			unparsedRegisters,
			unparsedProgram,
			a * BigInt(8),
			targetMatchLength + 1,
		);
	}

	return partTwo(
		unparsedRegisters,
		unparsedProgram,
		a + BigInt(1),
		targetMatchLength,
	);
}

// console.log(partOne().output);
// console.log(partTwo());

function parseProgram(unparsedProgram: string): Program {
	return unparsedProgram
		.match(/\d,\d/g)
		.map(
			(instructionString) =>
				instructionString
					.split(",")
					.map((operatorOrOperand) =>
						Number.parseInt(operatorOrOperand, 10),
					) as Instruction,
		);
}

function parseRegisters(unparsedRegisters: string): Registers {
	const [a, b, c] = unparsedRegisters
		.split("\n")
		.map((registerString) => BigInt(registerString.match(/\d+/)[0]));

	return { a, b, c };
}

function instructionAt(program: Program, pointer: number): Instruction {
	return program[pointer / 2];
}

function performOperation(
	[operator, operand]: Instruction,
	registers: Registers,
	outputArray: number[],
	currentPointer: number,
) {
	const functionForOperator = {
		0: adv,
		1: bxl,
		2: bst,
		3: jnz,
		4: bxc,
		5: out,
		7: cdv,
	}[operator];

	if (functionForOperator === jnz) {
		return jnz(operand, registers, outputArray, currentPointer);
	}

	functionForOperator(operand, registers, outputArray, currentPointer);
	return currentPointer + 2;
}

function adv(
	operand: Operand,
	registers: Registers,
	_outputArray: number[],
	_currentPointer: number,
) {
	registers.a = dv(operand, registers);
}

function bst(
	operand: Operand,
	registers: Registers,
	_outputArray: number[],
	_currentPointer: number,
) {
	registers.b = comboOperand(operand, registers) % BigInt(8);
}

function bxc(
	_operand: Operand,
	registers: Registers,
	_outputArray: number[],
	_currentPointer: number,
) {
	registers.b = registers.b ^ registers.c;
}

function bxl(
	operand: Operand,
	registers: Registers,
	_outputArray: number[],
	_currentPointer: number,
) {
	registers.b = registers.b ^ BigInt(operand);
}

function cdv(
	operand: Operand,
	registers: Registers,
	_outputArray: number[],
	_currentPointer: number,
) {
	registers.c = dv(operand, registers);
}

function jnz(
	operand: Operand,
	registers: Registers,
	_outputArray: number[],
	currentPointer: number,
) {
	return registers.a === BigInt(0) ? currentPointer + 2 : operand;
}

function out(
	operand: Operand,
	registers: Registers,
	outputArray: number[],
	_currentPointer: number,
) {
	outputArray.push(Number(comboOperand(operand, registers) % BigInt(8)));
}

function dv(operand: Operand, registers: Registers) {
	return BigInt(registers.a / BigInt(2) ** comboOperand(operand, registers));
}

function comboOperand(operand: Operand, registers: Registers) {
	if (operand < 4) {
		return BigInt(operand);
	}

	return {
		4: registers.a,
		5: registers.b,
		6: registers.c,
	}[operand];
}

function outputMatchesFullProgram(outputArray: number[], program: Program) {
	const outputString = outputArray.join("");
	const programString = program
		.map((instruction) => instruction.join(""))
		.join("");

	return outputString === programString;
}

function outputMatchesEndOfProgram(
	lastNItems: number,
	outputArray: number[],
	program: Program,
) {
	const outputString = outputArray
		.join("")
		.slice(outputArray.length - lastNItems);
	const programString = program
		.map((instruction) => instruction.join(""))
		.join("")
		.slice(program.length * 2 - lastNItems);

	return outputString === programString;
}

export { partOne, partTwo };
