import { NIL } from "uuid";
import FindClientUsecase from "../../../client-adm/usecase/findClient/find-client.usecase";
import PlaceOrderUsecase from "./place-order.usecase";
import CheckStock from "../../../product-adm/usecase/add-product/check-stock.usecase";
import ID from "../../../@shared/domain/vo/id.vo";
import FindInvoiceUsecase from "../../../invoice/usecase/find-invoice.usecase";
import { PlaceOrderInputDTO } from "./place-order.dto";

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

        //@ts-expect-error - no params in constructor
        const placeOrderUsecase = new PlaceOrderUsecase();

        it("should throw error when product not found", async () => {
            const mockCatalogFacade = {
                findByID: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error - force set catalogFacade
            placeOrderUsecase._catalogFacade = mockCatalogFacade;

            //@ts-expect-error - private method
            await expect(placeOrderUsecase.getProduct("123")).rejects.toThrow("Product 123 not found");
        })

        it("should return the product when found", async () => {
            const mockCatalogFacade = {
                findByID: jest.fn().mockResolvedValue({
                    id: "123",
                    name: "Product 123",
                    description: "Product 123 description",
                    salesPrice: 10
                })
            }

            //@ts-expect-error - force set catalogFacade
            placeOrderUsecase._catalogFacade = mockCatalogFacade;

            //@ts-expect-error - private method
            const got = await placeOrderUsecase.getProduct("123");
            
            expect(got.id.value).toBe("123");
            expect(got.name).toBe("Product 123");
            expect(got.description).toBe("Product 123 description");
            expect(got.salesPrice).toBe(10);

            expect(mockCatalogFacade.findByID).toHaveBeenCalledTimes(1);
        })

    });

    describe('execute method', () => {
        const mockDate = new Date(2021, 1, 1);
        
        beforeAll(() =>{
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);
        });

        afterAll(() =>{
            jest.useRealTimers();
        });

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

        describe('should place an order', () => {
            const clientProps = {
                ID: new ID("123"),
                name: "Client 123",
                document: "9999",
                email: "client@gmail.com",
                street: "Street 123",
                number: "123",
                city: "City",
                state: "State",
                zipCode: "12345",
            }

            const mockClientFacade = {
                findClient: jest.fn().mockResolvedValue(clientProps),
                addClient: jest.fn()
            }

            const mockPaymentFacade = {
                processPayment: jest.fn()
            }

            const mockCheckoutRepository = {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }

            const mockInvoiceFacade = {
                generateInvoice: jest.fn().mockReturnValue("INV-123"),
                findInvoice: jest.fn()
            } 

            const placeOrderUsecase = new PlaceOrderUsecase(
                mockClientFacade, 
                null, 
                null,
                mockCheckoutRepository,
                mockInvoiceFacade,
                mockPaymentFacade,
            )

            const products = {
                "1":{ id: new ID("1"), name: "Product 1", description: "Product 1 description", salesPrice: 10},
                "2":{ id: new ID("2"), name: "Product 2", description: "Product 2 description", salesPrice: 20},
            }

            const mockValidateProducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUsecase, 'validateProducts')
            //@ts-expect-error - spy on private method
            .mockResolvedValue(null);

            const mockGetProduct = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUsecase, 'getProduct')
            //@ts-expect-error - spy on private method
            .mockImplementation((id) => Promise.resolve(products[id]));

            it("should not be approved", async () => {
                mockPaymentFacade.processPayment = mockPaymentFacade.processPayment.mockResolvedValue({
                    id: "PAY-123",
                    status: "error",
                    order_id: "1"
                });

                const input: PlaceOrderInputDTO ={
                    clientID: "123",
                    products: [
                        { productID: "1" },
                        { productID: "2" },
                    ],
                }

                await expect(placeOrderUsecase.execute(input)).rejects.toThrow("Payment error");

                expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockPaymentFacade.processPayment).toHaveBeenCalledTimes(1);
                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(0);
            })

        })
    });
});