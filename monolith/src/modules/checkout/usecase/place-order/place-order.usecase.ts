import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import Order from "../../domain/order.entity";
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from "./place-order.dto";

export default class PlaceOrderUsecase implements UseCaseInterface{
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade : ProductAdmFacadeInterface;
    
    constructor(clientFacade: ClientAdmFacadeInterface, productFacade: ProductAdmFacadeInterface) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
     }

    async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {    
        const client  = await this._clientFacade.findClient({id: input.clientID});
        
        if (!client) {
            throw new Error("Client not found");
        }
        
        await this.validateProducts(input.products);

        return {
            orderID: "",
            invoiceID: "",
            status: "",
            total: 0,
            products: []
        }
    }

    private async validateProducts(products: { productID: string; }[]) {
        if (products.length === 0) {
            throw new Error("No products selected");
        }

        for (const product of products) {
            const stock = await this._productFacade.checkStock({id: product.productID});
            if (stock.stock === 0) {
                throw new Error(`Product ${product.productID} is not available in stock`);
            }
        }
    }
}