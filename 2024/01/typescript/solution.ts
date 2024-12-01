const lines = (await Bun.file(`${import.meta.dir}/../input`).text()).split(
	"\n",
);

type LocationId = number;

async function partOne() {
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

export { partOne };
