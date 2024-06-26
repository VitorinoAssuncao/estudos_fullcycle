import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-interface";

export default class ProductRepository implements ProductRepositoryInterface{
  async create(product: Product): Promise<void>{
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price,
        })
  };

  async update(entity: Product): Promise<void> {
     await ProductModel.update(
        {
            name:entity.name,
            price: entity.price
        },
        {
            where: {
                id: entity.id,
            }
        }
    );
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id: id } })

    return new Product(productModel.id, productModel.name,productModel.price)
  }
    
  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll()

    return productModels.map((ProductModel) =>
      new Product(ProductModel.id, ProductModel.name, ProductModel.price)
    );
  }
};