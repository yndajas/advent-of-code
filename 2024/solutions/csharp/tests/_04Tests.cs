namespace tests
{
    public class _04Tests
    {
        [Fact]
        public void TestPartOne()
        {
            Assert.Equal(2562, new _04.Program("../../../../../../input/04").PartOne());
        }

        [Fact]
        public void TestPartTwo()
        {
            Assert.Equal(1902, new _04.Program("../../../../../../input/04").PartTwo());
        }
    }
}
