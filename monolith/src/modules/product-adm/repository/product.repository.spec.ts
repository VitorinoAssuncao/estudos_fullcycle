import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import ProductRepository from "./product.repository";

describe('ProductRepository unit test', () => {
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
        const product = new Product({
            name: 'Product 1',
            description: 'Description of product 1',
            purchasePrice: 100,
            salesPrice: 150,
            stock: 10,
        })

        const productRepository = new ProductRepository();

        await productRepository.add(product);

        const result = await productRepository.findByID(product.id.value);

        expect(result.id.value).toEqual(product.id.value);
        expect(result.name).toEqual(product.name);
        expect(result.description).toEqual(product.description);
        expect(result.purchasePrice).toEqual(product.purchasePrice);
        expect(result.salesPrice).toEqual(product.salesPrice);
        expect(result.stock).toEqual(product.stock);
    });

    it('should find a product', async () => {
        const product = new Product({
            name: 'Product 1',
            description: 'Description of product 1',
            purchasePrice: 100,
            salesPrice: 150,
            stock: 10,
        })

        const productRepository = new ProductRepository();

        await productRepository.add(product);

        const result = await productRepository.findByID(product.id.value);

        expect(result.id.value).toEqual(product.id.value);
        expect(result.name).toEqual(product.name);
        expect(result.description).toEqual(product.description);
        expect(result.purchasePrice).toEqual(product.purchasePrice);
        expect(result.stock).toEqual(product.stock);
    });
});