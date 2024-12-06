const lines = (
	await Bun.file(`${import.meta.dir}/../../../input/06`).text()
).split("\n");

type ObstacleMap = boolean[][];

type Coordinate = {
	x: number;
	y: number;
};

// {"12.13": true} where guard visits coordinate { x: 12, y: 13 }
type VisitedCoordinates = Record<string, boolean>;

enum Orientation {
	up = 0,
	right = 1,
	down = 2,
	left = 3,
}

type Guard = {
	exited: boolean;
	position: Coordinate;
	orientation: Orientation;
};

function partOne() {
	const guard: Guard = {
		orientation: 0,
		position: { x: 0, y: 0 },
		exited: false,
	};

	const obstacleMap: ObstacleMap = [];

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
					guard.position = { x, y };
					break;
			}
		});
	});

	const visitedCoordinates: VisitedCoordinates = {
		[coordinateToString(guard.position)]: true,
	};

	while (!guard.exited) {
		move(guard, obstacleMap, visitedCoordinates);
	}

	return Object.keys(visitedCoordinates).length;
}

console.log(partOne());

function coordinateToString(coordinate: Coordinate) {
	return `${coordinate.x}.${coordinate.y}`;
}

function move(
	guard: Guard,
	obstacleMap: ObstacleMap,
	visitedCoordinates: VisitedCoordinates,
) {
	const possibleNextCoordinate = nextCoordinate(guard);

	if (outOfBounds(possibleNextCoordinate, obstacleMap)) {
		guard.exited = true;
	} else if (hasObstacle(possibleNextCoordinate, obstacleMap)) {
		rotateClockwise(guard);
		move(guard, obstacleMap, visitedCoordinates);
	} else {
		guard.position = possibleNextCoordinate;
		visitedCoordinates[coordinateToString(possibleNextCoordinate)] = true;
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
	if (obstacleMap[coordinate.x][coordinate.y] === undefined) {
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

export { partOne };
