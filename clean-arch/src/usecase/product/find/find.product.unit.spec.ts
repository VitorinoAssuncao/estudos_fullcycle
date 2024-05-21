import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product";

describe('Find Product', () => {
    const product = ProductFactory.create("a","Product 1", 10.0);

    const MockRepository =  () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(product)),
            findAll: jest.fn()
        }
    }

    it('should find a product', async () => {
        const productRepository = MockRepository();

        const usecase = new FindProductUseCase(productRepository);

        const input = {id: product.id};

        const want = {
            id: product.id,
            name: "Product 1",
            price: 10.0
        }

        const got = await usecase.execute(input);

        expect(want).toEqual(got);
    });
});