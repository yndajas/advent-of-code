const input = await Bun.file(`${import.meta.dir}/../../../input/13`).text();

type CoordinateOrMovement = { x: number; y: number };
type Button = CoordinateOrMovement & { cost: number };

function partOneBruteForce() {
	const machines = parseMachines();
	return machines.reduce(
		(accumulator, machine) => accumulator + machine.cheapestOptionBruteForce(),
		0,
	);
}

function partOneWithDivision() {
	const machines = parseMachines();

	return machines.reduce(
		(accumulator, machine) =>
			accumulator + machine.cheapestOptionWithDivision(),
		0,
	);
}

function partOneWithDivideAndConquer() {
	const machines = parseMachines();
	return machines.reduce(
		(accumulator, machine) =>
			accumulator + machine.cheapestOptionWithDivideAndConquer(),
		0,
	);
}

function partTwo() {
	const machines = parseMachines(10000000000000);
	return machines.reduce(
		(accumulator, machine) =>
			accumulator + machine.cheapestOptionWithDivideAndConquer(),
		0,
	);
}

// console.log(partOneBruteForce());
// console.log(partOneWithDivision());
// console.log(partOneWithDivideAndConquer());
// console.log(partTwo());

function parseMachines(targetModifier = 0) {
	return input.split("\n\n").map((machineString) => {
		const [aX, aY, bX, bY, targetX, targetY] = machineString
			.match(/\d+/g)
			.map((match) => Number.parseInt(match, 10));

		return new Machine({
			aX,
			aY,
			bX,
			bY,
			targetX: targetX + targetModifier,
			targetY: targetY + targetModifier,
		});
	});
}

class Machine {
	a: Button;
	b: Button;
	target: CoordinateOrMovement;

	constructor({
		aX,
		aY,
		bX,
		bY,
		targetX,
		targetY,
	}: {
		aX: number;
		aY: number;
		bX: number;
		bY: number;
		targetX: number;
		targetY: number;
	}) {
		this.a = { x: aX, y: aY, cost: 3 };
		this.b = { x: bX, y: bY, cost: 1 };
		this.target = { x: targetX, y: targetY };
	}

	public cheapestOptionBruteForce() {
		let cost = 0;
		let aCount = 0;

		while (!cost && aCount <= 100) {
			const current = { x: this.a.x * aCount, y: this.a.y * aCount };
			let bCount = 0;

			while (!cost && bCount <= 100) {
				if (bCount > 0) {
					current.x += this.b.x;
					current.y += this.b.y;
				}

				if (current.x === this.target.x && current.y === this.target.y) {
					cost = aCount * this.a.cost + bCount * this.b.cost;
					break;
				}

				if (this.overTarget(current)) {
					break;
				}

				bCount++;
			}

			if (cost > 0) break;

			aCount++;
		}

		return cost;
	}

	public cheapestOptionWithDivision() {
		const maxAX = Math.floor(this.target.x / this.a.x);
		const maxAY = Math.floor(this.target.y / this.a.y);
		const maxA = Math.min(maxAX, maxAY);

		let aCount = maxA;
		let cost = 0;

		while (!cost && aCount >= 0) {
			const remainder = {
				x: this.target.x - this.a.x * aCount,
				y: this.target.y - this.a.y * aCount,
			};

			const bsNeededX = remainder.x / this.b.x;
			const bsNeededY = remainder.y / this.b.y;

			if (
				bsNeededX === bsNeededY &&
				bsNeededX % 1 === 0 &&
				bsNeededY % 1 === 0
			) {
				cost = aCount * this.a.cost + bsNeededX * this.b.cost;
			} else {
				aCount--;
			}
		}

		return cost;
	}

	public cheapestOptionWithDivideAndConquer() {
		const maxAX = Math.floor(this.target.x / this.a.x);
		const maxAY = Math.floor(this.target.y / this.a.y);
		let maxA = Math.min(maxAX, maxAY);
		let minA = 0;
		let cost = 0;

		while (!cost) {
			const aCount = this.midPoint(minA, maxA);
			const proximity = this.proximity(aCount);

			if (proximity === -1) {
				break;
			}

			if (proximity === 1) {
				const bCount = this.remainder(aCount).x / this.b.x;

				// if the proximity is 1 when the count required is not an integer, the
				// machine isn't winnable
				if (bCount % 1 !== 0) {
					break;
				}

				cost = this.a.cost * aCount + this.b.cost * bCount;
				break;
			}

			if (aCount > minA && this.proximity(aCount - 1) < proximity) {
				maxA = aCount - 1;
			} else if (aCount < maxA && this.proximity(aCount + 1) < proximity) {
				minA = aCount + 1;
			} else break;
		}

		return cost;
	}

	private midPoint(min: number, max: number) {
		return min + Math.floor((max - min) / 2);
	}

	private proximity(aCount: number) {
		const remainder = this.remainder(aCount);
		const bsNeededX = remainder.x / this.b.x;
		const bsNeededY = remainder.y / this.b.y;

		return bsNeededX > bsNeededY
			? bsNeededX / bsNeededY
			: bsNeededY / bsNeededX;
	}

	private remainder(aCount) {
		return {
			x: this.target.x - this.a.x * aCount,
			y: this.target.y - this.a.y * aCount,
		};
	}

	private overTarget(current: { x: number; y: number }) {
		return current.x > this.target.x || current.y > this.target.y;
	}
}

export {
	partOneBruteForce,
	partOneWithDivision,
	partOneWithDivideAndConquer,
	partTwo,
};
