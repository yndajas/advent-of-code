type CoordinateOrMovement = { x: number; y: number };

const byteFallCoordinates: CoordinateOrMovement[] = (
	await Bun.file(`${process.env.ASSETS_REPO}/2024/input/18`).text()
)
	.split("\n")
	.map((coordinateString) => {
		const [x, y] = coordinateString
			.split(",")
			.map((coordinatePartString) => Number.parseInt(coordinatePartString, 10));

		return { x, y };
	});

type MapArray = string[][];
type Path = CoordinateOrMovement[];
type LeastStepsByCoordinate = Record<string, number>;

function partOne(rowAndColumnCount = 71, fallenByteCount = 1024) {
	const map: MapArray = generateMap(rowAndColumnCount);

	markFallenBytes(map, fallenByteCount);

	return leastSteps(
		map,
		{ x: 0, y: 0 },
		{ x: rowAndColumnCount - 1, y: rowAndColumnCount - 1 },
	);
}

function partTwo(rowAndColumnCount = 71, maxFallenByteCount = 3450) {
	for (let fallenByteCount = maxFallenByteCount; ; fallenByteCount--) {
		if (partOne(rowAndColumnCount, fallenByteCount)) {
			return coordinateToString(byteFallCoordinates[fallenByteCount]);
		}
	}
}

// console.log(partOne());
// console.log(partOne(7, 12));

// console.log(partTwo());
// console.log(partTwo(7, 25));

function generateMap(rowAndColumnCount: number) {
	const map: MapArray = [];

	for (let y = 0; y < rowAndColumnCount; y++) {
		map[y] = [];
		for (let x = 0; x < rowAndColumnCount; x++) {
			map[y][x] = ".";
		}
	}

	return map;
}

function markFallenBytes(map: MapArray, fallenByteCount: number) {
	for (const coordinate of byteFallCoordinates.slice(0, fallenByteCount)) {
		const { x, y } = coordinate;

		map[y][x] = "#";
	}
}

function leastSteps(
	map: MapArray,
	from: CoordinateOrMovement,
	to: CoordinateOrMovement,
) {
	let best: number;
	const currentPath: Path = [{ ...from }];
	const leastStepsByCoordinate: Record<string, number> = {};

	while (currentPath.length > 0) {
		if (best && best <= stepCount(currentPath) + 1) {
			currentPath.pop();
		} else if (
			moveSouth(map, currentPath, leastStepsByCoordinate) ||
			moveEast(map, currentPath, leastStepsByCoordinate) ||
			moveNorth(map, currentPath, leastStepsByCoordinate) ||
			moveWest(map, currentPath, leastStepsByCoordinate)
		) {
			if (coordinatesMatch(currentCoordinateFromPath(currentPath), to)) {
				best = stepCount(currentPath);

				currentPath.pop();
			}
		} else {
			currentPath.pop();
		}
	}

	return best;
}

function currentCoordinateFromPath(path: Path) {
	return path[path.length - 1];
}

function coordinatesMatch(a: CoordinateOrMovement, b: CoordinateOrMovement) {
	return a.x === b.x && a.y === b.y;
}

function coordinateToString({ x, y }: CoordinateOrMovement) {
	return `${x},${y}`;
}

function moveSouth(
	map: MapArray,
	currentPath: Path,
	leastStepsByCoordinate: LeastStepsByCoordinate,
) {
	const currentCoordinate = currentCoordinateFromPath(currentPath);
	const nextCoordinate = { ...currentCoordinate, y: currentCoordinate.y + 1 };

	return move(map, nextCoordinate, currentPath, leastStepsByCoordinate);
}

function moveEast(
	map: MapArray,
	currentPath: Path,
	leastStepsByCoordinate: LeastStepsByCoordinate,
) {
	const currentCoordinate = currentCoordinateFromPath(currentPath);
	const nextCoordinate = { ...currentCoordinate, x: currentCoordinate.x + 1 };

	return move(map, nextCoordinate, currentPath, leastStepsByCoordinate);
}

function moveNorth(
	map: MapArray,
	currentPath: Path,
	leastStepsByCoordinate: LeastStepsByCoordinate,
) {
	const currentCoordinate = currentCoordinateFromPath(currentPath);
	const nextCoordinate = { ...currentCoordinate, y: currentCoordinate.y - 1 };

	return move(map, nextCoordinate, currentPath, leastStepsByCoordinate);
}

function moveWest(
	map: MapArray,
	currentPath: Path,
	leastStepsByCoordinate: LeastStepsByCoordinate,
) {
	const currentCoordinate = currentCoordinateFromPath(currentPath);
	const nextCoordinate = { ...currentCoordinate, x: currentCoordinate.x - 1 };

	return move(map, nextCoordinate, currentPath, leastStepsByCoordinate);
}

function move(
	map: MapArray,
	nextCoordinate: CoordinateOrMovement,
	currentPath: Path,
	leastStepsByCoordinate: LeastStepsByCoordinate,
) {
	if (outOfBounds(map, nextCoordinate)) return false;
	if (fallenByteAtCoordinate(map, nextCoordinate)) return false;
	if (pathIncludesCoordinate(currentPath, nextCoordinate)) return false;

	const nextCoordinateString = coordinateToString(nextCoordinate);

	if (
		leastStepsByCoordinate[nextCoordinateString] <=
		stepCount(currentPath) + 1
	)
		return false;

	currentPath.push({ ...nextCoordinate });
	leastStepsByCoordinate[nextCoordinateString] = stepCount(currentPath);

	return true;
}

function stepCount(path: Path) {
	return path.length - 1;
}

function fallenByteAtCoordinate(map: MapArray, { x, y }: CoordinateOrMovement) {
	return map[y][x] === "#";
}

function outOfBounds(map: MapArray, { x, y }: CoordinateOrMovement) {
	if (x < 0 || y < 0) return true;

	return y >= map.length || x >= map[0].length;
}

function pathIncludesCoordinate(path: Path, coordinate: CoordinateOrMovement) {
	return path.some((coordinateInPath) =>
		coordinatesMatch(coordinateInPath, coordinate),
	);
}

function printMap(map: MapArray) {
	let mapString = "";

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			mapString += map[y][x];
		}

		mapString += "\n";
	}

	console.log(mapString);
}

export { partOne, partTwo };
