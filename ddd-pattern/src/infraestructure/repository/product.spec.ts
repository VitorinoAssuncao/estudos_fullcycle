import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product";
import Product from "../../domain/product/entity/product";
import ProductRepository from "./product";

describe("Product Repository test", () => {
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
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should create a product", async () => {
      const productRepository = new ProductRepository();
      const product = new Product("1", "Product 1", 100);
  
      await productRepository.create(product);
  
      const productModel = await ProductModel.findOne({ where: { id: "1" } });
  
      expect(productModel.toJSON()).toStrictEqual({
        id: "1",
        name: "Product 1",
        price: 100,
      });
    });

    it("should update a product", async () => {
      const productRepository = new ProductRepository();
      const product = new Product("1", "Product 1", 100);
  
      await productRepository.create(product);
  

      product.changeName("Product 2");
      product.changePrice(10);

      await productRepository.update(product);

      const productModel = await ProductModel.findOne({ where: { id: "1" } });
      expect(productModel.toJSON()).toStrictEqual({
        id: "1",
        name: "Product 2",
        price: 10,
      });
    });

    it("should find a product", async () => {
      const productRepository = new ProductRepository();
      const product = new Product("1", "Product 1", 100);
  
      await productRepository.create(product);

      const found = await productRepository.find("1");

      expect(found.id).toBe(product.id);
      expect(found.name).toBe(product.name);
      expect(found.price).toBe(product.price);
    });

    it("should find all products", async () => {
      const productRepository = new ProductRepository();
      
      const product = new Product("1", "Product 1", 100);
      const product2 = new Product("2", "Product 2", 150);

      await productRepository.create(product);
      await productRepository.create(product2);

      const found = await productRepository.findAll();

      const products = [product, product2]

      expect(products).toEqual(found);
    });
});