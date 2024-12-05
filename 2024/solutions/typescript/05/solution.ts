const [rules, updates] = (
	await Bun.file(`${import.meta.dir}/../../../input/05`).text()
)
	.split("\n\n")
	.map((section) => section.split("\n"));

type PrecedingNumbers = number[];

const precedingNumbersByNumber: Record<number, PrecedingNumbers> = {};

for (const rule of rules) {
	const [precedingNumber, number] = rule
		.split("|")
		.map((numberString) => Number.parseInt(numberString, 10));

	precedingNumbersByNumber[number] = (
		precedingNumbersByNumber[number] || []
	).concat(precedingNumber);
}

function partOne() {
	return updates
		.map((update): number | undefined => {
			const numbers = update
				.split(",")
				.map((numberString) => Number.parseInt(numberString, 10));

			if (isCorrectlyOrdered(numbers)) {
				const middleIndex = Math.floor(numbers.length / 2);
				return numbers[middleIndex];
			}
		})
		.filter(
			(middleNumberFromCorrectlyOrderedUpdateOrUndefined) =>
				middleNumberFromCorrectlyOrderedUpdateOrUndefined,
		)
		.reduce(
			(accumulator, currentMiddleNumber) => accumulator + currentMiddleNumber,
			0,
		);
}

function partTwoSolutionOne() {
	return updates
		.map((update): number | undefined => {
			const numbers = update
				.split(",")
				.map((numberString) => Number.parseInt(numberString, 10));

			if (!isCorrectlyOrdered(numbers)) {
				const middleIndex = Math.floor(numbers.length / 2);
				return fixOrder(numbers)[middleIndex];
			}
		})
		.filter(
			(middleNumberFromCorrectlyOrderedUpdateOrUndefined) =>
				middleNumberFromCorrectlyOrderedUpdateOrUndefined,
		)
		.reduce(
			(accumulator, currentMiddleNumber) => accumulator + currentMiddleNumber,
			0,
		);
}

function partTwoSolutionTwo() {
	return updates
		.map((update): number | undefined => {
			const numbers = update
				.split(",")
				.map((numberString) => Number.parseInt(numberString, 10));

			if (!isCorrectlyOrdered(numbers)) {
				numbers.sort((a, b) =>
					precedingNumbersByNumber[a].includes(b) ? 1 : -1,
				);
				const middleIndex = Math.floor(numbers.length / 2);
				return numbers[middleIndex];
			}
		})
		.filter(
			(middleNumberFromCorrectlyOrderedUpdateOrUndefined) =>
				middleNumberFromCorrectlyOrderedUpdateOrUndefined,
		)
		.reduce(
			(accumulator, currentMiddleNumber) => accumulator + currentMiddleNumber,
			0,
		);
}

function isCorrectlyOrdered(numbers: number[]) {
	let correctOrder = true;

	for (
		let numberIndex = 0;
		numberIndex < numbers.length - 1 && correctOrder;
		numberIndex++
	) {
		const currentNumber = numbers[numberIndex];
		const nextNumber = numbers[numberIndex + 1];
		correctOrder =
			!precedingNumbersByNumber[currentNumber] ||
			!precedingNumbersByNumber[currentNumber].includes(nextNumber);
	}

	return correctOrder;
}

function fixOrder(numbers: number[]) {
	for (let numberIndex = 0; numberIndex < numbers.length - 1; numberIndex++) {
		const currentNumber = numbers[numberIndex];
		const nextNumber = numbers[numberIndex + 1];

		if (precedingNumbersByNumber[currentNumber]?.includes(nextNumber)) {
			const nextArray = [
				...numbers.slice(0, numberIndex),
				nextNumber,
				currentNumber,
				...numbers.slice(numberIndex + 2),
			];
			return fixOrder(nextArray);
		}
	}

	return numbers;
}

console.log(partOne());
console.log(partTwoSolutionOne());
console.log(partTwoSolutionTwo());

export { partOne, partTwoSolutionOne, partTwoSolutionTwo };
