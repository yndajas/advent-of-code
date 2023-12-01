const getInput = async (): Promise<string> => {
  return Bun.file("./2023/01/input").text();
};

const partOne = async (): Promise<number> => {
  const input = await getInput();

  const lines = input.split("\n");
  const result = lines.reduce((accumulator, line) => {
    const digits = line.match(/[0-9]/g) as Array<string>;
    const number = Number(digits[0] + digits[digits.length - 1]);
    return accumulator + number;
  }, 0);

  return result;
};

type Digit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type DigitWord =
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine";

const isDigit = (
  digitOrDigitWord: Digit | DigitWord
): digitOrDigitWord is Digit => {
  return digitOrDigitWord.length === 1;
};

const digitOrDigitWordToDigit = (
  digitOrDigitWord: Digit | DigitWord
): Digit => {
  if (isDigit(digitOrDigitWord)) {
    return digitOrDigitWord;
  }

  const digitWordToDigit: { [key: string]: Digit } = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  return digitWordToDigit[digitOrDigitWord];
};

const partTwo = async (): Promise<number> => {
  const input = await getInput();
  const lines = input.split("\n");
  const result = lines.reduce((accumulator, line) => {
    const digitsAndDigitWords: Array<Digit | DigitWord> = [];
    const regex = /^([0-9]|one|two|three|four|five|six|seven|eight|nine)/;

    for (
      let characterIndex = 0;
      characterIndex < line.length;
      characterIndex++
    ) {
      const matchArray = line.substring(characterIndex).match(regex);

      if (matchArray) {
        digitsAndDigitWords.push(matchArray[0] as Digit | DigitWord);
      }
    }

    const number = Number(
      digitOrDigitWordToDigit(digitsAndDigitWords[0]) +
        digitOrDigitWordToDigit(
          digitsAndDigitWords[digitsAndDigitWords.length - 1]
        )
    );

    return accumulator + number;
  }, 0);

  return result;
};
