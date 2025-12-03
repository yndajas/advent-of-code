const input = await Bun.file(`${process.env.ASSETS_REPO}/2015/input/01`).text();

function partOne() {
	const downDirectives = input.match(/\)/g).length;
	const upDirectives = input.match(/\(/g).length;

	return upDirectives - downDirectives;
}

function partTwo() {
	let floor = 0;
	let directiveIndex = 0;

	while (floor >= 0) {
		floor += input[directiveIndex] === "(" ? 1 : -1;
		directiveIndex++;
	}

	return directiveIndex;
}

console.log(partOne());
console.log(partTwo());

export { partOne, partTwo };
