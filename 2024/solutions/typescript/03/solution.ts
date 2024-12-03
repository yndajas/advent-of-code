const text = await Bun.file(`${import.meta.dir}/../../../input/03`).text();

function partOne() {
	const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
	const matches = text.matchAll(regex);
	let total = 0;
	for (const match of matches) {
		total += Number.parseInt(match[1]) * Number.parseInt(match[2]);
	}
	return total;
}

console.log(partOne());

export { partOne };
