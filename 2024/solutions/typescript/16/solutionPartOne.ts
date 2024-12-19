import type { Path, Position } from "./shared";
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

export { partOne };
