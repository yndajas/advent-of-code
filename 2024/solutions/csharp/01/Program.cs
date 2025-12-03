DotNetEnv.Env.Load("../../../../.env");

var lines = File.ReadLines(Path.Combine(
    Environment.GetEnvironmentVariable("ASSETS_REPO"),
    "2024",
    "input",
    "01"
));

int partOne()
{
    List<int> leftSideLocationIds = [];
    List<int> rightSideLocationIds = [];

    foreach (var line in lines)
    {
        int[] locationIds = Array.ConvertAll(line.Split("   "), int.Parse);
        leftSideLocationIds.Add(locationIds[0]);
        rightSideLocationIds.Add(locationIds[1]);
    }

    leftSideLocationIds.Sort();
    rightSideLocationIds.Sort();

    List<int> diffs = [];

    foreach ((int index, int leftSideLocationId) in leftSideLocationIds.Index())
    {
        int rightSideLocationId = rightSideLocationIds[index];
        diffs.Add(Math.Abs(leftSideLocationId - rightSideLocationId));
    }

    return diffs.Sum();
}

int partTwo()
{
    Dictionary<int, bool> leftSideLocationIds = [];
    List<int> rightSideLocationIds = [];

    foreach (var line in lines)
    {
        int[] locationIds = Array.ConvertAll(line.Split("   "), int.Parse);
        leftSideLocationIds.Add(locationIds[0], true);
        rightSideLocationIds.Add(locationIds[1]);
    }

    int similarityScore = 0;

    foreach (int rightSidelocationId in rightSideLocationIds)
    {
        if (leftSideLocationIds.GetValueOrDefault(rightSidelocationId))
        {
            similarityScore += rightSidelocationId;
        }
    }

    return similarityScore;
}

Console.WriteLine(partOne());
Console.WriteLine(partTwo());
