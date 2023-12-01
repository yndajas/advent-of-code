const partOne = async (): Promise<number> => {
  const input = await Bun.file("./2023/01/input").text();

  const lines = input.split("\n");
  const result = lines.reduce((accumulator, line) => {
    const digits = line.match(/[0-9]/g) as Array<string>;
    const number = Number(digits[0] + digits[digits.length - 1]);
    return accumulator + number;
  }, 0);

  return result;
};

console.log(await partOne());
