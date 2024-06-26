import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe('ProductRepository', () => {
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
        await ProductModel.create({
            name: 'Product 1',
            description: 'Description of product 1',
            salesPrice: 100,
        });

        await ProductModel.create({
            name: 'Product 2',
            description: 'Description of product 2',
            salesPrice: 200,
        });

        const productRepository = new ProductRepository();

        const result = await productRepository.findAll();

        expect(result).toHaveLength(2);
        expect(result[0].name).toEqual('Product 1');
        expect(result[0].description).toEqual('Description of product 1');
        expect(result[0].salesPrice).toEqual(100);
        expect(result[1].name).toEqual('Product 2');
        expect(result[1].description).toEqual('Description of product 2');
        expect(result[1].salesPrice).toEqual(200);
    });

    it('should find one product', async () => {
        await ProductModel.create({
            id: '1',
            name: 'Product 1',
            description: 'Description of product 1',
            salesPrice: 100,
        });


        const productRepository = new ProductRepository();

        const result = await productRepository.findByID('1');

        expect(result.name).toEqual('Product 1');
        expect(result.description).toEqual('Description of product 1');
        expect(result.salesPrice).toEqual(100);        
    });
});