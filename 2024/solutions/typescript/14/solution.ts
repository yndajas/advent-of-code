const lines = (
	await Bun.file(`${process.env.ASSETS_REPO}/2024/input/14`).text()
).split("\n");

type CoordinateOrMovement = { x: number; y: number };
type Robot = {
	coordinate: CoordinateOrMovement;
	movementPerSecond: CoordinateOrMovement;
};
type Space = { width: number; height: number };

function partOne(space: Space) {
	let robots = linesToRobots();

	robots = moveRobots(robots, space, 100);

	return robotCountPerQuadrant(robots, space).reduce(
		(accumulator, quadrantRobotCount) => accumulator * quadrantRobotCount,
		1,
	);
}

function partTwoLookForLackOfOverlaps(space: Space) {
	let robots = linesToRobots();
	let seconds = 0;

	while (hasOverlaps(robots)) {
		robots = moveRobots(robots, space, 1);
		seconds++;
	}

	return seconds;
}

function partTwoFindLine(space: Space) {
	let robots = linesToRobots();
	let seconds = 0;

	while (!hasLineOfRobots(robots, space)) {
		robots = moveRobots(robots, space, 1);
		seconds++;
	}

	return seconds;
}

function partTwoFindLineButWithBiggerIncrements(space: Space) {
	let robots = linesToRobots();
	const maxRobotsInASingleLineEachSecond: number[] = [];

	for (let seconds = 0; seconds <= space.width * space.height; seconds++) {
		robots = moveRobots(robots, space, 1);
		maxRobotsInASingleLineEachSecond.push(
			maxRobotsInASingleLine(robots, space),
		);
	}

	const indexOfSecondWithMaxRobotsOnASingleLine =
		maxRobotsInASingleLineEachSecond.indexOf(
			Math.max(...maxRobotsInASingleLineEachSecond),
		);

	robots = linesToRobots();
	robots = moveRobots(robots, space, indexOfSecondWithMaxRobotsOnASingleLine);
	let seconds = indexOfSecondWithMaxRobotsOnASingleLine;

	while (!hasLineOfRobots(robots, space)) {
		robots = moveRobots(robots, space, indexOfSecondWithMaxRobotsOnASingleLine);
		seconds += indexOfSecondWithMaxRobotsOnASingleLine;
	}

	return seconds;
}

// console.log("part one example data:", partOne({ width: 11, height: 7 }));
// console.log(partOne({ width: 101, height: 103 }));
// console.log(partTwoLookForLackOfOverlaps({ width: 101, height: 103 }));
// console.log(partTwoFindLine({ width: 101, height: 103 }));
// console.log(
// 	partTwoFindLineButWithBiggerIncrements({ width: 101, height: 103 }),
// );

function linesToRobots(): Robot[] {
	return lines.map((line) => {
		const [startX, startY, moveX, moveY] = line
			.match(/-?\d+/g)
			.map((integerString) => Number.parseInt(integerString, 10));

		return {
			coordinate: { x: startX, y: startY },
			movementPerSecond: { x: moveX, y: moveY },
		};
	});
}

function robotCountPerQuadrant(robots: Robot[], space: Space): number[] {
	const quadrantCounts = [0, 0, 0, 0];
	const midPoint = getMidPoint(space);

	for (const robot of robots) {
		if (
			robot.coordinate.x === midPoint.x ||
			robot.coordinate.y === midPoint.y
		) {
			continue;
		}

		if (robot.coordinate.x < midPoint.x) {
			robot.coordinate.y < midPoint.y
				? quadrantCounts[0]++
				: quadrantCounts[1]++;
		} else {
			robot.coordinate.y < midPoint.y
				? quadrantCounts[2]++
				: quadrantCounts[3]++;
		}
	}

	return quadrantCounts;
}

function getMidPoint(space: Space): CoordinateOrMovement {
	return { x: (space.width - 1) / 2, y: (space.height - 1) / 2 };
}

function moveRobots(robots: Robot[], space: Space, seconds: number): Robot[] {
	return robots.map((robot) => {
		const newCoordinate = {
			x:
				(robot.coordinate.x + robot.movementPerSecond.x * seconds) %
				space.width,
			y:
				(robot.coordinate.y + robot.movementPerSecond.y * seconds) %
				space.height,
		};

		if (newCoordinate.x < 0) {
			newCoordinate.x = space.width + newCoordinate.x;
		}

		if (newCoordinate.y < 0) {
			newCoordinate.y = space.height + newCoordinate.y;
		}

		return { ...robot, coordinate: newCoordinate };
	});
}

function hasOverlaps(robots: Robot[]) {
	const robotCoordinates: Set<string> = new Set();

	return robots.some((robot) => {
		const coordinateString = coordinateToString(robot.coordinate);

		if (robotCoordinates.has(coordinateString)) return true;

		robotCoordinates.add(coordinateString);

		return false;
	});
}

function coordinateToString(coordinate: CoordinateOrMovement) {
	return `${coordinate.x}.${coordinate.y}`;
}

function hasLineOfRobots(robots: Robot[], space: Space, minimumLength = 8) {
	const coordinatesWithRobots: Set<string> = new Set();

	for (const robot of robots) {
		coordinatesWithRobots.add(coordinateToString(robot.coordinate));
	}

	let run = 0;

	for (let y = 0; y < space.height; y++) {
		for (let x = 0; x < space.width; x++) {
			if (coordinatesWithRobots.has(coordinateToString({ x, y }))) {
				run++;
			} else {
				run = 0;
			}

			if (run === minimumLength) {
				return true;
			}
		}

		run = 0;
	}

	return false;
}

function maxRobotsInASingleLine(robots: Robot[], space: Space) {
	const robotsPerX = new Array(space.width);
	robotsPerX.fill(0);
	const robotsPerY = new Array(space.height);
	robotsPerY.fill(0);

	for (const robot of robots) {
		robotsPerX[robot.coordinate.x]++;
		robotsPerY[robot.coordinate.y]++;
	}

	return Math.max(Math.max(...robotsPerX), Math.max(...robotsPerY));
}

function printRobots(robots: Robot[], space) {
	const robotCountByCoordinate: Record<string, number> = {};

	for (const robot of robots) {
		robotCountByCoordinate[coordinateToString(robot.coordinate)] =
			(robotCountByCoordinate[coordinateToString(robot.coordinate)] || 0) + 1;
	}

	let map = "";

	for (let y = 0; y < space.height; y++) {
		for (let x = 0; x < space.width; x++) {
			map += robotCountByCoordinate[coordinateToString({ x, y })] || ".";
		}

		map += "\n";
	}

	console.log(map);
}

export {
	partOne,
	partTwoLookForLackOfOverlaps,
	partTwoFindLine,
	partTwoFindLineButWithBiggerIncrements,
};
