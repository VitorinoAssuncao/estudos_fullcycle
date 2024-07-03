import ProductADMFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import CheckStock from "../usecase/add-product/check-stock.usecase";

export default class ProductAdmFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();
        const addProductUsecase = new AddProductUsecase(productRepository);
        const checkStockUseCase = new CheckStock(productRepository);

        return new ProductADMFacade({
            addUseCase: addProductUsecase,
            checkStockUseCase: checkStockUseCase
        })
    }
}