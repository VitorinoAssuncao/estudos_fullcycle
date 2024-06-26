import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-interface";
import ProductInterface from "../../../../domain/product/entity/product.interface";

export default class ProductRepository implements ProductRepositoryInterface{
  async create(product: ProductInterface): Promise<void>{
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price,
        })
  };

  async update(entity: ProductInterface): Promise<void> {
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

  async find(id: string): Promise<ProductInterface> {
    const productModel = await ProductModel.findOne({ where: { id: id } })

    return new Product(productModel.id, productModel.name,productModel.price)
  }
    
  async findAll(): Promise<ProductInterface[]> {
    const productModels = await ProductModel.findAll()

    return productModels.map((ProductModel) =>
      new Product(ProductModel.id, ProductModel.name, ProductModel.price)
    );
  }
};