const lines = (
	await Bun.file(`${import.meta.dir}/../../../input/06`).text()
).split("\n");

type Coordinate = {
	x: number;
	y: number;
};

enum Orientation {
	up = 0,
	right = 1,
	down = 2,
	left = 3,
}

type ObstacleMap = boolean[][];

type VisitedCoordinateWithOrientation = Record<Orientation, boolean>;

type Guard = {
	exited: boolean;
	looped: boolean;
	position: Coordinate;
	orientation: Orientation;
	// {"12.13": [1]} where guard visits coordinate { x: 12, y: 13 } with right orientation
	visitedCoordinates: Record<string, VisitedCoordinateWithOrientation>;
};

function setup(): [ObstacleMap, Coordinate] {
	const obstacleMap: ObstacleMap = [];
	let startingPosition = { x: 0, y: 0 };

	lines.forEach((row, y) => {
		row.split("").forEach((cell, x) => {
			if (y === 0) {
				obstacleMap[x] = [];
			}

			switch (cell) {
				case ".":
					obstacleMap[x][y] = false;
					break;
				case "#":
					obstacleMap[x][y] = true;
					break;
				case "^":
					obstacleMap[x][y] = false;
					startingPosition = { x, y };
					break;
			}
		});
	});

	return [obstacleMap, startingPosition];
}

function partOne() {
	const [obstacleMap, startingPosition] = setup();

	return visitedCoordinates(obstacleMap, startingPosition).length;
}

function partTwo() {
	const [originalObstacleMap, startingPosition] = setup();

	const newObstacleOptions = visitedCoordinates(
		originalObstacleMap,
		startingPosition,
	).slice(1);

	const newObstacleMaps: ObstacleMap[] = [];

	for (const newObstacleOption of newObstacleOptions) {
		const newObstacleMap = JSON.parse(JSON.stringify(originalObstacleMap));
		newObstacleMap[newObstacleOption.x][newObstacleOption.y] = true;
		newObstacleMaps.push(newObstacleMap);
	}

	let mapsThatCauseLoopCount = 0;

	for (const newObstacleMap of newObstacleMaps) {
		const guard = newGuard(startingPosition);

		while (!guard.exited && !guard.looped) {
			move(guard, newObstacleMap);
		}

		if (guard.looped) {
			mapsThatCauseLoopCount++;
		}
	}

	return mapsThatCauseLoopCount;
}

// console.log(partOne());
// console.log(partTwo());

function newGuard(startingPosition: Coordinate): Guard {
	const guard = {
		exited: false,
		looped: false,
		position: startingPosition,
		orientation: 0,
		visitedCoordinates: {},
	};

	guard.visitedCoordinates[coordinateToString(startingPosition)] = { 0: true };

	return guard;
}

function coordinateToString(coordinate: Coordinate) {
	return `${coordinate.x}.${coordinate.y}`;
}

function stringToCoordinate(string: string): Coordinate {
	const [x, y] = string
		.split(".")
		.map((xOrYString) => Number.parseInt(xOrYString, 10));
	return { x, y };
}

function move(guard: Guard, obstacleMap: ObstacleMap) {
	const possibleNextCoordinate = nextCoordinate(guard);

	if (outOfBounds(possibleNextCoordinate, obstacleMap)) {
		guard.exited = true;
	} else if (hasLooped(guard, possibleNextCoordinate)) {
		guard.looped = true;
	} else if (hasObstacle(possibleNextCoordinate, obstacleMap)) {
		rotateClockwise(guard);
		move(guard, obstacleMap);
	} else {
		guard.position = possibleNextCoordinate;
		const coordinateString = coordinateToString(possibleNextCoordinate);
		guard.visitedCoordinates[coordinateString] = {
			...guard.visitedCoordinates[coordinateString],
			[guard.orientation]: true,
		};
	}
}

function nextCoordinate(guard): Coordinate {
	const movementMap: Record<Orientation, { x: number; y: number }> = {
		0: { x: 0, y: -1 },
		1: { x: 1, y: 0 },
		2: { x: 0, y: 1 },
		3: { x: -1, y: 0 },
	};

	const movement = movementMap[guard.orientation];

	return { x: guard.position.x + movement.x, y: guard.position.y + movement.y };
}

function outOfBounds(coordinate: Coordinate, obstacleMap: ObstacleMap) {
	if (obstacleMap[coordinate.x]?.[coordinate.y] === undefined) {
		return true;
	}

	return false;
}

function hasObstacle(coordinate: Coordinate, obstacleMap: ObstacleMap) {
	return obstacleMap[coordinate.x][coordinate.y];
}

function rotateClockwise(guard: Guard) {
	if (guard.orientation === 3) {
		guard.orientation = 0;
	} else {
		guard.orientation++;
	}
}

function visitedCoordinates(
	obstacleMap: ObstacleMap,
	startingPosition: Coordinate,
) {
	const guard = newGuard(startingPosition);

	while (!guard.exited) {
		move(guard, obstacleMap);
	}

	return Object.keys(guard.visitedCoordinates).map(stringToCoordinate);
}

function hasLooped(guard: Guard, nextCoordinate: Coordinate) {
	return guard.visitedCoordinates[coordinateToString(nextCoordinate)]?.[
		guard.orientation
	];
}

export { partOne, partTwo };
