export interface ProcessPaymentFacadeInputDTO{
    amount: number
    order_id: string
}

export interface ProcessPaymentFacadeOutputDTO{
    id: string;
    status: string;
    order_id: string;
}

export default interface PaymentFacadeInterface{
    processPayment(input:ProcessPaymentFacadeInputDTO):Promise<ProcessPaymentFacadeOutputDTO>;
}