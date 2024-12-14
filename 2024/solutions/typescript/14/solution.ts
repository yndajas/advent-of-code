const lines = (
	await Bun.file(`${import.meta.dir}/../../../input/14`).text()
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

// example input
console.log("part one example data:", partOne({ width: 11, height: 7 }));
// actual input
console.log("part one actual data:", partOne({ width: 101, height: 103 }));

export { partOne };
