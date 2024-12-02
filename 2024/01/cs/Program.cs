var lines = File.ReadLines("../input");

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

Console.WriteLine(partOne());
