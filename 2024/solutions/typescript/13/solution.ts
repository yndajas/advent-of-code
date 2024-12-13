const input = await Bun.file(`${import.meta.dir}/../../../input/13`).text();

type CoordinateOrMovement = { x: number; y: number };
type Button = CoordinateOrMovement & { cost: number };

function partOne() {
	const machines = parseMachines();
	return machines.reduce(
		(accumulator, machine) => accumulator + machine.cheapestOption(),
		0,
	);
}

console.log(partOne());

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

	cheapestOption() {
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

				if (current.x > this.target.x || current.y > this.target.y) {
					break;
				}

				bCount++;
			}

			if (cost > 0) break;

			aCount++;
		}

		return cost;
	}
}

export { partOne };
