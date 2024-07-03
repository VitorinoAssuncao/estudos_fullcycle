import ID from "../../../@shared/domain/vo/id.vo";
import Product from "../../domain/product.entity";
import CheckStock from "./check-stock.usecase";

const newProduct = new Product({
    id: new ID ('1'),
    name: 'Product 1',
    description: 'Description of product 1',
    purchasePrice: 100,
    stock: 10,
})

const MockRepository = () =>{
    return {
        add: jest.fn(),
        findByID: jest.fn().mockReturnValue(Promise.resolve(newProduct)),
    }
}

describe('CheckStockUsecase unit test', () => {
    it('should check stock of a product', async () => {
        const repository = MockRepository();
        const usecase = new CheckStock(repository);
        const input = {
            id: '1',
        }
        
        const result = await usecase.execute(input);

        expect(repository.findByID).toHaveBeenCalled();
        expect(result.id).toEqual(newProduct.id.value);
        expect(result.stock).toEqual(newProduct.stock);
    });
});