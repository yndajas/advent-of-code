const input = await Bun.file(`${import.meta.dir}/../../../input/13`).text();

type CoordinateOrMovement = { x: number; y: number };
type Button = CoordinateOrMovement & { cost: number };

function partOne() {
	const machines = parseMachines();
	return machines.reduce(
		(accumulator, machine) => accumulator + machine.cheapestOptionPartOne(),
		0,
	);
}

function partOneWithDivision() {
	const machines = parseMachines();
	let totalCost = 0;

	for (const machine of machines) {
		totalCost += machine.cheapestOptionWithDivision();
	}

	return totalCost;
}

console.log(partOne());
console.log(partOneWithDivision());

function parseMachines() {
	return input.split("\n\n").map((machineString) => {
		const [aX, aY, bX, bY, targetX, targetY] = machineString
			.match(/\d+/g)
			.map((match) => Number.parseInt(match, 10));

		return new Machine({ aX, aY, bX, bY, targetX, targetY });
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

	cheapestOptionPartOne() {
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

	cheapestOptionWithDivision() {
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

	overTarget(current: { x: number; y: number }) {
		return current.x > this.target.x || current.y > this.target.y;
	}
}

export { partOne, partOneWithDivision };
