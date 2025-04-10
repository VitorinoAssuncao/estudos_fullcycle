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
