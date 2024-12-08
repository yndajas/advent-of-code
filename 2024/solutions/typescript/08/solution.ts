const rows = (
	await Bun.file(`${import.meta.dir}/../../../input/08`).text()
).split("\n");
const maxX = rows[0].length - 1;
const maxY = rows.length - 1;

type Coordinate = { x: number; y: number };

function partOne() {
	const antennaLocationsByFrequency: Record<string, Coordinate[]> = {};

	rows.forEach((row, rowIndex) => {
		row.split("").forEach((frequency, columnIndex) => {
			if (frequency === ".") {
				return;
			}

			const coordinate = { x: columnIndex, y: rowIndex };

			antennaLocationsByFrequency[frequency] = (
				antennaLocationsByFrequency[frequency] || []
			).concat(coordinate);
		});
	});

	const antinodeCoordinateStrings: Set<string> = new Set();

	for (const coordinates of Object.values(antennaLocationsByFrequency)) {
		coordinates.forEach((currentCoordinate, currentCoordinateIndex) => {
			for (const laterCoordinate of coordinates.slice(
				currentCoordinateIndex + 1,
			)) {
				const diff = {
					x: laterCoordinate.x - currentCoordinate.x,
					y: laterCoordinate.y - currentCoordinate.y,
				};

				const earlierAntinodeCandidateCoordinate = earlierAntinodeCandidate(
					currentCoordinate,
					diff,
				);

				if (inBounds(earlierAntinodeCandidateCoordinate)) {
					antinodeCoordinateStrings.add(
						coordinateToString(earlierAntinodeCandidateCoordinate),
					);
				}

				const laterAntinodeCandidateCoordinate = laterAntinodeCandidate(
					laterCoordinate,
					diff,
				);

				if (inBounds(laterAntinodeCandidateCoordinate)) {
					antinodeCoordinateStrings.add(
						coordinateToString(laterAntinodeCandidateCoordinate),
					);
				}
			}
		});
	}

	return Array.from(antinodeCoordinateStrings).length;
}

console.log(partOne());

function earlierAntinodeCandidate(
	earlierCoordinate: Coordinate,
	diff: Coordinate,
) {
	return {
		x: earlierCoordinate.x - diff.x,
		y: earlierCoordinate.y - diff.y,
	};
}

function laterAntinodeCandidate(laterCoordinate: Coordinate, diff: Coordinate) {
	return {
		x: laterCoordinate.x + diff.x,
		y: laterCoordinate.y + diff.y,
	};
}

function inBounds(coordinate: Coordinate) {
	return (
		coordinate.x >= 0 &&
		coordinate.x <= maxX &&
		coordinate.y >= 0 &&
		coordinate.y <= maxY
	);
}

function coordinateToString(coordinate: Coordinate) {
	return `${coordinate.x}.${coordinate.y}`;
}

export { partOne };
