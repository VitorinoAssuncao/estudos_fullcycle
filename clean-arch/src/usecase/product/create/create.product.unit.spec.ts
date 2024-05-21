import CreateProductUseCase from "./create.product"

const input = {
    type:"a",
    name:"Produto 1",
    price: 100
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    }
}

describe('Create Product', () => {
    it('should create a product', async () => {
        const productRepository = MockRepository();

        const usecase = new CreateProductUseCase(productRepository);

        const got = await usecase.execute(input);

        expect(got.id).toBeDefined();
    })

})