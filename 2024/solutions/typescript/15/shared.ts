const [unparsedMap, unparsedInstructions] = (
	await Bun.file(`${import.meta.dir}/../../../input/15`).text()
).split("\n\n");
const instructions = unparsedInstructions.replaceAll("\n", "");
const mapLines = unparsedMap.split("\n");

type CoordinateOrMovement = { x: number; y: number };
const instructionToMovement: Record<string, CoordinateOrMovement> = {
	"^": { x: 0, y: -1 },
	">": { x: 1, y: 0 },
	v: { x: 0, y: 1 },
	"<": { x: -1, y: 0 },
};
type MapArray = string[][];

function containsWall(map: MapArray, coordinate: CoordinateOrMovement) {
	return map[coordinate.y][coordinate.x] === "#";
}

function containsBox(map: MapArray, coordinate: CoordinateOrMovement) {
	return map[coordinate.y][coordinate.x] === "O";
}

function sumOfGpsCoordinates(map: MapArray) {
	let sum = 0;

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			if (["O", "["].includes(map[y][x])) sum += gpsCoordinate({ x, y });
		}
	}

	return sum;
}

function gpsCoordinate(coordinate: CoordinateOrMovement) {
	return 100 * coordinate.y + coordinate.x;
}

function printMap(map: MapArray) {
	let mapString = "";

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			mapString += map[y][x];
		}

		mapString += "\n";
	}

	console.log(mapString);
}

export type { CoordinateOrMovement, MapArray };
export {
	containsBox,
	containsWall,
	instructions,
	instructionToMovement,
	mapLines,
	printMap,
	sumOfGpsCoordinates,
};
