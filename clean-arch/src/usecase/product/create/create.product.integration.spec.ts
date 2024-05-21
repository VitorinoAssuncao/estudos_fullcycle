import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product";

describe('Create Product', () => {
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

    it('should create a product', async () => {
        const productRepository = new ProductRepository();
        const input = {
            type: 'a',
            name: 'product',
            price: 10,
        };

        const usecase = new CreateProductUseCase(productRepository)

        const result =  await usecase.execute(input);

        expect(result.id).toBeDefined();
    });
});