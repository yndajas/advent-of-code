package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"utils"
)

func main() {
	text, err := os.ReadFile("../../../input/02")
	if err != nil {
		fmt.Println("Error reading input file")
	}
	lines := strings.Split(string(text), "\n")

	fmt.Println(partOne(lines))
}

func partOne(lines []string) int {
	safeReportCount := 0

	for _, report := range lines {
		levelsArray := utils.Map(strings.Split(report, " "), func(level string) int {
			int, err := strconv.Atoi(level)
			if err != nil {
				fmt.Printf("Error converting %s to integer", level)
			}
			return int
		})

		if unsafeJumpIndex(levelsArray) == nil {
			safeReportCount += 1
		}
	}

	return safeReportCount
}

func unsafeJumpIndex(levels []int) any {
	increasing := levels[0] < levels[1]

	for currentLevelIndex := range levels {
		if currentLevelIndex == 0 {
			continue
		}

		currentLevel := levels[currentLevelIndex]
		previousLevel := levels[currentLevelIndex-1]
		var progress int

		if increasing {
			progress = currentLevel - previousLevel
		} else {
			progress = previousLevel - currentLevel
		}

		if progress < 1 || progress > 3 {
			return currentLevelIndex
		}
	}

	return nil
}
