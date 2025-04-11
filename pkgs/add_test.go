package pkgs

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestHello(t *testing.T) {
	t.Parallel()

	tt := []struct {
		name  string
		input string
		want  string
	}{
		{name: "should return Hello Vitorino", input: "Vitorino", want: "Hello Vitorino"},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			assert.Equal(t, tc.want, Hello(tc.input))
		})
	}
}

func TestAdd(t *testing.T) {
	t.Parallel()

	tt := []struct {
		name   string
		input  int
		input2 int
		want   int
	}{
		{name: "should return Hello Vitorino", input: 1, input2: 2, want: 3},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			assert.Equal(t, tc.want, Add(tc.input, tc.input2))
		})
	}
}
