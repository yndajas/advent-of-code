const lines = (
	await Bun.file(`${process.env.ASSETS_REPO}/2024/input/16`).text()
).split("\n");
const maxY = lines.length - 1;

type Orientation = "north" | "east" | "south" | "west";
type Coordinate = { x: number; y: number };
type Position = Coordinate & { orientation: Orientation };
type Path = { score: number; log: Position[] };

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

export type { Coordinate, Path, Position };
export {
	currentPositionFromPath,
	maxY,
	nextPositionForward,
	nextPositionLeft,
	nextPositionRight,
	pathIncludesCoordinate,
	positionToString,
	reverse,
	valueAt,
};
