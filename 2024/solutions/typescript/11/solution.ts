const stones = (await Bun.file(`${process.env.ASSETS_REPO}/2024/input/11`).text())
	.split(" ")
	.map((stoneString) => Number.parseInt(stoneString, 10));

function partOne() {
	return stoneCountByBlinkCount(25);
}

function partTwo() {
	return stoneCountByBlinkCount(75);
}

function stoneCountByBlinkCount(blinkCount: number) {
	const stoneCountByBlinkCountByStone: Record<
		number,
		Record<number, number>
	> = {};

	for (const stone of stones) {
		calculateStoneCountByBlinkCount(
			stone,
			blinkCount,
			stoneCountByBlinkCountByStone,
		);
	}

	return stones.reduce(
		(accumulator, stone) =>
			accumulator + stoneCountByBlinkCountByStone[stone][blinkCount],
		0,
	);
}

function calculateStoneCountByBlinkCount(
	stone: number,
	blinkCount: number,
	stoneCountByBlinkCountByStone: Record<number, Record<number, number>>,
): number {
	if (blinkCount === 0) {
		return 1;
	}

	if (stoneCountByBlinkCountByStone[stone]?.[blinkCount]) {
		return stoneCountByBlinkCountByStone[stone][blinkCount];
	}

	stoneCountByBlinkCountByStone[stone] ||= {};

	const stoneCount = blink(stone)
		.map((childStone) =>
			calculateStoneCountByBlinkCount(
				childStone,
				blinkCount - 1,
				stoneCountByBlinkCountByStone,
			),
		)
		.reduce((accumulator, childBlinkCount) => accumulator + childBlinkCount, 0);

	stoneCountByBlinkCountByStone[stone][blinkCount] = stoneCount;
	return stoneCount;
}

function blink(stone: number) {
	if (stone === 0) {
		return [1];
	}

	const stringifiedStone = stone.toString();
	const digitCount = stringifiedStone.length;

	if (digitCount % 2 === 0) {
		const leftSide = Number.parseInt(
			stone.toString().slice(0, digitCount / 2),
			10,
		);
		const rightSide = Number.parseInt(
			stone.toString().slice(digitCount / 2),
			10,
		);

		return [leftSide, rightSide];
	}

	return [stone * 2024];
}

console.log(partOne());
console.log(partTwo());

export { partOne, partTwo };
