import ID from "../../../@shared/domain/vo/id.vo";
import FindAllUsecase from "./find-all.usecase";

const products = [
    {
        id: new ID('1'),
        name: 'Product 1',
        description: 'Description of product 1',
        salesPrice: 100,
    },
    {
        id: new ID('2'),
        name: 'Product 2',
        description: 'Description of product 2',
        salesPrice: 200,
    },
]


const MockRepository = () =>{
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
        findByID: jest.fn(),
    }
};

describe('FindAllUsecase unit test', () => {
    it('should find all products', async () => {
        const repository = MockRepository();
        const usecase = new FindAllUsecase(repository);

        const result = await usecase.execute();

        expect(repository.findAll).toHaveBeenCalled();
        expect(result[0].id).toEqual(products[0].id.value);
        expect(result[0].name).toEqual(products[0].name);
        expect(result[0].description).toEqual(products[0].description);
        expect(result[0].salesPrice).toEqual(products[0].salesPrice);
        expect(result[1].id).toEqual(products[1].id.value);
        expect(result[1].name).toEqual(products[1].name);
        expect(result[1].description).toEqual(products[1].description);
        expect(result[1].salesPrice).toEqual(products[1].salesPrice);
    });
});