const lines = (
	await Bun.file(`${import.meta.dir}/../../../input/02`).text()
).split("\n");

function partOne() {
	let wrappingPaperRequiredSqFt = 0;

	for (const line of lines) {
		const [length, width, height] = dimensionsFromLine(line);
		const areasAscending = [
			length * width,
			length * height,
			width * height,
		].sort(ascendingSortCalllback);

		wrappingPaperRequiredSqFt +=
			areasAscending[0] * 3 + areasAscending[1] * 2 + areasAscending[2] * 2;
	}

	return wrappingPaperRequiredSqFt;
}

function partTwo() {
	let ribbonRequiredFt = 0;

	for (const line of lines) {
		const dimensions = dimensionsFromLine(line);
		ribbonRequiredFt += smallestPerimeter(dimensions);
		ribbonRequiredFt += volumeCubicFt(dimensions);
	}

	return ribbonRequiredFt;
}

console.log(partOne());
console.log(partTwo());

function ascendingSortCalllback(a: number, b: number) {
	return a - b;
}

function dimensionsFromLine(line: string) {
	return line
		.split("x")
		.map((dimensionString) => Number.parseInt(dimensionString, 10));
}

function smallestPerimeter(dimensions: number[]) {
	return dimensions
		.sort(ascendingSortCalllback)
		.slice(0, 2)
		.reduce((accumulator, dimension) => accumulator + dimension * 2, 0);
}

function volumeCubicFt(dimensions: number[]) {
	return dimensions.reduce(
		(accumulator, dimension) => accumulator * dimension,
		1,
	);
}

export { partOne, partTwo };
