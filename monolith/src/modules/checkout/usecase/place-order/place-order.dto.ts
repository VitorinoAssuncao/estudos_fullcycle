export interface PlaceOrderInputDTO{
    clientID: string;
    products: {
        productID: string;
    }[];
}

export interface PlaceOrderOutputDTO {
    orderID: string;
    invoiceID: string;
    status: string;
    total: number;
    products: {
        productID: string;
    }[]
}