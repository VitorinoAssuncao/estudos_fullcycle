import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product";

describe('List Product', () => {
    const product1 = ProductFactory.create("a","Product 1", 10.0);
    const product2 = ProductFactory.create("a","Product 2", 20.0);

    const MockRepository =  () => {
        return {
            create: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([product1,product2]))
        }
    }

    it('should list all products', async () => {
        const productRepository = MockRepository();

        const usecase = new ListProductUseCase(productRepository);

        const got = await usecase.execute({});

        expect(got.products.length).toEqual(2);
        expect(got.products[0].name).toEqual(product1.name);
        expect(got.products[1].name).toEqual(product2.name);
    })
});