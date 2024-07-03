import UseCaseInterface from "../../@shared/domain/usecase/usecase.interface";
import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import { ProcessPaymentInputDTO, ProcessPaymentOutputDTO } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface{
    constructor (
        private paymentRepository: PaymentGateway
    ){}

    async execute(input: ProcessPaymentInputDTO): Promise<ProcessPaymentOutputDTO>{
        const transaction = new Transaction({
            amount: input.amount,
            order_id: input.order_id
        });


        this.paymentRepository.createTransaction(transaction);

        transaction.process();
        return {
            id: transaction.id.value,
            status: transaction.status,
            orderID: transaction.order_id
        };
    }
}