var lines = File.ReadLines("../../../input/02");

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

Console.WriteLine(partOne());
