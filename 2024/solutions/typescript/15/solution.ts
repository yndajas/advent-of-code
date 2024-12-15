const [unparsedMap, unparsedInstructions] = (
	await Bun.file(`${import.meta.dir}/../../../input/15`).text()
).split("\n\n");
const instructions = unparsedInstructions.replaceAll("\n", "");
const mapLines = unparsedMap.split("\n");
const maxX = mapLines[0].length - 1;
const maxY = mapLines.length - 1;

type CoordinateOrMovement = { x: number; y: number };
const instructionToMovement: Record<string, CoordinateOrMovement> = {
	"^": { x: 0, y: -1 },
	">": { x: 1, y: 0 },
	v: { x: 0, y: 1 },
	"<": { x: -1, y: 0 },
};
type Map = string[][];

function partOne() {
	const { map, robotCoordinate } = parseMap();

	for (const instruction of instructions) {
		move(map, robotCoordinate, instructionToMovement[instruction]);
	}

	printMap(map);

	return sumOfGpsCoordinates(map);
}

console.log(partOne());

function parseMap(): { map: Map; robotCoordinate: CoordinateOrMovement } {
	const map: string[][] = [];
	let robotCoordinate: CoordinateOrMovement;

	for (let y = 0; y <= maxY; y++) {
		map[y] = [];

		for (let x = 0; x <= maxX; x++) {
			const value = mapLines[y][x];
			map[y][x] = value;

			if (value === "@") {
				robotCoordinate = { x, y };
			}
		}
	}

	return { map, robotCoordinate };
}

function move(
	map: Map,
	fromCoordinate: CoordinateOrMovement,
	movement: CoordinateOrMovement,
) {
	const value = map[fromCoordinate.y][fromCoordinate.x];
	const toCoordinate: CoordinateOrMovement = {
		x: fromCoordinate.x + movement.x,
		y: fromCoordinate.y + movement.y,
	};

	if (containsWall(map, toCoordinate)) return false;

	if (containsBox(map, toCoordinate) && !move(map, toCoordinate, movement)) {
		return false;
	}

	map[toCoordinate.y][toCoordinate.x] = value;
	map[fromCoordinate.y][fromCoordinate.x] = ".";

	if (value === "@") {
		fromCoordinate.x = toCoordinate.x;
		fromCoordinate.y = toCoordinate.y;
	}

	return true;
}

function containsWall(map: Map, coordinate: CoordinateOrMovement) {
	return map[coordinate.y][coordinate.x] === "#";
}

function containsBox(map: Map, coordinate: CoordinateOrMovement) {
	return map[coordinate.y][coordinate.x] === "O";
}

function sumOfGpsCoordinates(map: Map) {
	let sum = 0;

	for (let y = 0; y <= maxY; y++) {
		for (let x = 0; x <= maxX; x++) {
			if (map[y][x] === "O") sum += gpsCoordinate({ x, y });
		}
	}

	return sum;
}

function gpsCoordinate(coordinate: CoordinateOrMovement) {
	return 100 * coordinate.y + coordinate.x;
}

function printMap(map: Map) {
	let mapString = "";

	for (let y = 0; y <= maxY; y++) {
		for (let x = 0; x <= maxX; x++) {
			mapString += map[y][x];
		}

		mapString += "\n";
	}

	console.log(mapString);
}

export { partOne };
