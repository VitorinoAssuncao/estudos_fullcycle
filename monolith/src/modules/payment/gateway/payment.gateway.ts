import Transaction from "../domain/transaction";


export default interface PaymentGateway {
    createTransaction(input: Transaction): Promise<Transaction>;
}