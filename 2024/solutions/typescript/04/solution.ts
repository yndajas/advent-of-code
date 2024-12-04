const lines = (
	await Bun.file(`${import.meta.dir}/../../../input/04`).text()
).split("\n");
const maxRowIndex = lines.length - 1;
const maxColumnIndex = lines[0].length - 1;

function partOne() {
	const rows = lines;
	const columns = rowsToColumns(lines);
	const diagonalLines = rowsToDiagonalLines(lines);
	const allLines = [...rows, ...columns, ...diagonalLines];
	const regex = /(?=(?:XMAS|SAMX))/g;

	let totalMatchCount = 0;

	for (const currentLine of allLines) {
		const currentLineMatchCount = [...currentLine.matchAll(regex)].length;
		totalMatchCount += currentLineMatchCount;
	}

	return totalMatchCount;
}

console.log(partOne());

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
		string += lines[currentRowIndex][currentColumnIndex];
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
		string += lines[currentRowIndex][currentColumnIndex];
		currentRowIndex++;
		currentColumnIndex--;
	}

	return string;
}

export { partOne };
