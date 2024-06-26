package application

type ProductService struct {
	Persistence ProductPersistenceInterface
}

func NewProductService(persistence ProductPersistenceInterface) *ProductService {
	return &ProductService{Persistence: persistence}
}

func (s *ProductService) Get(id string) (ProductInterface, error) {
	return s.Persistence.Get(id)
}

func (s *ProductService) Create(name string, price float64) (ProductInterface, error) {
	product := NewProductEntity(name, uint(price))
	_, err := product.IsValid()
	if err != nil {
		return nil, err
	}

	err = s.Persistence.Save(product)
	if err != nil {
		return nil, err
	}

	return product, nil
}

func (s *ProductService) Enable(product ProductInterface) error {
	err := product.Enable()
	if err != nil {
		return err
	}

	return s.Persistence.Save(product)
}

func (s *ProductService) Disable(product ProductInterface) error {
	err := product.Disable()
	if err != nil {
		return err
	}

	return s.Persistence.Save(product)
}
