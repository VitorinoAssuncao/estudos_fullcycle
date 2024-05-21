import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";

describe('Find Product', () => {

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

    it('should find a product', async () => {
        const productRepository = new ProductRepository();

        const product = ProductFactory.create("a","Product 1", 10.0);

        await productRepository.create(product);

        const usecase = new FindProductUseCase(productRepository);

        const input = {id: product.id};

        const want = {
            id: product.id,
            name: "Product 1",
            price: 10.0
        }

        const got = await usecase.execute(input);

        expect(want).toEqual(got);
    });
});