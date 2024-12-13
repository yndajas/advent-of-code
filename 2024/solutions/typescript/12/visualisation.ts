import type { CoordinateOrMovement } from "./solution";
import { cardinalMovements, map, maxX, maxY, move } from "./solution";

const colourRgb: string[] = [
	"124;198;254",
	"157;247;229",
	"152;130;172",
	"159;194;204",
	"163;147;191",
	"171;218;225",
	"184;211;209",
	"192;232;249",
	"193;102;107",
	"204;213;255",
	"206;123;145",
	"210;214;141",
	"212;180;131",
	"214;107;160",
	"226;194;144",
	"228;223;218",
	"229;169;169",
	"231;187;227",
	"239;169;174",
	"241;236;206",
	"200;132;166",
	"244;228;186",
	"238;192;200",
	"72;169;166",
	"230;184;156",
	"156;175;183",
];

const resetTextFormatCode = "\x1b[0;0m";

function printRegionPlotting() {
	const plantTypeIdByCoordinate: Record<number, Record<number, number>> = {};
	const plantTypes: string[] = [];

	printTop();
	printMap(plantTypeIdByCoordinate);

	for (let y = 0; y <= maxY; y++) {
		for (let x = 0; x <= maxX; x++) {
			if (plantTypeIdByCoordinate[y]?.[x]) {
				continue;
			}

			const plantType = map[y][x];

			if (!plantTypes.includes(plantType)) {
				plantTypes.push(plantType);
			}

			printRegionFromCoordinate(
				plantTypes.indexOf(plantType) + 1,
				plantTypeIdByCoordinate,
				{ x, y },
			);
		}
	}

	console.log("\x1b[0;0m");
}

function printTop() {
	process.stdout.write("\n       ");

	for (const character of "Happy spring!".split("")) {
		process.stdout.write(
			`${colourCode({ blinking: true, bold: true })}${character}`,
		);
	}

	process.stdout.write(`${resetTextFormatCode}\n`);

	let columnHeader = "\n       ";

	if (maxX < 10) {
		for (let x = 0; x <= maxX; x++)
			columnHeader += `${colourCode({ blinking: false, bold: true })}}${x}`;
	} else {
		for (let x = 0; x < maxX; x += 5) {
			columnHeader += `${colourCode({ blinking: false, bold: true })}`;
			if (x < 10) columnHeader += `${x}    `;
			else if (x < 100) columnHeader += `${x}   `;
			else columnHeader += `${x}  `;
		}
	}

	columnHeader += "\n       ";

	for (let x = 0; x <= maxX; x++) {
		columnHeader += `${colourCode({ blinking: false, bold: true })}_`;
	}

	process.stdout.write(`${columnHeader}${resetTextFormatCode}`);
}

function colourCode({
	background,
	blinking,
	bold,
	plantType,
}: {
	background?: boolean;
	blinking?: boolean;
	bold?: boolean;
	plantType?: string;
}) {
	let code = "\x1b[";

	code += background ? "4" : "3";
	code += "8;2;";

	if (plantType) {
		code += colourRgb[plantType.charCodeAt(0) - 65];
	} else {
		code += colourRgb[Math.floor(Math.random() * 26)];
	}

	if (bold) code += ";1";
	if (blinking) code += ";5";

	code += "m";

	return code;
}

const linePrefixes: string[] = [];

function printMap(
	plantTypeIdByCoordinate: Record<number, Record<number, number>>,
	overwriteExisting = false,
) {
	if (overwriteExisting) {
		process.stdout.write(`\x1b[${map.length + 1}A`);
	}

	let mapString = "";

	for (let y = 0; y <= maxY; y++) {
		if (!linePrefixes[y]) {
			let linePrefix = "\n ";

			if (y < 100) linePrefix += " ";
			if (y < 10) linePrefix += " ";

			linePrefix += `${colourCode({ blinking: false, bold: true })}${y}  |${resetTextFormatCode}`;

			linePrefixes[y] = linePrefix;
		}

		mapString += linePrefixes[y];

		for (let x = 0; x <= maxX; x++) {
			const plantType = map[y][x];

			if (plantTypeIdByCoordinate[y]?.[x]) {
				// mapString += `${colourCode({ plantType, background: true })}${plantType}${resetTextFormatCode}`;
				mapString += `${colourCode({ plantType, background: true })} ${resetTextFormatCode}`;
			} else {
				// mapString += plantType;
				mapString += " ";
			}
		}
	}

	mapString += "\n";

	process.stdout.write(mapString);

	sleep();
}

function sleep() {
	const currentTime = new Date().getTime();

	// while (currentTime + 2 >= new Date().getTime()) {}
	while (currentTime + 10 >= new Date().getTime()) {}
}

function printRegionFromCoordinate(
	plantTypeId: number,
	plantTypeIdByCoordinate: Record<number, Record<number, number>>,
	coordinate: CoordinateOrMovement,
	targetPlantType: string | undefined = undefined,
) {
	if (plantTypeIdByCoordinate[coordinate.y]?.[coordinate.x] !== undefined) {
		return;
	}

	const plantType = map[coordinate.y][coordinate.x];

	if (targetPlantType && targetPlantType !== plantType) {
		return;
	}

	plantTypeIdByCoordinate[coordinate.y] ||= {};
	plantTypeIdByCoordinate[coordinate.y][coordinate.x] = plantTypeId;
	printMap(plantTypeIdByCoordinate, true);

	for (const cardinalMovement of cardinalMovements) {
		const nextCoordinate = move(coordinate, cardinalMovement);

		if (nextCoordinate) {
			printRegionFromCoordinate(
				plantTypeId,
				plantTypeIdByCoordinate,
				nextCoordinate,
				plantType,
			);
		}
	}
}

printRegionPlotting();
