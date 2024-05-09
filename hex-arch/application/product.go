package application

import (
	"errors"

	go_validator "github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type ProductInterface interface {
	IsValid() (bool, error)
	Enable() error
	Disable() error
	GetID() string
	GetName() string
	GetStatus() string
	GetPrice() uint
}

type ProductServiceInterface interface {
	Get(id string) (ProductInterface, error)
	Create(name string, price uint) (ProductInterface, error)
	Enable(product ProductInterface) error
	Disable(product ProductInterface) error
}

type ProductReader interface {
	Get(id string) (ProductInterface, error)
}

type ProductWriter interface {
	Save(product ProductInterface) error
}

type ProductPersistenceInterface interface {
	ProductReader
	ProductWriter
}

const (
	_disabled = "disabled"
	_enabled  = "enabled"
)

type ProductEntity struct {
	ID     string `validate:"required,uuid"`
	Name   string `validate:"required"`
	Status string `validate:"required,oneof=enabled disabled"`
	Price  uint   `validate:"required"`
}

func NewProductEntity(name string, price uint) *ProductEntity {
	return &ProductEntity{
		ID:     uuid.New().String(),
		Name:   name,
		Status: _disabled,
		Price:  price,
	}
}

func (p *ProductEntity) IsValid() (bool, error) {
	validator := go_validator.New(go_validator.WithRequiredStructEnabled())

	err := validator.Struct(p)
	if err != nil {
		return false, err
	}

	return true, nil
}

func (p *ProductEntity) Enable() error {
	if p.Price <= 0 {
		return errors.New("The price must be greater than zero to enable this product")
	}

	p.Status = _enabled

	return nil
}

func (p *ProductEntity) Disable() error {
	if p.Price > 0 {
		return errors.New("The price must be zero to disable this product")
	}

	p.Status = _disabled
	return nil
}

func (p *ProductEntity) GetID() string {
	return p.ID
}

func (p *ProductEntity) GetName() string {
	return p.Name
}

func (p *ProductEntity) GetStatus() string {
	return p.Status
}

func (p *ProductEntity) GetPrice() uint {
	return p.Price
}
