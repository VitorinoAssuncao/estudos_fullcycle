import Address from "../entity/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("should create a customer successfully", () => {
        let customer = CustomerFactory.create("Jhon");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.address).toBeUndefined();
    })

    it("should create a customer with an address", () => {
        const address = new Address("rua dos bobos", 1, "89030112", "São Paulo")

        let customer = CustomerFactory.createWithAddress("Jhon",address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.address).toBeDefined();
        expect(customer.address.toString()).toBe("rua dos bobos, 1, 89030112 São Paulo")
    })
})

