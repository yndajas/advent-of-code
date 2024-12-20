const rows = (
	await Bun.file(`${import.meta.dir}/../../../input/04`).text()
).split("\n");
const maxRowIndex = rows.length - 1;
const maxColumnIndex = rows[0].length - 1;

function partOne() {
	const columns = rowsToColumns(rows);
	const diagonalLines = rowsToDiagonalLines(rows);
	const allLines = [...rows, ...columns, ...diagonalLines];
	const regex = /(?=(?:XMAS|SAMX))/g;

	let totalMatchCount = 0;

	for (const currentLine of allLines) {
		const currentLineMatchCount = [...currentLine.matchAll(regex)].length;
		totalMatchCount += currentLineMatchCount;
	}

	return totalMatchCount;
}

function partTwo() {
	let crossedMasesCount = 0;

	for (
		let currentRowIndex = 1;
		currentRowIndex <= maxRowIndex - 1;
		currentRowIndex++
	) {
		for (
			let currentColumnIndex = 1;
			currentColumnIndex <= maxColumnIndex - 1;
			currentColumnIndex++
		) {
			const currentCharacter = rows[currentRowIndex][currentColumnIndex];
			if (currentCharacter !== "A") {
				continue;
			}

			const topLeftCharacter =
				rows[currentRowIndex - 1][currentColumnIndex - 1];
			const bottomRightCharacter =
				rows[currentRowIndex + 1][currentColumnIndex + 1];

			if (
				!(
					(topLeftCharacter === "M" && bottomRightCharacter === "S") ||
					(topLeftCharacter === "S" && bottomRightCharacter === "M")
				)
			) {
				continue;
			}

			const topRightCharacter =
				rows[currentRowIndex - 1][currentColumnIndex + 1];
			const bottomLeftCharacter =
				rows[currentRowIndex + 1][currentColumnIndex - 1];

			if (
				(topRightCharacter === "M" && bottomLeftCharacter === "S") ||
				(topRightCharacter === "S" && bottomLeftCharacter === "M")
			) {
				crossedMasesCount++;
			}
		}
	}

	return crossedMasesCount;
}

console.log(partOne());
console.log(partTwo());

function rowsToColumns(rows: string[]) {
	const columns: string[] = [];

	for (const currentRow of rows) {
		let currentColumnIndex = 0;

		while (currentColumnIndex <= maxColumnIndex) {
			const currentCharacter = currentRow[currentColumnIndex];
			columns[currentColumnIndex] =
				(columns[currentColumnIndex] || "") + currentCharacter;
			currentColumnIndex++;
		}
	}

	return columns;
}

function rowsToDiagonalLines(rows: string[]) {
	const diagonalLines: string[] = [];

	for (
		let currentColumnIndex = 0;
		currentColumnIndex <= maxColumnIndex;
		currentColumnIndex++
	) {
		diagonalLines.push(downRightDiagonalLineFromCell(0, currentColumnIndex));
		diagonalLines.push(downLeftDiagonalLineFromCell(0, currentColumnIndex));
	}

	for (
		let currentRowIndex = 1;
		currentRowIndex <= maxRowIndex;
		currentRowIndex++
	) {
		diagonalLines.push(downRightDiagonalLineFromCell(currentRowIndex, 0));
		diagonalLines.push(
			downLeftDiagonalLineFromCell(currentRowIndex, maxColumnIndex),
		);
	}

	return diagonalLines;
}

function downRightDiagonalLineFromCell(
	startingRowIndex: number,
	startingColumnIndex: number,
) {
	let currentRowIndex = startingRowIndex;
	let currentColumnIndex = startingColumnIndex;
	let string = "";

	while (
		currentRowIndex <= maxRowIndex &&
		currentColumnIndex <= maxColumnIndex
	) {
		string += rows[currentRowIndex][currentColumnIndex];
		currentRowIndex++;
		currentColumnIndex++;
	}

	return string;
}

function downLeftDiagonalLineFromCell(
	startingRowIndex: number,
	startingColumnIndex: number,
) {
	let currentRowIndex = startingRowIndex;
	let currentColumnIndex = startingColumnIndex;
	let string = "";

	while (currentRowIndex <= maxRowIndex && currentColumnIndex >= 0) {
		string += rows[currentRowIndex][currentColumnIndex];
		currentRowIndex++;
		currentColumnIndex--;
	}

	return string;
}

export { partOne, partTwo };
