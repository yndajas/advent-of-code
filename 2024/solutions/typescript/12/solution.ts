const map = (
	await Bun.file(`${import.meta.dir}/../../../input/12`).text()
).split("\n");
const maxX = map[0].length - 1;
const maxY = map.length - 1;

const cardinalMovements: CoordinateOrMovement[] = [
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 },
];

type CoordinateOrMovement = { x: number; y: number };

function partOne() {
	const regions: Set<CoordinateOrMovement>[] = [];
	const plotsRecorded = new Set<string>();

	map.forEach((row, y) => {
		row.split("").forEach((plotPlantType, x) => {
			const coordinate = { x, y };

			if (plotsRecorded.has(coordinateToString(coordinate))) {
				return;
			}

			const region = new Set<CoordinateOrMovement>();
			plotRegionFromCoordinate(region, plotsRecorded, coordinate);
			regions.push(region);
		});
	});

	return regions.reduce(
		(accumulator, region) => accumulator + regionFencingPrice(region),
		0,
	);
}

console.log(partOne());

function coordinateToString(coordinate: CoordinateOrMovement) {
	return `${coordinate.x}.${coordinate.y}`;
}

function plotRegionFromCoordinate(
	region: Set<CoordinateOrMovement>,
	plotsRecorded: Set<string>,
	coordinate: CoordinateOrMovement,
	targetPlantType: string | undefined = undefined,
) {
	const coordinateString = coordinateToString(coordinate);

	if (plotsRecorded.has(coordinateString)) {
		return;
	}

	const plantType = map[coordinate.y][coordinate.x];

	if (targetPlantType && targetPlantType !== plantType) {
		return;
	}

	region.add(coordinate);
	plotsRecorded.add(coordinateString);

	for (const cardinalMovement of cardinalMovements) {
		const nextCoordinate = move(coordinate, cardinalMovement);

		if (nextCoordinate) {
			plotRegionFromCoordinate(
				region,
				plotsRecorded,
				nextCoordinate,
				plantType,
			);
		}
	}
}

function move(
	startingCoordinate: CoordinateOrMovement,
	movement: CoordinateOrMovement,
): CoordinateOrMovement | false {
	const candidate = {
		x: startingCoordinate.x + movement.x,
		y: startingCoordinate.y + movement.y,
	};

	return validPoint(candidate) ? candidate : false;
}

function validPoint(coordinate: CoordinateOrMovement) {
	return (
		coordinate.x >= 0 &&
		coordinate.x <= maxX &&
		coordinate.y >= 0 &&
		coordinate.y <= maxY
	);
}

function regionFencingPrice(region: Set<CoordinateOrMovement>) {
	return regionArea(region) * regionPerimeter(region);
}

function regionArea(region: Set<CoordinateOrMovement>) {
	return region.size;
}

function regionPerimeter(region: Set<CoordinateOrMovement>) {
	const regionArray = Array.from(region);
	const plantType = map[regionArray[0].y][regionArray[0].x];

	return regionArray.reduce((outerAccumulator, coordinate) => {
		return (
			outerAccumulator +
			cardinalMovements.reduce((innerAccumulator, cardinalMovement) => {
				const neighbourCoordinate = move(coordinate, cardinalMovement);

				if (!neighbourCoordinate) {
					return innerAccumulator + 1;
				}

				if (map[neighbourCoordinate.y][neighbourCoordinate.x] === plantType) {
					return innerAccumulator;
				}

				return innerAccumulator + 1;
			}, 0)
		);
	}, 0);
}

export { partOne };
