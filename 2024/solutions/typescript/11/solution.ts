const stones = (await Bun.file(`${import.meta.dir}/../../../input/11`).text())
	.split(" ")
	.map((stoneString) => Number.parseInt(stoneString, 10));

function partOne() {
	let mutableStones = [...stones];

	for (let blinkCount = 0; blinkCount < 25; blinkCount++) {
		mutableStones = blink(mutableStones);
	}

	return mutableStones.length;
}

function blink(stones: number[]) {
	const updatedStones: number[] = [];

	for (const stone of stones) {
		if (stone === 0) {
			updatedStones.push(1);
			continue;
		}

		const stringifiedStone = stone.toString();
		const digitCount = stringifiedStone.length;

		if (digitCount % 2 === 0) {
			const leftSide = Number.parseInt(
				stringifiedStone.slice(0, digitCount / 2),
				10,
			);
			const rightSide = Number.parseInt(
				stringifiedStone.slice(digitCount / 2),
				10,
			);

			updatedStones.push(leftSide, rightSide);
			continue;
		}

		updatedStones.push(stone * 2024);
	}

	return updatedStones;
}

console.log(partOne());

export { partOne };
