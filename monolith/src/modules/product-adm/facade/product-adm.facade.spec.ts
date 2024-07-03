import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";

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

        const facade = ProductAdmFacadeFactory.create();

        await facade.addProduct({
            id: '1',
            name: 'Product 1',
            description: 'Description of product 1',
            purchasePrice: 100,
            stock: 10,
        });

        const result = await ProductModel.findByPk('1');

        expect(result.name).toEqual('Product 1');
        expect(result.description).toEqual('Description of product 1');
        expect(result.purchasePrice).toEqual(100);
        expect(result.stock).toEqual(10);
    });

    it('should check stock of a product', async () => {
        const facade = ProductAdmFacadeFactory.create();


        await ProductModel.create({
            id: '1',
            name: 'Product 1',
            description: 'Description of product 1',
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await facade.checkStock({ id: '1' });

        expect(result.id).toEqual('1');
        expect(result.stock).toEqual(10);
    });
});