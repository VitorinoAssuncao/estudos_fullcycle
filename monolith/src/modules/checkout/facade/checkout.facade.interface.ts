export interface PlaceOrderFacadeInputDTO {
    clientID: string;
    products: {
        productID: string;
    }[];
}

export interface PlaceOrderFacadeOutputDTO {
    orderID: string;
    invoiceID: string;
    status: string;
    total: number;
    products: {
        productID: string;
    }[]
}