import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/facade.factory";

describe('PaymentFacade unit test', () => {
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
        const facade = PaymentFacadeFactory.create();

        const result = await facade.processPayment({
            amount: 100,
            order_id: 'order-1',
        });

        expect(result.order_id).toEqual('order-1');
        expect(result.status).toEqual('approved');
    });
});