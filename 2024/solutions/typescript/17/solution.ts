const [defaultUnparsedRegisters, defaultUnparsedProgram] = (
	await Bun.file(`${import.meta.dir}/../../../input/17`).text()
).split("\n\n");

type Operator = number;
type Operand = number;
type Instruction = [Operator, Operand];
type Program = Instruction[];
type Registers = { a: number; b: number; c: number };

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

// console.log(partOne());

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
		.map((registerString) => Number(registerString.match(/\d+/)));

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
	registers.b = comboOperand(operand, registers) % 8;
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
	registers.b = registers.b ^ operand;
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
	return registers.a === 0 ? currentPointer + 2 : operand;
}

function out(
	operand: Operand,
	registers: Registers,
	outputArray: number[],
	_currentPointer: number,
) {
	outputArray.push(comboOperand(operand, registers) % 8);
}

function dv(operand: Operand, registers: Registers) {
	return Math.floor(registers.a / 2 ** comboOperand(operand, registers));
}

function comboOperand(operand: Operand, registers: Registers) {
	return {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: registers.a,
		5: registers.b,
		6: registers.c,
	}[operand];
}

export { partOne };
