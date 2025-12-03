const map = (
	await Bun.file(`${process.env.ASSETS_REPO}/2024/input/20`).text()
).split("\n");

type CoordinateOrMovement = { x: number; y: number };
type Route = CoordinateOrMovement[];
type CoordinateRouteIndex = Record<string, number>;

const normalMovements: CoordinateOrMovement[] = [
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 },
];
const [route, coordinateRouteIndex] = parseRoute();

function partOne(targetSaving = 100) {
	const cheatMovements = cheatMovementsWithinNPicoseconds(2);

	return cheatCountWithNSaving(targetSaving, cheatMovements);
}

function partTwo(targetSaving = 100) {
	const cheatMovements = cheatMovementsWithinNPicoseconds(20);

	return cheatCountWithNSaving(targetSaving, cheatMovements);
}

// console.log(partOne());
// console.log(partOne(64));
// console.log(partTwo());
// console.log(partTwo(50));

function parseRoute(): [Route, CoordinateRouteIndex] {
	const route: Route = [];
	const coordinateRouteIndex: CoordinateRouteIndex = {};

	for (let y = 0; y < map.length; y++) {
		const startX = map[y].indexOf("S");

		if (startX !== -1) {
			const startCoordinate = { x: startX, y };
			route.push(startCoordinate);
			coordinateRouteIndex[coordinateOrMovementToString(startCoordinate)] =
				route.length - 1;
			break;
		}
	}

	let routeComplete = false;

	while (!routeComplete) {
		for (const movement of normalMovements) {
			const previousCoordinate = route[route.length - 2];
			const currentCoordinate = route[route.length - 1];
			const candidateCoordinate = {
				x: currentCoordinate.x + movement.x,
				y: currentCoordinate.y + movement.y,
			};

			if (
				previousCoordinate &&
				candidateCoordinate.x === previousCoordinate.x &&
				candidateCoordinate.y === previousCoordinate.y
			)
				continue;

			switch (map[candidateCoordinate.y][candidateCoordinate.x]) {
				case ".":
					route.push(candidateCoordinate);
					coordinateRouteIndex[
						coordinateOrMovementToString(candidateCoordinate)
					] = route.length - 1;

					break;
				case "E":
					route.push(candidateCoordinate);
					coordinateRouteIndex[
						coordinateOrMovementToString(candidateCoordinate)
					] = route.length - 1;
					routeComplete = true;
					break;
			}
		}
	}

	return [route, coordinateRouteIndex];
}

function coordinateOrMovementToString({ x, y }: CoordinateOrMovement) {
	return `${x},${y}`;
}

function cheatCountWithNSaving(
	saving: number,
	cheatMovements: CoordinateOrMovement[],
) {
	let count = 0;

	for (let routeIndex = 0; routeIndex < route.length - 1; routeIndex++) {
		for (const cheatMovement of cheatMovements) {
			const currentCoordinate = route[routeIndex];
			const candidateCoordinate = {
				x: currentCoordinate.x + cheatMovement.x,
				y: currentCoordinate.y + cheatMovement.y,
			};

			if (
				coordinateRouteIndex[
					coordinateOrMovementToString(candidateCoordinate)
				] -
					routeIndex -
					Math.abs(cheatMovement.x) -
					Math.abs(cheatMovement.y) >=
				saving
			) {
				count++;
			}
		}
	}

	return count;
}

function cheatMovementsWithinNPicoseconds(picosecondLimit: number) {
	const movements: Set<string> = new Set();

	for (let picoseconds = 2; picoseconds <= picosecondLimit; picoseconds++) {
		for (let dX = 0; dX <= picoseconds; dX++) {
			for (const movement of [
				{ x: dX, y: picoseconds - dX },
				{ x: dX * -1, y: picoseconds - dX },
				{ x: dX, y: (picoseconds - dX) * -1 },
				{ x: dX * -1, y: (picoseconds - dX) * -1 },
			]) {
				movements.add(coordinateOrMovementToString(movement));
			}
		}
	}

	return Array.from(movements).map(stringToCoordinateOrMovement);
}

function stringToCoordinateOrMovement(string: string): CoordinateOrMovement {
	const [x, y] = string
		.split(",")
		.map((xOrYString) => Number.parseInt(xOrYString, 10));
	return { x, y };
}

export { partOne, partTwo };
