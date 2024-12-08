using System.Text.RegularExpressions;

string[] rows = File.ReadAllLines("../../../input/04");
int maxRowIndex = rows.Length - 1;
int maxColumnIndex = rows[0].Length - 1;

int partOne()
{
    string[] columns = rowsToColumns(rows);
    string[] diagonalLines = rowsToDiagonalLines(rows);
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

int partTwo()
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

Console.WriteLine(partOne());
Console.WriteLine(partTwo());

string[] rowsToColumns(string[] rows)
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

string[] rowsToDiagonalLines(string[] rows)
{
    List<string> diagonalLines = [];

    for (int currentColumnIndex = 0; currentColumnIndex <= maxColumnIndex; currentColumnIndex++)
    {
        diagonalLines.Add(downRightDiagonalLineFromCell(0, currentColumnIndex));
        diagonalLines.Add(downLeftDiagonalLineFromCell(0, currentColumnIndex));
    }

    for (int currentRowIndex = 1; currentRowIndex <= maxRowIndex; currentRowIndex++)
    {
        diagonalLines.Add(downRightDiagonalLineFromCell(currentRowIndex, 0));
        diagonalLines.Add(downLeftDiagonalLineFromCell(currentRowIndex, maxColumnIndex));
    }

    return [.. diagonalLines];
}

string downRightDiagonalLineFromCell(int startingRowIndex, int startingColumnIndex)
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

string downLeftDiagonalLineFromCell(int startingRowIndex, int startingColumnIndex)
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
