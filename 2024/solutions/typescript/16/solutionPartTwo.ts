import type { Coordinate, Path, Position } from "./shared";
import {
	currentPositionFromPath,
	maxY,
	nextPositionForward,
	nextPositionLeft,
	nextPositionRight,
	pathIncludesCoordinate,
	positionToString,
	reverse,
	valueAt,
} from "./shared";
import { partOne } from "./solutionPartOne";

type VisitedPositions = Record<
	string,
	{ bestSeat?: boolean; lowestScoreAtPosition?: number }
>;

const lowestEndScore = partOne();

function partTwo() {
	const currentPath: Path = {
		score: 0,
		log: [{ x: 1, y: maxY - 1, orientation: "east" }],
	};
	const visitedPositions: VisitedPositions = {
		[positionToString(currentPositionFromPath(currentPath))]: {
			lowestScoreAtPosition: 0,
		},
	};
	const bestSeats: Set<string> = new Set();

	while (currentPath.log.length > 0) {
		if (
			moveForward(currentPath, visitedPositions, bestSeats) ||
			moveRight(currentPath, visitedPositions, bestSeats) ||
			moveLeft(currentPath, visitedPositions, bestSeats)
		) {
			if (valueAt(currentPositionFromPath(currentPath)) === "E") {
				for (const position of currentPath.log) {
					bestSeats.add(coordinateToString(position));
					visitedPositions[positionToString(position)] ||= {};
					visitedPositions[positionToString(position)].bestSeat = true;
				}
				// add a string of the path to an array, which can be checked against in `move` - if the prospective path matches a recorded valid path (from the start but not to the end of the string), say the move is invalid
				reverse(currentPath);
			}
		} else reverse(currentPath);
	}

	return bestSeats.size;
}

// console.log(partTwo());

function moveForward(
	currentPath: Path,
	visitedPositions: VisitedPositions,
	bestSeats: Set<string>,
) {
	const nextPosition = nextPositionForward(currentPath);

	return move(currentPath, nextPosition, visitedPositions, bestSeats, 1);
}

function moveRight(
	currentPath: Path,
	visitedPositions: VisitedPositions,
	bestSeats: Set<string>,
) {
	const nextPosition = nextPositionRight(currentPath);

	return move(currentPath, nextPosition, visitedPositions, bestSeats, 1001);
}

function moveLeft(
	currentPath: Path,
	visitedPositions: VisitedPositions,
	bestSeats: Set<string>,
) {
	const nextPosition = nextPositionLeft(currentPath);

	return move(currentPath, nextPosition, visitedPositions, bestSeats, 1001);
}

function move(
	currentPath: Path,
	nextPosition: Position,
	visitedPositions: VisitedPositions,
	bestSeats: Set<string>,
	increment: number,
) {
	if (valueAt(nextPosition) === "#") {
		return false;
	}

	if (pathIncludesCoordinate(currentPath, nextPosition)) {
		return false;
	}

	const nextPositionString = positionToString(nextPosition);
	const visitedPosition = visitedPositions[nextPositionString];

	if (
		visitedPosition?.bestSeat &&
		visitedPosition?.lowestScoreAtPosition === currentPath.score + increment
	) {
		bestSeats.add(coordinateToString(nextPosition));
		visitedPositions[nextPositionString] ||= {};
		visitedPositions[nextPositionString].bestSeat = true;

		for (const position of currentPath.log) {
			bestSeats.add(coordinateToString(position));
			visitedPositions[positionToString(position)] ||= {};
			visitedPositions[positionToString(position)].bestSeat = true;
		}

		return false;
	}

	if (lowestEndScore < currentPath.score + increment) {
		return false;
	}

	if (visitedPosition?.lowestScoreAtPosition <= currentPath.score + increment) {
		return false;
	}

	currentPath.log.push({ ...nextPosition });
	currentPath.score += increment;
	visitedPositions[nextPositionString] ||= {};
	visitedPositions[nextPositionString].lowestScoreAtPosition =
		currentPath.score;

	return true;
}

function coordinateToString(coordinate: Coordinate) {
	return `${coordinate.x}.${coordinate.y}`;
}

export { partTwo };
