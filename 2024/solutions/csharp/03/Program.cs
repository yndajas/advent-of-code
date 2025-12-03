using System.Text.RegularExpressions;

DotNetEnv.Env.Load("../../../../.env");

string singleLineText = File.ReadAllText(Path.Combine(
    Environment.GetEnvironmentVariable("ASSETS_REPO"),
    "2024",
    "input",
    "03"
)).Replace("\n", "");

int partOne()
{
    return multiplyAndSum(singleLineText);
}

int partTwo()
{
    return multiplyAndSum(textWithDontSectionsStripped(singleLineText));
}

Console.WriteLine(partOne());
Console.WriteLine(partTwo());

int multiplyAndSum(string text)
{
    string regex = @"mul\((\d{1,3}),(\d{1,3})\)";
    MatchCollection matches = Regex.Matches(text, regex);
    int total = 0;
    foreach (Match match in matches)
    {
        total += int.Parse(match.Groups[1].ToString()) * int.Parse(match.Groups[2].ToString());
    }
    return total;
}

string textWithDontSectionsStripped(string text)
{
    return Regex.Replace(text, @"don't\(\).*?(?:do\(\)|$)", "");
}
