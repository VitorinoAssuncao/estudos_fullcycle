import { CreatedAt } from "sequelize-typescript";
import Transaction from "../domain/transaction";
import PaymentGateway from "../gateway/payment.gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGateway{
    async createTransaction(input: Transaction): Promise<Transaction> {
        const transaction = await TransactionModel.create({
            id: input.id.value,
            amount: input.amount,
            order_id: input.order_id,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        });

        return input;
    }
}