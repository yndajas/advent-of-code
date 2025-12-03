const lines = (
	await Bun.file(`${process.env.ASSETS_REPO}/2024/input/01`).text()
).split("\n");

type LocationId = number;

function partOne() {
	const leftSideLocationIds: Array<LocationId> = [];
	const rightSideLocationIds: Array<LocationId> = [];

	for (const line of lines) {
		const [leftSideLocationId, rightSideLocationId] = line
			.split("   ")
			.map((locationIdString) => Number.parseInt(locationIdString, 10));
		leftSideLocationIds.push(leftSideLocationId);
		rightSideLocationIds.push(rightSideLocationId);
	}

	leftSideLocationIds.sort();
	rightSideLocationIds.sort();

	const diffs: Array<number> = [];

	leftSideLocationIds.forEach((leftSideLocationId, index) => {
		const rightSideLocationId = rightSideLocationIds[index];
		diffs.push(Math.abs(leftSideLocationId - rightSideLocationId));
	});

	return diffs.reduce(
		(accumulator, currentNumber) => accumulator + currentNumber,
		0,
	);
}

function partTwoSolutionOne() {
	const leftSideLocationIdMatchesOnRightSide: Record<LocationId, number> = {};
	const rightSideLocationIds: Array<LocationId> = [];

	for (const line of lines) {
		const [leftSideLocationId, rightSideLocationId] = line
			.split("   ")
			.map((locationIdString) => Number.parseInt(locationIdString, 10));
		leftSideLocationIdMatchesOnRightSide[leftSideLocationId] = 0;
		rightSideLocationIds.push(rightSideLocationId);
	}

	for (const locationId of rightSideLocationIds) {
		if (typeof leftSideLocationIdMatchesOnRightSide[locationId] === "number") {
			leftSideLocationIdMatchesOnRightSide[locationId]++;
		}
	}

	return Object.entries(leftSideLocationIdMatchesOnRightSide).reduce(
		(accumulator, currentMatch) => {
			const locationId = Number.parseInt(currentMatch[0], 10);
			const matchesOnRightSide = currentMatch[1];
			return accumulator + locationId * matchesOnRightSide;
		},
		0,
	);
}

function partTwoSolutionTwo() {
	const leftSideLocationIds: Record<LocationId, boolean> = {};
	const rightSideLocationIds: Array<LocationId> = [];

	for (const line of lines) {
		const [leftSideLocationId, rightSideLocationId] = line
			.split("   ")
			.map((locationIdString) => Number.parseInt(locationIdString, 10));
		leftSideLocationIds[leftSideLocationId] = true;
		rightSideLocationIds.push(rightSideLocationId);
	}

	let similarityScore = 0;

	for (const rightSidelocationId of rightSideLocationIds) {
		if (leftSideLocationIds[rightSidelocationId]) {
			similarityScore += rightSidelocationId;
		}
	}

	return similarityScore;
}

console.log(partOne());
console.log(partTwoSolutionOne());
console.log(partTwoSolutionTwo());

export { partOne, partTwoSolutionOne, partTwoSolutionTwo };
