import type { CoordinateOrMovement, MapArray } from "./shared";

import {
	containsBox,
	containsWall,
	instructionToMovement,
	instructions,
	mapLines,
	sumOfGpsCoordinates,
} from "./shared";

function partOne() {
	const { map, robotCoordinate } = parseMap();

	for (const instruction of instructions) {
		move(map, robotCoordinate, instructionToMovement[instruction]);
	}

	return sumOfGpsCoordinates(map);
}

console.log(partOne());

function parseMap(): { map: MapArray; robotCoordinate: CoordinateOrMovement } {
	const map: string[][] = [];
	let robotCoordinate: CoordinateOrMovement;

	for (let y = 0; y < mapLines.length; y++) {
		map[y] = [];

		for (let x = 0; x < mapLines[0].length; x++) {
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
	map: MapArray,
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

export { partOne };
