package main

import (
	"fmt"
	"math"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {
	text, err := os.ReadFile("../../../input/01")
	if err != nil {
		fmt.Println("Error reading input file")
	}
	lines := strings.Split(string(text), "\n")

	fmt.Println(partOne(lines))
}

func partOne(lines []string) int {
	var leftSideLocationIds = make([]int, len(lines))
	var rightSideLocationIds = make([]int, len(lines))

	for index, line := range lines {
		locationIdStrings := strings.Split(line, "   ")
		leftSideLocationId, err := strconv.Atoi(locationIdStrings[0])
		if err != nil {
			fmt.Printf("Error converting left side of line %d to integer", index)
		}
		leftSideLocationIds[index] = leftSideLocationId
		rightSideLocationId, err := strconv.Atoi(locationIdStrings[1])
		if err != nil {
			fmt.Printf("Error converting right side of line %d to integer", index)
		}
		rightSideLocationIds[index] = rightSideLocationId
	}

	slices.Sort(leftSideLocationIds)
	slices.Sort(rightSideLocationIds)

	var diffs = make([]int, len(lines))

	for index, leftSideLocationId := range leftSideLocationIds {
		rightSideLocationId := rightSideLocationIds[index]
		// will there be some loss of precision by this conversion from integers to
		// floats and then back to an integer?
		diffs[index] = int(math.Abs(float64(leftSideLocationId) - float64(rightSideLocationId)))
	}

	totalDiff := 0

	for _, diff := range diffs {
		totalDiff += diff
	}

	return totalDiff
}
