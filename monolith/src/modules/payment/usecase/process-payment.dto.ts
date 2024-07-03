export interface ProcessPaymentInputDTO{
    order_id: string;
    amount: number;
}

export interface ProcessPaymentOutputDTO{
    id: string;
    status: string;
    orderID: string;
}