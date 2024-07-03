import AddProductUsecase from "./add-product.usecase";

const MockRepository = () =>{
    return {
        add: jest.fn(),
        findByID: jest.fn(),
    }
}

describe('AddProductUsecase unit test', () => {
    it('should add a product', async () => {
        const repository = MockRepository();
        const usecase = new AddProductUsecase(repository);
        const input = {
            id: '1',
            name: 'Product 1',
            description: 'Description of product 1',
            purchasePrice: 100,
            stock: 10,
        }
        
        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(input.name);
        expect(result.description).toEqual(input.description);
        expect(result.purchasePrice).toEqual(input.purchasePrice);
        expect(result.stock).toEqual(input.stock);
    });
});