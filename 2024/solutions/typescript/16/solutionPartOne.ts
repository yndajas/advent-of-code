const lines = (
	await Bun.file(`${import.meta.dir}/../../../input/16`).text()
).split("\n");
const maxY = lines.length - 1;

type Orientation = "north" | "east" | "south" | "west";
type Coordinate = { x: number; y: number };
type Position = Coordinate & { orientation: Orientation };
type Path = { score: number; log: Position[] };
type LowestScoresAtPositions = Record<string, number>;

function partOne() {
	let lowestEndScore: number;
	const currentPath: Path = {
		score: 0,
		log: [{ x: 1, y: maxY - 1, orientation: "east" }],
	};
	const lowestScoresAtPositions: LowestScoresAtPositions = {
		[positionToString(currentPositionFromPath(currentPath))]: 0,
	};

	while (currentPath.log.length > 0) {
		if (
			moveForward(currentPath, lowestScoresAtPositions, lowestEndScore) ||
			moveRight(currentPath, lowestScoresAtPositions, lowestEndScore) ||
			moveLeft(currentPath, lowestScoresAtPositions, lowestEndScore)
		) {
			if (valueAt(currentPositionFromPath(currentPath)) === "E") {
				if (lowestEndScore) {
					lowestEndScore = Math.min(currentPath.score, lowestEndScore);
				} else {
					lowestEndScore = currentPath.score;
				}

				reverse(currentPath);
			}
		} else reverse(currentPath);
	}

	return lowestEndScore;
}

// console.log(partOne());

function moveForward(
	currentPath: Path,
	lowestScoresAtPositions: LowestScoresAtPositions,
	lowestEndScore: number,
) {
	const nextPosition = nextPositionForward(currentPath);

	return move(
		currentPath,
		nextPosition,
		lowestEndScore,
		lowestScoresAtPositions,
		1,
	);
}

function moveRight(
	currentPath: Path,
	lowestScoresAtPositions: LowestScoresAtPositions,
	lowestEndScore: number,
) {
	const nextPosition = nextPositionRight(currentPath);

	return move(
		currentPath,
		nextPosition,
		lowestEndScore,
		lowestScoresAtPositions,
		1001,
	);
}

function moveLeft(
	currentPath: Path,
	lowestScoresAtPositions: LowestScoresAtPositions,
	lowestEndScore: number,
) {
	const nextPosition = nextPositionLeft(currentPath);

	return move(
		currentPath,
		nextPosition,
		lowestEndScore,
		lowestScoresAtPositions,
		1001,
	);
}

function move(
	currentPath: Path,
	nextPosition: Position,
	lowestEndScore: number,
	lowestScoresAtPositions: LowestScoresAtPositions,
	increment: number,
) {
	if (valueAt(nextPosition) === "#") {
		return false;
	}

	if (pathIncludesCoordinate(currentPath, nextPosition)) {
		return false;
	}

	const nextPositionString = positionToString(nextPosition);
	const lowestScoreAtPosition = lowestScoresAtPositions[nextPositionString];

	if (lowestEndScore && lowestEndScore <= currentPath.score + increment) {
		return false;
	}

	if (
		lowestScoreAtPosition &&
		lowestScoreAtPosition <= currentPath.score + increment
	) {
		return false;
	}

	currentPath.log.push({ ...nextPosition });
	currentPath.score += increment;
	lowestScoresAtPositions[nextPositionString] = currentPath.score;

	return true;
}

function pathIncludesCoordinate(path: Path, coordinate: Coordinate) {
	return path.log.some(
		(positionInPath) =>
			positionInPath.x === coordinate.x && positionInPath.y === coordinate.y,
	);
}

function nextPositionForward(currentPath: Path): Position {
	const currentPosition = currentPositionFromPath(currentPath);

	switch (currentPosition.orientation) {
		case "north":
			return { ...currentPosition, y: currentPosition.y - 1 };
		case "east":
			return { ...currentPosition, x: currentPosition.x + 1 };
		case "south":
			return { ...currentPosition, y: currentPosition.y + 1 };
		case "west":
			return { ...currentPosition, x: currentPosition.x - 1 };
	}
}

function nextPositionRight(currentPath: Path): Position {
	const currentPosition = currentPositionFromPath(currentPath);

	switch (currentPosition.orientation) {
		case "north":
			return {
				...currentPosition,
				x: currentPosition.x + 1,
				orientation: "east",
			};
		case "east":
			return {
				...currentPosition,
				y: currentPosition.y + 1,
				orientation: "south",
			};
		case "south":
			return {
				...currentPosition,
				x: currentPosition.x - 1,
				orientation: "west",
			};
		case "west":
			return {
				...currentPosition,
				y: currentPosition.y - 1,
				orientation: "north",
			};
	}
}

function nextPositionLeft(currentPath: Path): Position {
	const currentPosition = currentPositionFromPath(currentPath);

	switch (currentPosition.orientation) {
		case "north":
			return {
				...currentPosition,
				x: currentPosition.x - 1,
				orientation: "west",
			};
		case "east":
			return {
				...currentPosition,
				y: currentPosition.y - 1,
				orientation: "north",
			};
		case "south":
			return {
				...currentPosition,
				x: currentPosition.x + 1,
				orientation: "east",
			};
		case "west":
			return {
				...currentPosition,
				y: currentPosition.y + 1,
				orientation: "south",
			};
	}
}

function valueAt(coordinate: Coordinate) {
	return lines[coordinate.y][coordinate.x];
}

function positionToString(position: Position) {
	return `${position.x},${position.y},${position.orientation}`;
}

function reverse(currentPath: Path) {
	const previousPosition = currentPath.log.pop();
	const newPosition = currentPositionFromPath(currentPath);

	if (!newPosition) {
		return;
	}

	if (newPosition.orientation === previousPosition.orientation) {
		currentPath.score -= 1;
	} else {
		currentPath.score -= 1001;
	}
}

function currentPositionFromPath(currentPath: Path) {
	return currentPath.log[currentPath.log.length - 1];
}

export { partOne };
