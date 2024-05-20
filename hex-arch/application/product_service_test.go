package application_test

import (
	"go-hexagonal/application"
	mock_application "go-hexagonal/application/mocks"

	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"
)

func TestProductService_Get(t *testing.T) {

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)

	persistence.EXPECT().Get(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.NewProductService(persistence)

	got, err := service.Get("1")

	require.Nil(t, err)

	require.Equal(t, product, got)
}

func TestProductService_Create(t *testing.T) {

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)

	persistence.EXPECT().Save(gomock.Any()).Return(nil).AnyTimes()

	service := application.NewProductService(persistence)

	_, err := service.Create("Product 1", 10)

	require.Nil(t, err)
}

func TestProductService_Enable(t *testing.T) {

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)

	product.EXPECT().Enable().Return(nil).AnyTimes()

	persistence.EXPECT().Save(gomock.Any()).Return(nil).AnyTimes()

	service := application.NewProductService(persistence)

	err := service.Enable(product)

	require.Nil(t, err)
}

func TestProductService_Disable(t *testing.T) {

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)

	product.EXPECT().Disable().Return(nil).AnyTimes()

	persistence.EXPECT().Save(gomock.Any()).Return(nil).AnyTimes()

	service := application.NewProductService(persistence)

	err := service.Disable(product)

	require.Nil(t, err)
}
