const rows = (
	await Bun.file(`${import.meta.dir}/../../../input/10`).text()
).split("\n");
const maxX = rows[0].length - 1;
const maxY = rows.length - 1;

const cardinalMovements: CoordinateOrMovement[] = [
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 },
];

type CoordinateOrMovement = { x: number; y: number };

type Map = number[][];

const map: Map = rows.map((row) =>
	row.split("").map((cellString) => Number.parseInt(cellString, 10)),
);

function partOne() {
	let totalTrailheadScores = 0;

	map.forEach((row, y) => {
		for (const xString in row) {
			const x = Number.parseInt(xString, 10);
			totalTrailheadScores += findReachablePeaks(map, { x, y }, 0).size;
		}
	});

	return totalTrailheadScores;
}

function partTwo() {
	let totalTrailheadScores = 0;

	map.forEach((row, y) => {
		for (const xString in row) {
			const x = Number.parseInt(xString, 10);
			totalTrailheadScores += validPathCount(map, { x, y }, 0);
		}
	});

	return totalTrailheadScores;
}

console.log(partOne());
console.log(partTwo());

function findReachablePeaks(
	map: Map,
	startingPoint: CoordinateOrMovement,
	validElevation = 0,
	reachablePeaks: Set<string> = new Set(),
) {
	const elevation = map[startingPoint.y][startingPoint.x];

	if (elevation !== validElevation) return reachablePeaks;
	if (elevation === 9) {
		reachablePeaks.add(coordinateToString(startingPoint));
		return reachablePeaks;
	}

	for (const movement of cardinalMovements) {
		const nextPoint = move(startingPoint, movement);

		if (nextPoint) {
			findReachablePeaks(map, nextPoint, validElevation + 1, reachablePeaks);
		}
	}

	return reachablePeaks;
}

function validPathCount(
	map: Map,
	startingPoint: CoordinateOrMovement,
	validElevation = 0,
) {
	const elevation = map[startingPoint.y][startingPoint.x];

	if (elevation !== validElevation) return 0;
	if (elevation === 9) return 1;

	let trailheadScore = 0;

	for (const movement of cardinalMovements) {
		const nextPoint = move(startingPoint, movement);

		if (nextPoint) {
			trailheadScore += validPathCount(map, nextPoint, validElevation + 1);
		}
	}

	return trailheadScore;
}

function move(
	startingPoint: CoordinateOrMovement,
	movement: CoordinateOrMovement,
): CoordinateOrMovement | false {
	const candidate = {
		x: startingPoint.x + movement.x,
		y: startingPoint.y + movement.y,
	};

	return validPoint(candidate) ? candidate : false;
}

function validPoint(point: CoordinateOrMovement) {
	return point.x >= 0 && point.x <= maxX && point.y >= 0 && point.y <= maxY;
}

function coordinateToString(coordinate: CoordinateOrMovement) {
	return `${coordinate.x}.${coordinate.y}`;
}

export { partOne, partTwo };
