import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create() {
        const transactionRepository = new TransactionRepository();

        return new PaymentFacade({
            processPaymentUseCase: new ProcessPaymentUseCase(transactionRepository),
        })
    }
}