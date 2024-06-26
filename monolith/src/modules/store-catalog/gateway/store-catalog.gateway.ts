import Product from "../domain/product.entity";

export default interface StoreCatalogGateway{
    findAll(): Promise<Product[]>;
    findByID(id:string): Promise<Product>;
}