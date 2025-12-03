const lines = (
	await Bun.file(`${process.env.ASSETS_REPO}/2024/input/07`).text()
).split("\n");

type ConcatenateOperator = "||";
type Operator = "+" | "*" | ConcatenateOperator;

function partOne() {
	return sumResultsOfValidLines(["+", "*"]);
}

function partTwo() {
	return sumResultsOfValidLines(["+", "*", "||"]);
}

// console.log(partOne());
// console.log(partTwo());

function sumResultsOfValidLines(operators: Operator[]) {
	const validLines = lines.filter((line) => {
		const [targetResult, operands] = resultAndOperandsFromLine(line);

		return anyWithPermutations(
			operands.length - 1,
			operators,
			[],
			(operators) =>
				operatorsAndOperandsGeneratesResult(operands, operators, targetResult),
		);
	});

	return validLines.reduce(
		(accumulator, validLine) =>
			accumulator + Number.parseInt(validLine.split(": ")[0], 10),
		0,
	);
}

function resultAndOperandsFromLine(line: string): [number, number[]] {
	const [resultArray, operands] = line
		.split(": ")
		.map((outerSplitString) =>
			outerSplitString
				.split(" ")
				.map((innerSplitString) => Number.parseInt(innerSplitString, 10)),
		);

	return [resultArray[0], operands];
}

function anyWithPermutations(
	count: number,
	options: Operator[],
	previous: Operator[],
	predicate: (permutation: Operator[]) => boolean,
) {
	for (const option of options) {
		const current: Operator[] = [...previous];
		current.push(option);

		if (current.length === count) {
			if (predicate(current)) {
				return true;
			}
		} else if (anyWithPermutations(count, options, current, predicate))
			return true;
	}

	return false;
}

function operatorsAndOperandsGeneratesResult(
	operands: number[],
	operators: Operator[],
	targetResult: number,
) {
	let permutationResult = operands[0];
	operators.forEach((operator, operatorIndex) => {
		if (permutationResult > targetResult) {
			return false;
		}

		const nextOperand = operands[operatorIndex + 1];

		switch (operator) {
			case "+":
				permutationResult += nextOperand;
				break;
			case "*":
				permutationResult *= nextOperand;
				break;
			case "||":
				permutationResult = Number.parseInt(
					permutationResult.toString() + nextOperand.toString(),
					10,
				);
				break;
		}
	});

	return permutationResult === targetResult;
}

export { partOne, partTwo };
