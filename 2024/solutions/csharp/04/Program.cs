using System.Text.RegularExpressions;

_04.Program program = new();
Console.WriteLine(program.PartOne());
Console.WriteLine(program.PartTwo());

namespace _04
{
    public class Program
    {
        public Program()
            : this("../../../input/04") { }

        public Program(string inputPath)
        {
            rows = File.ReadAllLines(inputPath);
            maxRowIndex = rows.Length - 1;
            maxColumnIndex = rows[0].Length - 1;
        }

        private readonly string[] rows;
        private readonly int maxRowIndex;
        private readonly int maxColumnIndex;

        public int PartOne()
        {
            string[] columns = RowsToColumns();
            string[] diagonalLines = RowsToDiagonalLines();
            string[] allLines = [.. rows, .. columns, .. diagonalLines];
            string regex = @"(?=(?:XMAS|SAMX))";

            int totalMatchCount = 0;

            foreach (string currentLine in allLines)
            {
                int currentLineMatchCount = Regex.Matches(currentLine, regex).Count;
                totalMatchCount += currentLineMatchCount;
            }

            return totalMatchCount;
        }

        public int PartTwo()
        {
            int crossedMasesCount = 0;

            for (int currentRowIndex = 1; currentRowIndex <= maxRowIndex - 1; currentRowIndex++)
            {
                for (
                    int currentColumnIndex = 1;
                    currentColumnIndex <= maxColumnIndex - 1;
                    currentColumnIndex++
                )
                {
                    char currentCharacter = rows[currentRowIndex][currentColumnIndex];

                    if (currentCharacter != 'A')
                    {
                        continue;
                    }

                    char topLeftCharacter = rows[currentRowIndex - 1][currentColumnIndex - 1];
                    char bottomRightCharacter = rows[currentRowIndex + 1][currentColumnIndex + 1];

                    if (
                        !(
                            (topLeftCharacter == 'M' && bottomRightCharacter == 'S')
                            || (topLeftCharacter == 'S' && bottomRightCharacter == 'M')
                        )
                    )
                    {
                        continue;
                    }

                    char topRightCharacter = rows[currentRowIndex - 1][currentColumnIndex + 1];
                    char bottomLeftCharacter = rows[currentRowIndex + 1][currentColumnIndex - 1];

                    if (
                        (
                            (topRightCharacter == 'M' && bottomLeftCharacter == 'S')
                            || (topRightCharacter == 'S' && bottomLeftCharacter == 'M')
                        )
                    )
                    {
                        crossedMasesCount++;
                    }
                }
            }

            return crossedMasesCount;
        }

        private string[] RowsToColumns()
        {
            List<string> columns = [];

            foreach (string currentRow in rows)
            {
                int currentColumnIndex = 0;

                while (currentColumnIndex <= maxColumnIndex)
                {
                    if (currentColumnIndex > columns.Count - 1)
                    {
                        columns.Add("");
                    }

                    char currentCharacter = currentRow[currentColumnIndex];
                    columns[currentColumnIndex] += currentCharacter;
                    currentColumnIndex++;
                }
            }

            return [.. columns];
        }

        private string[] RowsToDiagonalLines()
        {
            List<string> diagonalLines = [];

            for (
                int currentColumnIndex = 0;
                currentColumnIndex <= maxColumnIndex;
                currentColumnIndex++
            )
            {
                diagonalLines.Add(DownRightDiagonalLineFromCell(0, currentColumnIndex));
                diagonalLines.Add(DownLeftDiagonalLineFromCell(0, currentColumnIndex));
            }

            for (int currentRowIndex = 1; currentRowIndex <= maxRowIndex; currentRowIndex++)
            {
                diagonalLines.Add(DownRightDiagonalLineFromCell(currentRowIndex, 0));
                diagonalLines.Add(DownLeftDiagonalLineFromCell(currentRowIndex, maxColumnIndex));
            }

            return [.. diagonalLines];
        }

        private string DownRightDiagonalLineFromCell(int startingRowIndex, int startingColumnIndex)
        {
            int currentRowIndex = startingRowIndex;
            int currentColumnIndex = startingColumnIndex;
            string lineString = "";

            while (currentRowIndex <= maxRowIndex && currentColumnIndex <= maxColumnIndex)
            {
                lineString += rows[currentRowIndex][currentColumnIndex];
                currentRowIndex++;
                currentColumnIndex++;
            }

            return lineString;
        }

        private string DownLeftDiagonalLineFromCell(int startingRowIndex, int startingColumnIndex)
        {
            int currentRowIndex = startingRowIndex;
            int currentColumnIndex = startingColumnIndex;
            string lineString = "";

            while (currentRowIndex <= maxRowIndex && currentColumnIndex >= 0)
            {
                lineString += rows[currentRowIndex][currentColumnIndex];
                currentRowIndex++;
                currentColumnIndex--;
            }

            return lineString;
        }
    }
}
