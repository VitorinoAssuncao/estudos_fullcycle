import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import ProductADMFacade from "./product-adm.facade";

describe('ProductAdmFacade unit test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('should add a product', async () => {
        const productRepository = new ProductRepository();
        const addProductUsecase = new AddProductUsecase(productRepository);

        const facade = new ProductADMFacade({
            addUseCase: addProductUsecase,
            checkStockUseCase: undefined
        })

        await facade.addProduct({
            id: '1',
            name: 'Product 1',
            description: 'Description of product 1',
            purchasePrice: 100,
            stock: 10,
        });

        const result = await productRepository.findByID('1');

        expect(result.name).toEqual('Product 1');
        expect(result.description).toEqual('Description of product 1');
        expect(result.purchasePrice).toEqual(100);
        expect(result.stock).toEqual(10);
    });
});