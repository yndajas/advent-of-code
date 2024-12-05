const [rules, updates] = (
	await Bun.file(`${import.meta.dir}/../../../input/05`).text()
)
	.split("\n\n")
	.map((section) => section.split("\n"));

function partOne() {
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

	return updates
		.map((update): number | undefined => {
			const numbers = update
				.split(",")
				.map((numberString) => Number.parseInt(numberString, 10));

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

			if (correctOrder) {
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

console.log(partOne());

export { partOne };
