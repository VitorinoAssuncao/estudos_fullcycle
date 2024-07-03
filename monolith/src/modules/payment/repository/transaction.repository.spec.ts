import { Sequelize } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import TransactionRepository from "./transaction.repository";
import Transaction from "../domain/transaction";

describe('TransactionRepository', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([TransactionModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('should create a transaction', async () => {
        const transaction = new Transaction({
            amount: 100,
            order_id: 'order-1',
            status: 'approved'
        });

        const repository = new TransactionRepository();

        const result = await repository.createTransaction(transaction);

        expect(result.id).toEqual(transaction.id);
        expect(result.amount).toEqual(transaction.amount);
        expect(result.order_id).toEqual(transaction.order_id);
        expect(result.status).toEqual(transaction.status);
    });
});