import UseCaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import ID from "../../../@shared/domain/vo/id.vo";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacade from "../../../invoice/facade/invoice.facade";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacade from "../../../payment/facade/payment.facade";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from "./place-order.dto";

export default class PlaceOrderUsecase implements UseCaseInterface{
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade : ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;
    private _checkoutRepository : CheckoutGateway;
    private _invoiceFacade : InvoiceFacadeInterface;
   private _paymentFacade: PaymentFacadeInterface;
    
    constructor(
        clientFacade: ClientAdmFacadeInterface, 
        productFacade: ProductAdmFacadeInterface, 
        catalogFacade: StoreCatalogFacadeInterface,
        checkoutRepository: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface
    ) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
        this._catalogFacade = catalogFacade;
        this._checkoutRepository = checkoutRepository;
        this._invoiceFacade = invoiceFacade;
        this._paymentFacade = paymentFacade;
     }

    async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {    
        const client  = await this._clientFacade.findClient({id: input.clientID});
        
        if (!client) {
            throw new Error("Client not found");
        }
        
        await this.validateProducts(input.products);

        const products = await Promise.all(
            input.products.map(async product => this.getProduct(product.productID))
        );

        const myClient = new Client({
            id: new ID(input.clientID),
            name: client.name,
            email: client.email,
            address: client.address
        })

        const order = new Order({
            client: myClient,
            products: products
        });

        const payment = await this._paymentFacade.processPayment({
            order_id: order.id.value,
            amount: order.total
        });
    
        const invoice = 
            payment.status === "approved"?
            await this._invoiceFacade.generateInvoice({
                name: client.name,
                document: client.document,
                street: client.address.street,
                number: myClient.address.number,
                complement: myClient.address.complement,
                city: myClient.address.city,
                state: myClient.address.state,
                zipCode: myClient.address.zipCode,
                items: products.map(product => ({
                    id: product.id.value,
                    name: product.name,
                    price: product.salesPrice
                }))
            })


        return {
            orderID: order.id.value,
            invoiceID: "",
            status: order.status,
            total: order.total,
            products: products.map(product => ({productID: product.id.value}))
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

    private async getProduct(id: string): Promise<Product> {
        const productFound = await this._catalogFacade.findByID({id: id});
        if (!productFound) {
            throw new Error(`Product ${id} not found`);
        }

        return new Product({
            id: new ID(productFound.id),
            name: productFound.name,
            description: productFound.description,
            salesPrice: productFound.salesPrice
        })
    }
}