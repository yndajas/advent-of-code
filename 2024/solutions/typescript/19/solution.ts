const [unparsedPatterns, unparsedDesigns] = (
	await Bun.file(`${import.meta.dir}/../../../input/19`).text()
).split("\n\n");

const patterns = unparsedPatterns.split(", ");
const designs = unparsedDesigns.split("\n");

function partOne() {
	return designs.filter((design) => possible(design)).length;
}

function partTwo() {
	return designs.reduce(
		(accumulator, design) => accumulator + validCombinationCount(design),
		0,
	);
}

console.log(partOne());
console.log(partTwo());

function possible(design: string, impossibleDesigns: Set<string> = new Set()) {
	if (impossibleDesigns.has(design)) return false;

	for (const pattern of patterns) {
		if (design.startsWith(pattern)) {
			if (design.length === pattern.length) return true;
			if (possible(design.slice(pattern.length), impossibleDesigns))
				return true;
		}
	}

	impossibleDesigns.add(design);

	return false;
}

function validCombinationCount(
	design: string,
	combinationCountByDesign: Record<string, number> = {},
): number {
	if (combinationCountByDesign[design] !== undefined)
		return combinationCountByDesign[design];

	return patterns.reduce((accumulator, pattern) => {
		if (design.startsWith(pattern)) {
			if (design.length === pattern.length) {
				combinationCountByDesign[design] = accumulator + 1;
			} else {
				combinationCountByDesign[design] =
					accumulator +
					validCombinationCount(
						design.slice(pattern.length),
						combinationCountByDesign,
					);
			}

			return combinationCountByDesign[design];
		}

		return accumulator;
	}, 0);
}

export { partOne, partTwo };
