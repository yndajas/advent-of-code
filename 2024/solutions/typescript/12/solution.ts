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
type Region = Set<CoordinateOrMovement>;

type Orientation = "up" | "right" | "down" | "left";
type PlotSide = CoordinateOrMovement & { orientation: Orientation };

function partOne() {
	const regions = getRegions();

	return regions.reduce(
		(accumulator, region) => accumulator + regionFencingPrice(region),
		0,
	);
}

function partTwo() {
	const regions = getRegions();

	return regions.reduce(
		(accumulator, region) =>
			accumulator + regionFencingPriceWithBulkDiscount(region),
		0,
	);
}

// console.log(partOne());
// console.log(partTwo());

function getRegions() {
	const regions: Region[] = [];
	const plotsRecorded = new Set<string>();

	for (let y = 0; y <= maxY; y++) {
		for (let x = 0; x <= maxX; x++) {
			const coordinate = { x, y };

			if (plotsRecorded.has(coordinateToString(coordinate))) {
				continue;
			}

			const region: Region = new Set();
			plotRegionFromCoordinate(region, plotsRecorded, coordinate);
			regions.push(region);
		}
	}

	return regions;
}

function coordinateToString(coordinate: CoordinateOrMovement) {
	return `${coordinate.x}.${coordinate.y}`;
}

function plotRegionFromCoordinate(
	region: Region,
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

function regionFencingPrice(region: Region) {
	return regionArea(region) * regionPerimeter(region);
}

function regionArea(region: Region) {
	return region.size;
}

function regionPerimeter(region: Region) {
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

function regionFencingPriceWithBulkDiscount(region: Region) {
	return regionArea(region) * regionSideCount(region);
}

function regionSideCount(region: Region) {
	const plotSidesOnPerimeter = regionPlotSidesOnPerimeter(region);
	let count = 0;

	for (const orientation of <Orientation[]>["left", "right"]) {
		for (let x = 0; x <= maxX; x++) {
			const matchingPlotSides = plotSidesOnPerimeter.filter(
				(side) => side.orientation === orientation && side.x === x,
			);

			count += contiguousGroupCount(
				matchingPlotSides.map((side) => side.y).sort((a, b) => a - b),
			);
		}
	}

	for (const orientation of <Orientation[]>["up", "down"]) {
		for (let y = 0; y <= maxY; y++) {
			const matchingPlotSides = plotSidesOnPerimeter.filter(
				(side) => side.orientation === orientation && side.y === y,
			);

			count += contiguousGroupCount(
				matchingPlotSides.map((side) => side.x).sort((a, b) => a - b),
			);
		}
	}

	return count;
}

function regionPlotSidesOnPerimeter(region: Region) {
	const regionStringSet = regionToStringSet(region);
	const sides: PlotSide[] = [];

	for (const coordinate of Array.from(region)) {
		for (const cardinalMovement of cardinalMovements) {
			const neighbourCoordinate = move(coordinate, cardinalMovement);

			if (
				!neighbourCoordinate ||
				!regionStringSet.has(coordinateToString(neighbourCoordinate))
			) {
				sides.push({
					...coordinate,
					orientation: cardinalMovementToOrientation(cardinalMovement),
				});
			}
		}
	}

	return sides;
}

function cardinalMovementToOrientation(
	cardinalMovement: CoordinateOrMovement,
): Orientation {
	if (cardinalMovement.x === 0 && cardinalMovement.y === -1) {
		return "up";
	}

	if (cardinalMovement.x === 1 && cardinalMovement.y === 0) {
		return "right";
	}

	if (cardinalMovement.x === 0 && cardinalMovement.y === 1) {
		return "down";
	}

	return "left";
}

function regionToStringSet(region: Region) {
	return new Set(
		Array.from(region).map((coordinate) => coordinateToString(coordinate)),
	);
}

function contiguousGroupCount(ascendingIntegers: number[]) {
	if (ascendingIntegers.length === 0) {
		return 0;
	}

	let groupCount = 1;
	let previous = ascendingIntegers[0];

	for (
		let numberIndex = 1;
		numberIndex < ascendingIntegers.length;
		numberIndex++
	) {
		const current = ascendingIntegers[numberIndex];

		if (current !== previous + 1) {
			groupCount++;
		}

		previous = current;
	}

	return groupCount;
}

export type { CoordinateOrMovement };
export { cardinalMovements, map, maxX, maxY, move, partOne, partTwo };
