import {
	type CoordinateOrMovement,
	type MapArray,
	containsWall,
	instructionToMovement,
	instructions,
	mapLines,
	sumOfGpsCoordinates,
} from "./shared";

const scaledValue = {
	"#": "##",
	".": "..",
	O: "[]",
	"@": "@.",
};

function partTwo() {
	const { map, robotCoordinate } = parseMap();

	for (const instruction of instructions) {
		if (canMove(map, robotCoordinate, instructionToMovement[instruction])) {
			move(map, robotCoordinate, instructionToMovement[instruction]);
		}
	}

	return sumOfGpsCoordinates(map);
}

console.log(partTwo());

function parseMap(): {
	map: MapArray;
	robotCoordinate: CoordinateOrMovement;
} {
	const map: string[][] = [];
	let robotCoordinate: CoordinateOrMovement;

	for (let y = 0; y < mapLines.length; y++) {
		map[y] = [];

		for (let x = 0; x < mapLines[0].length; x++) {
			const value = mapLines[y][x];
			const transformedValues = scaledValue[value];

			map[y][x * 2] = transformedValues[0];
			map[y][x * 2 + 1] = transformedValues[1];
			if (value === "@") {
				robotCoordinate = { x: x * 2, y };
			}
		}
	}

	return { map, robotCoordinate };
}

function canMove(
	map: MapArray,
	fromCoordinate: CoordinateOrMovement,
	movement: CoordinateOrMovement,
) {
	if (movement.x === -1) {
		return canMoveLeft(map, fromCoordinate);
	}

	if (movement.x === 1) {
		return canMoveRight(map, fromCoordinate);
	}

	const toCoordinate: CoordinateOrMovement = {
		x: fromCoordinate.x + movement.x,
		y: fromCoordinate.y + movement.y,
	};

	if (containsSpace(map, toCoordinate)) return true;
	if (containsWall(map, toCoordinate)) return false;

	if (containsBoxLeft(map, toCoordinate)) {
		return (
			canMove(map, toCoordinate, movement) &&
			canMove(map, { ...toCoordinate, x: toCoordinate.x + 1 }, movement)
		);
	}

	if (containsBoxRight(map, toCoordinate)) {
		return (
			canMove(map, toCoordinate, movement) &&
			canMove(map, { ...toCoordinate, x: toCoordinate.x - 1 }, movement)
		);
	}
}

function canMoveLeft(map: MapArray, fromCoordinate: CoordinateOrMovement) {
	const nextCoordinate = { x: fromCoordinate.x - 1, y: fromCoordinate.y };

	if (containsSpace(map, nextCoordinate)) return true;
	if (containsWall(map, nextCoordinate)) return false;

	return canMoveLeft(map, nextCoordinate);
}

function canMoveRight(map: MapArray, fromCoordinate: CoordinateOrMovement) {
	const nextCoordinate = { x: fromCoordinate.x + 1, y: fromCoordinate.y };

	if (containsSpace(map, nextCoordinate)) return true;
	if (containsWall(map, nextCoordinate)) return false;

	return canMoveRight(map, nextCoordinate);
}

function containsSpace(map: MapArray, coordinate: CoordinateOrMovement) {
	return map[coordinate.y][coordinate.x] === ".";
}

function containsBoxLeft(map: MapArray, coordinate: CoordinateOrMovement) {
	return map[coordinate.y][coordinate.x] === "[";
}

function containsBoxRight(map: MapArray, coordinate: CoordinateOrMovement) {
	return map[coordinate.y][coordinate.x] === "]";
}

function move(
	map: MapArray,
	fromCoordinate: CoordinateOrMovement,
	movement: CoordinateOrMovement,
) {
	const value = map[fromCoordinate.y][fromCoordinate.x];
	const toCoordinate: CoordinateOrMovement = {
		x: fromCoordinate.x + movement.x,
		y: fromCoordinate.y + movement.y,
	};

	if (movement.x === -1) {
		moveLeft(map, fromCoordinate);
		return;
	}

	if (movement.x === 1) {
		moveRight(map, fromCoordinate);
		return;
	}

	if (containsBoxLeft(map, toCoordinate)) {
		move(map, toCoordinate, movement);
		move(map, { x: toCoordinate.x + 1, y: toCoordinate.y }, movement);
	}

	if (containsBoxRight(map, toCoordinate)) {
		move(map, toCoordinate, movement);
		move(map, { x: toCoordinate.x - 1, y: toCoordinate.y }, movement);
	}

	map[toCoordinate.y][toCoordinate.x] = value;
	map[fromCoordinate.y][fromCoordinate.x] = ".";

	if (value === "@") {
		fromCoordinate.x = toCoordinate.x;
		fromCoordinate.y = toCoordinate.y;
	}
}

function moveLeft(map: MapArray, fromCoordinate: CoordinateOrMovement) {
	const toCoordinate: CoordinateOrMovement = {
		...fromCoordinate,
		x: fromCoordinate.x - 1,
	};

	if (!containsSpace(map, toCoordinate)) {
		moveLeft(map, toCoordinate);
	}

	const value = map[fromCoordinate.y][fromCoordinate.x];

	map[toCoordinate.y][toCoordinate.x] = map[fromCoordinate.y][fromCoordinate.x];
	map[fromCoordinate.y][fromCoordinate.x] = ".";

	if (value === "@") {
		fromCoordinate.x = toCoordinate.x;
		fromCoordinate.y = toCoordinate.y;
	}
}

function moveRight(map: MapArray, fromCoordinate: CoordinateOrMovement) {
	const toCoordinate: CoordinateOrMovement = {
		...fromCoordinate,
		x: fromCoordinate.x + 1,
	};

	if (!containsSpace(map, toCoordinate)) {
		moveRight(map, toCoordinate);
	}

	const value = map[fromCoordinate.y][fromCoordinate.x];

	map[toCoordinate.y][toCoordinate.x] = map[fromCoordinate.y][fromCoordinate.x];
	map[fromCoordinate.y][fromCoordinate.x] = ".";

	if (value === "@") {
		fromCoordinate.x = toCoordinate.x;
		fromCoordinate.y = toCoordinate.y;
	}
}

export { partTwo };
