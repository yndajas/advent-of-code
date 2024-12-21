const [unparsedPatterns, unparsedDesigns] = (
	await Bun.file(`${import.meta.dir}/../../../input/19`).text()
).split("\n\n");

const patterns = unparsedPatterns.split(", ");
const designs = unparsedDesigns.split("\n");

function partOne() {
	return designs.filter((design) => possible(design)).length;
}

console.log(partOne());

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

export { partOne };
