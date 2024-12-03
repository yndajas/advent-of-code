const singleLineText = (
	await Bun.file(`${import.meta.dir}/../../../input/03`).text()
).replaceAll("\n", "");

function partOne() {
	return multiplyAndSum(singleLineText);
}

function partTwo() {
	return multiplyAndSum(textWithDontSectionsStripped(singleLineText));
}

function multiplyAndSum(text: string) {
	const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
	const matches = text.matchAll(regex);
	let total = 0;
	for (const match of matches) {
		total += Number.parseInt(match[1]) * Number.parseInt(match[2]);
	}
	return total;
}

function textWithDontSectionsStripped(text: string) {
	return text.replaceAll(/don't\(\).*?(?:do\(\)|$)/g, "");
}

console.log(partOne());
console.log(partTwo());

export { partOne, partTwo };
