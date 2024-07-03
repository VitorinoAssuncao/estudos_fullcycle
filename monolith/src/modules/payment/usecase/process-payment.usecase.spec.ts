import ID from "../../@shared/domain/vo/id.vo";
import Transaction from "../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";



describe('ProcessPaymentUsecase', () => {
    it('should process payment', async () => {
        const transaction = new Transaction({
            amount: 100,
            order_id: 'order-1'
        });
        
        const mockRepository = ()  => ({
            createTransaction: jest.fn().mockReturnValue(Promise.resolve(transaction))
        })

        const usecase = new ProcessPaymentUseCase(mockRepository());

        const result = await usecase.execute({
            amount: 100,
            order_id: 'order-1'
        });

        expect(result.orderID).toEqual('order-1');
        expect(result.status).toEqual('approved');
    });

    it('should reject payment', async () => {
        const transaction = new Transaction({
            id: new ID("1"),
            amount: 50,
            order_id: 'order-1'
        });
        
        const mockRepository = ()  => ({
            createTransaction: jest.fn().mockReturnValue(Promise.resolve(transaction))
        })

        const usecase = new ProcessPaymentUseCase(mockRepository());

        const result = await usecase.execute({
            amount: 50,
            order_id: 'order-1'
        });

        expect(result.orderID).toEqual('order-1');
        expect(result.status).toEqual('rejected');
    });
});