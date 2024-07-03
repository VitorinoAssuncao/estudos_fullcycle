import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe('StoreCatalogFacade', () => {
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

    it('should find all products', async () => {
        const facade = StoreCatalogFacadeFactory.create();

        const product = await ProductModel.create({
            name: 'Product 1',
            description: 'Description of product 1',
            salesPrice: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await facade.findAll();
        
        expect(result.products).toHaveLength(1);
        expect(result.products[0].name).toBe(product.name);
        expect(result.products[0].description).toBe(product.description);
        expect(result.products[0].salesPrice).toBe(product.salesPrice);
    });

    it('should find product by id', async () => {
        const facade = StoreCatalogFacadeFactory.create();

        const product = await ProductModel.create({
            id: "1",
            name: 'Product 1',
            description: 'Description of product 1',
            salesPrice: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await facade.findByID({ id: product.id });

        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
        expect(result.salesPrice).toBe(product.salesPrice);
    });
});