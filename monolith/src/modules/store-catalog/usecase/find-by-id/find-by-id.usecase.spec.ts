import ID from "../../../@shared/domain/vo/id.vo";
import Product from "../../domain/product.entity";
import FindByIDUsecase from "./find-by-id.usecase";

const product = new Product({
    id: new ID('1'),
    name: 'Product 1',
    description: 'Description of product 1',
    salesPrice: 100,
});

const MockRepository = () =>{
    return {
        findByID: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    }
};

describe('FindByIdUsecase unit test', () => {
    it('should find a product by id', async () => {
        const repository = MockRepository();
        const usecase = new FindByIDUsecase(repository);

        const result = await usecase.execute('1');

        expect(repository.findByID).toHaveBeenCalled();
        expect(result.id).toEqual(product.id.value);
        expect(result.name).toEqual(product.name);
        expect(result.description).toEqual(product.description);
        expect(result.salesPrice).toEqual(product.salesPrice);
    });
    
});