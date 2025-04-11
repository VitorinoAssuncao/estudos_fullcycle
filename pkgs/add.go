package pkgs

import "fmt"

func Hello(name string) string {
	return fmt.Sprintf("Hello %s", name)
}

func Add(a, b int) int {
	return a + b
}

func Sub(a, b int) int {
	return a - b
}
