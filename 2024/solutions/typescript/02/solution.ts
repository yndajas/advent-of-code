const lines = (
	await Bun.file(`${import.meta.dir}/../../../input/02`).text()
).split("\n");

function partOne() {
	let safeReportCount = 0;

	for (const report of lines) {
		const levels = report.split(" ").map((level) => Number.parseInt(level));

		if (!unsafeJumpIndex(levels)) {
			safeReportCount += 1;
		}
	}

	return safeReportCount;
}

function partTwo() {
	let safeReportCount = 0;

	for (const report of lines) {
		const levelsArray = report
			.split(" ")
			.map((level) => Number.parseInt(level));
		const levelsArrayAndSubArrays = originalAndSubArrays(levelsArray);

		if (levelsArrayAndSubArrays.some((array) => !unsafeJumpIndex(array))) {
			safeReportCount++;
		}
	}

	return safeReportCount;
}

function unsafeJumpIndex(levels: number[]): number | undefined {
	const increasing = levels[0] < levels[1];

	for (const currentLevelIndexString in levels) {
		const currentLevelIndex = Number.parseInt(currentLevelIndexString);

		if (currentLevelIndex === 0) {
			continue;
		}

		const currentLevel = levels[currentLevelIndex];
		const previousLevel = levels[currentLevelIndex - 1];
		let progress: number;

		if (increasing) {
			progress = currentLevel - previousLevel;
		} else {
			progress = previousLevel - currentLevel;
		}

		if (progress < 1 || progress > 3) {
			return currentLevelIndex;
		}
	}
}

function originalAndSubArrays(originalArray: number[]) {
	const arrays = [originalArray];

	for (const index in originalArray) {
		const subArray = [...originalArray];
		subArray.splice(Number.parseInt(index), 1);
		arrays.push(subArray);
	}

	return arrays;
}

console.log(partOne());
console.log(partTwo());

export { partOne, partTwo };
