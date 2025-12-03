const diskMapString = await Bun.file(
	`${process.env.ASSETS_REPO}/2024/input/09`,
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

type File = { id: number; length: number };
type EmptySpace = { id: -1; length: number };
type FileSystem = (File | EmptySpace)[];

function partTwo() {
	let fileSystem: FileSystem = [];

	// map file system
	for (
		let diskMapIndex = 0;
		diskMapIndex < diskMapString.length;
		diskMapIndex++
	) {
		const length = Number.parseInt(diskMapString[diskMapIndex]);

		if (isFile(diskMapIndex)) {
			fileSystem.push({ id: fileId(diskMapIndex), length });
		} else {
			if (length === 0) {
				continue;
			}

			fileSystem.push({ id: -1, length });
		}
	}

	// defragment
	for (let candidateIndex = fileSystem.length - 1; candidateIndex > 0; ) {
		const candidate = fileSystem[candidateIndex];

		if (candidate.id === -1) {
			candidateIndex--;
			continue;
		}

		const suitableIndex = fileSystem
			.slice(0, candidateIndex)
			.findIndex(
				(fileOrEmptySpace) =>
					fileOrEmptySpace.id === -1 &&
					fileOrEmptySpace.length >= candidate.length,
			);

		if (suitableIndex < 0) {
			candidateIndex--;
			continue;
		}

		const currentSpace = fileSystem[suitableIndex];

		if (currentSpace.length > candidate.length) {
			const newSpaceRight = {
				id: -1,
				length: candidate.length,
			};
			const newSpaceLeft = {
				id: -1,
				length: currentSpace.length - candidate.length,
			};

			fileSystem = [
				...fileSystem.slice(0, suitableIndex),
				candidate,
				newSpaceLeft,
				...fileSystem.slice(suitableIndex + 1, candidateIndex),
				newSpaceRight,
				...fileSystem.slice(candidateIndex + 1),
			];

			// Because some of the space was left behind, and the candidate also moved
			// left, there are now more elements of the left, so we don't decrement
			// the index here. The next candidate will be at the same index in the
			// next iteration as the current candidate this iteration

			continue;
		}

		fileSystem = [
			...fileSystem.slice(0, suitableIndex),
			candidate,
			...fileSystem.slice(suitableIndex + 1, candidateIndex),
			currentSpace,
			...fileSystem.slice(candidateIndex + 1),
		];

		candidateIndex--;
	}

	// calculate checksum
	let checksum = 0;
	let fileSystemBlockIndex = 0;

	for (const fileOrEmptySpace of fileSystem) {
		for (
			let fileOrEmptySpaceBlockIndex = 0;
			fileOrEmptySpaceBlockIndex < fileOrEmptySpace.length;
			fileOrEmptySpaceBlockIndex++
		) {
			if (fileOrEmptySpace.id > 0) {
				checksum += fileSystemBlockIndex * fileOrEmptySpace.id;
			}

			fileSystemBlockIndex++;
		}
	}

	return checksum;
}

console.log(partTwo());

export { partOne, partTwo };
