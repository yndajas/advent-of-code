package utils

func Any[T any](array []T, checkFunction func(T) bool) bool {
	found := false

	for index := 0; index < len(array) && !found; index++ {
		found = checkFunction(array[index])
	}

	return found
}

func Map[T, U any](originalArray []T, transformFunction func(T) U) []U {
	result := make([]U, len(originalArray))
	for index, element := range originalArray {
		result[index] = transformFunction(element)
	}
	return result
}
