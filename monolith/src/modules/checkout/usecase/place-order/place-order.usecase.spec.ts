import { NIL } from "uuid";
import FindClientUsecase from "../../../client-adm/usecase/findClient/find-client.usecase";
import PlaceOrderUsecase from "./place-order.usecase";
import CheckStock from "../../../product-adm/usecase/add-product/check-stock.usecase";

describe('PlaceOrderUsecase', () => {
    describe('validateProducts method', () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUsecase = new PlaceOrderUsecase();

        it("should throw error if no products are selected", async () => {
            const input = [] as any;

            //@ts-expect-error - private method
            await expect(placeOrderUsecase.validateProducts(input)).rejects.toThrow("No products selected");
        });

        it("should throw an error if product is out of stock", async () => {
            const input = [
                { productID: "123" },
            ];

            const mockProductFacade = {
                checkStock: jest.fn().mockReturnValue(Promise.resolve({
                    id: "123",
                    stock: 0
                })
            )
            }

            //@ts-expect-error - force set productFacade
            placeOrderUsecase._productFacade = mockProductFacade;

            //@ts-expect-error - private method
            await expect(placeOrderUsecase.validateProducts(input)).rejects.toThrow("Product 123 is not available in stock");
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(1);
        });
        
    });

    describe('getProducts method', () => {
        const mockDate = new Date(2021, 1, 1);
        
        beforeAll(() =>{
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);
        })

    });
    describe('execute method', () => {
        it("should throw error when client not found", async () => {
            const mockClientFacade = {
                findClient: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error - no params in constructor
            const placeOrderUsecase = new PlaceOrderUsecase();            

            //@ts-expect-error - force set clientFacade
            placeOrderUsecase._clientFacade = mockClientFacade;

            const input = {
                clientID: "123",
                products: [
                    { productID: "123" },
                ],
            }

            await expect(placeOrderUsecase.execute(input)).rejects.toThrow("Client not found");

        });

        it("should throw error when products are not valid", async () => {
            const mockClientFacade = {
                findClient: jest.fn().mockResolvedValue(true)
            }

            //@ts-expect-error - no params in constructor
            const placeOrderUsecase = new PlaceOrderUsecase();

            const mockValidateProducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUsecase, 'validateProducts')
            //@ts-expect-error - not return never
            .mockRejectedValue(new Error("No products selected"));

            //@ts-expect-error - force set clientFacade
            placeOrderUsecase._clientFacade = mockClientFacade;


            const input = {
                clientID: "123",
                products: [] as any,
            }

            await expect(placeOrderUsecase.execute(input)).rejects.toThrow("No products selected");
        });
    });
});