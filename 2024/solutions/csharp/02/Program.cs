DotNetEnv.Env.Load("../../../../.env");

var lines = File.ReadLines(Path.Combine(
    Environment.GetEnvironmentVariable("ASSETS_REPO"),
    "2024",
    "input",
    "02"
));

int partOne()
{
    int safeReportCount = 0;

    foreach (string report in lines)
    {
        int[] levels = Array.ConvertAll(report.Split(" "), int.Parse);

        if (unsafeJumpIndex(levels) == null)
        {
            safeReportCount++;
        }
    }

    return safeReportCount;
}

int partTwo()
{
    int safeReportCount = 0;

    foreach (string report in lines)
    {
        int[] levelsArray = Array.ConvertAll(report.Split(" "), int.Parse);
        int[][] levelsArrayAndSubArrays = originalAndSubArrays(levelsArray);

        if (levelsArrayAndSubArrays.Any(array => unsafeJumpIndex(array) == null))
        {
            safeReportCount++;
        }
    }

    return safeReportCount;
}

Console.WriteLine(partOne());
Console.WriteLine(partTwo());

int? unsafeJumpIndex(int[] levels)
{
    bool increasing = levels[0] < levels[1];

    for (int currentLevelIndex = 1; currentLevelIndex < levels.Length; currentLevelIndex++)
    {
        int currentLevel = levels[currentLevelIndex];
        int previousLevel = levels[currentLevelIndex - 1];
        int progress;

        if (increasing)
        {
            progress = currentLevel - previousLevel;
        }
        else
        {
            progress = previousLevel - currentLevel;
        }

        if (progress < 1 || progress > 3)
        {
            return currentLevelIndex;
        }
    }

    return null;
}

int[][] originalAndSubArrays(int[] originalArray)
{
    int[][] arrays = [originalArray];

    for (
        int originalArrayIndex = 0;
        originalArrayIndex < originalArray.Length;
        originalArrayIndex++
    )
    {
        int[] subArray = (int[])originalArray.Clone();
        subArray = subArray
            .Where((_, subArrayIndex) => subArrayIndex != originalArrayIndex)
            .ToArray();
        arrays = [.. arrays, subArray];
    }

    return arrays;
}
