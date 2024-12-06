package utils

func Map[T, U any](originalArray []T, transformFunction func(T) U) []U {
	result := make([]U, len(originalArray))
	for index, element := range originalArray {
		result[index] = transformFunction(element)
	}
	return result
}
