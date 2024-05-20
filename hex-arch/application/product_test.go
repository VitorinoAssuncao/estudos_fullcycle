package application

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestProduct_IsValid(t *testing.T) {

	tt := []struct {
		name    string
		product ProductEntity
		want    bool
		wantErr error
	}{
		{
			name: "Product is valid",
			product: ProductEntity{
				ID:     "123e4567-e89b-12d3-a456-426614174000",
				Status: _enabled,
				Name:   "Product 1",
				Price:  10,
			},
			want: true,
		},
		{
			name: "Return error when id is empty",
			product: ProductEntity{
				Status: _enabled,
				Name:   "Product 1",
				Price:  10,
			},
			want:    false,
			wantErr: errors.New("Key: 'ProductEntity.ID' Error:Field validation for 'ID' failed on the 'required' tag"),
		},
		{
			name: "Return error when id is not an uuid",
			product: ProductEntity{
				ID:     "123e4567e89b12d3a456426614174000",
				Status: _enabled,
				Name:   "Product 1",
				Price:  10,
			},
			want:    false,
			wantErr: errors.New("Key: 'ProductEntity.ID' Error:Field validation for 'ID' failed on the 'uuid' tag"),
		},
		{
			name: "Return error when status is empty",
			product: ProductEntity{
				ID:    "123e4567-e89b-12d3-a456-426614174000",
				Name:  "Product 1",
				Price: 10,
			},
			want:    false,
			wantErr: errors.New("Key: 'ProductEntity.Status' Error:Field validation for 'Status' failed on the 'required' tag"),
		},
		{
			name: "Return error when status is not _enabled or disabled",
			product: ProductEntity{
				ID:     "123e4567-e89b-12d3-a456-426614174000",
				Status: "invalid",
				Name:   "Product 1",
				Price:  10,
			},
			want:    false,
			wantErr: errors.New("Key: 'ProductEntity.Status' Error:Field validation for 'Status' failed on the 'oneof' tag"),
		},
		{
			name: "Return error when name is empty",
			product: ProductEntity{
				ID:     "123e4567-e89b-12d3-a456-426614174000",
				Status: _enabled,
				Price:  10,
			},
			want:    false,
			wantErr: errors.New("Key: 'ProductEntity.Name' Error:Field validation for 'Name' failed on the 'required' tag"),
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			got, err := tc.product.IsValid()

			if tc.wantErr != nil {
				require.Equal(t, tc.wantErr.Error(), err.Error())
			}

			require.Equal(t, tc.want, got)

		})
	}
}

func TestProduct_Enable(t *testing.T) {
	tt := []struct {
		name    string
		product ProductEntity
		want    string
		wantErr error
	}{
		{
			name: "Enable product successfully",
			product: ProductEntity{
				Price: 10,
			},
			want: _enabled,
		},
		{
			name: "Return error when price is zero",
			product: ProductEntity{
				Price: 0,
			},
			wantErr: errors.New("The price must be greater than zero to enable this product"),
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			err := tc.product.Enable()

			if tc.wantErr != nil {
				require.Equal(t, tc.wantErr.Error(), err.Error())
			}

			require.Equal(t, tc.want, tc.product.Status)

		})
	}
}

func TestProduct_Disable(t *testing.T) {
	tt := []struct {
		name    string
		product ProductEntity
		want    string
		wantErr error
	}{
		{
			name: "Disable product successfully",
			product: ProductEntity{
				Price: 0,
			},
			want: _disabled,
		},
		{
			name: "Return error when price greater than zero",
			product: ProductEntity{
				Price: 10,
			},
			wantErr: errors.New("The price must be zero to disable this product"),
		},
	}

	for _, tc := range tt {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()

			err := tc.product.Disable()

			if tc.wantErr != nil {
				require.Equal(t, tc.wantErr.Error(), err.Error())
			}

			require.Equal(t, tc.want, tc.product.Status)

		})
	}
}
