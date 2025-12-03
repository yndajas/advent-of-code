namespace tests
{
    public class _04Tests
    {
        [Fact]
        public void TestPartOne()
        {
            Assert.Equal(2562, new _04.Program(InputPath()).PartOne());
        }

        [Fact]
        public void TestPartTwo()
        {
            Assert.Equal(1902, new _04.Program(InputPath()).PartTwo());
        }

        private string InputPath()
        {
            DotNetEnv.Env.Load("../../../../../../../.env");

            return Path.Combine(
                Environment.GetEnvironmentVariable("ASSETS_REPO"),
                "2024",
                "input",
                "04"
            );
        }
    }
}
