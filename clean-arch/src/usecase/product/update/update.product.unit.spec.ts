import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product";

describe('Update Product', () => {

    
    const product = ProductFactory.create("a", "Product 1", 100);

    const MockRepository = () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockImplementation(() => Promise.resolve(product)),
            findAll: jest.fn(),
        }
    }

    it('should update a product', async () => {
        const productRepository = MockRepository();

        const input = {
            id: product.id,
            name: "Novo Produto",
            price: 200
        
        }

        const usecase = new UpdateProductUseCase(productRepository);

        const got = await usecase.execute(input);

        expect(got.name).toEqual(input.name);
        expect(got.price).toEqual(input.price);
    })
});