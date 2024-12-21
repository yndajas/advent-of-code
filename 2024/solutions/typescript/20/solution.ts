const map = (
	await Bun.file(`${import.meta.dir}/../../../input/20`).text()
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

const cheatMovements: CoordinateOrMovement[] = normalMovements.map(
	(movement) => ({ x: movement.x * 2, y: movement.y * 2 }),
);

function partOne(targetSaving = 100) {
	const [route, coordinateRouteIndex] = parseRoute();

	return cheatCountWithNSaving(route, coordinateRouteIndex, targetSaving);
}

console.log(partOne());
// console.log(partOne(64));

function parseRoute(): [Route, CoordinateRouteIndex] {
	const route: Route = [];
	const coordinateRouteIndex: CoordinateRouteIndex = {};

	for (let y = 0; y < map.length; y++) {
		const startX = map[y].indexOf("S");

		if (startX !== -1) {
			const startCoordinate = { x: startX, y };
			route.push(startCoordinate);
			coordinateRouteIndex[coordinateToString(startCoordinate)] =
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
					coordinateRouteIndex[coordinateToString(candidateCoordinate)] =
						route.length - 1;

					break;
				case "E":
					route.push(candidateCoordinate);
					coordinateRouteIndex[coordinateToString(candidateCoordinate)] =
						route.length - 1;
					routeComplete = true;
					break;
			}
		}
	}

	return [route, coordinateRouteIndex];
}

function coordinateToString({ x, y }: CoordinateOrMovement) {
	return `${x},${y}`;
}

function cheatCountWithNSaving(
	route: Route,
	coordinateRouteIndex: CoordinateRouteIndex,
	saving: number,
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
				coordinateRouteIndex[coordinateToString(candidateCoordinate)] -
					routeIndex -
					2 >=
				saving
			) {
				count++;
			}
		}
	}

	return count;
}

export { partOne };
