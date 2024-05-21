import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";

describe('Update Product', () => {
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
    



    it('should update a product', async () => {
        const productRepository = new ProductRepository();

        const product = ProductFactory.create("a", "Product 1", 100);

        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Novo Produto",
            price: 200
        
        }

        const usecase = new UpdateProductUseCase(productRepository);

        const got = await usecase.execute(input);

        expect(got.name).toEqual(input.name);
        expect(got.price).toEqual(input.price);
    })
});