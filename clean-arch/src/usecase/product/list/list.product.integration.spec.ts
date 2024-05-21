import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product";

describe('List Product', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
      sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });



    it('should list all products', async () => {
        const product1 = ProductFactory.create("a","Product 1", 10.0);
        const product2 = ProductFactory.create("a","Product 2", 20.0);

        const productRepository = new ProductRepository();

        await productRepository.create(product1);
        await productRepository.create(product2);

        const usecase = new ListProductUseCase(productRepository);

        const got = await usecase.execute({});

        expect(got.products.length).toEqual(2);
        expect(got.products[0].name).toEqual(product1.name);
        expect(got.products[1].name).toEqual(product2.name);
    })
});