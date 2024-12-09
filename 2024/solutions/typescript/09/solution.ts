const diskMapString = await Bun.file(
	`${import.meta.dir}/../../../input/09`,
).text();

function partOne() {
	const fragmentedBlocks: number[] = [];

	for (
		let diskMapIndex = 0;
		diskMapIndex < diskMapString.length;
		diskMapIndex++
	) {
		const fileIdOrEmpty = isFile(diskMapIndex) ? fileId(diskMapIndex) : -1;
		const blockLength = Number.parseInt(diskMapString[diskMapIndex]);

		for (let blockIndex = 0; blockIndex < blockLength; blockIndex++) {
			fragmentedBlocks.push(fileIdOrEmpty);
		}
	}

	const degragmentedBlocks = defragment(fragmentedBlocks);

	return checksum(degragmentedBlocks);
}

console.log(partOne());

function isFile(diskMapIndex: number) {
	return diskMapIndex % 2 === 0;
}

function fileId(diskMapIndex: number) {
	return diskMapIndex / 2 || 0;
}

function defragment(fragmentedBlocks: number[], mimimumEmptyBlockIndex = 0) {
	const firstEmptyBlockIndex = fragmentedBlocks.indexOf(
		-1,
		mimimumEmptyBlockIndex,
	);

	if (firstEmptyBlockIndex === -1) {
		return fragmentedBlocks;
	}

	const lastBlock = fragmentedBlocks.pop();

	if (lastBlock !== -1) {
		fragmentedBlocks[firstEmptyBlockIndex] = lastBlock;
		return defragment(fragmentedBlocks, firstEmptyBlockIndex + 1);
	}

	return defragment(fragmentedBlocks, firstEmptyBlockIndex);
}

function checksum(blocks: number[]) {
	return blocks.reduce(
		(accumulator, fileId, blockIndex) => accumulator + fileId * blockIndex,
		0,
	);
}

export { partOne };
