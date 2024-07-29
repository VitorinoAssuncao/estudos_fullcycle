import { NIL } from "uuid";
import CheckoutFacadeInterface from "../facade/checkout.facade";
import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase";
import ClientADMFacadeFactory from "../../client-adm/factory/facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import PaymentFacade from "../../payment/facade/payment.facade";
import PaymentFacadeFactory from "../../payment/factory/facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import OrderRepository from "../repository/order.repository";

export default class CheckoutFacadeFactory {
    static create() {

        return new CheckoutFacadeInterface({
            placeOrderUseCase: new PlaceOrderUsecase(
                ClientADMFacadeFactory.create(),
                ProductAdmFacadeFactory.create(),
                StoreCatalogFacadeFactory.create(),
                new OrderRepository(),
                InvoiceFacadeFactory.create(),
                PaymentFacadeFactory.create()
            )
        })
    }
}