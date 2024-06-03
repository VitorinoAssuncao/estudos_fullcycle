import Address from "./address";
import Customer from "./customers";

describe("Customer unit tests", () =>{
  it("should create customer successfully",() =>{
    const customer = new Customer("abc", "Jhon");
    expect(customer.name).toBe("Jhon");
    expect(customer.id).toBe("abc");
  });

    it("should throw error when id is empty",() =>{
      expect(() =>{
        let customer = new Customer("","John")
      }).toThrow("customer: Id is required")
    });

    it("should throw error when id is empty",() =>{
      expect(() =>{
        let customer = new Customer("abc","")
      }).toThrow("customer: Name is required")
    });

    it("should change name",() =>{
      const customer = new Customer("abc", "Jhon");
      customer.changeName("Abel");

      expect(customer.name).toBe("Abel")
    });

    it("should activate customer",() =>{
      const customer = new Customer("abc", "Jhon");
      const address = new Address("Rua dos Bobos", 123, "00000","Cidade dos Loucos");

      customer.Address = address;

      customer.activate();

      expect(customer.isActive()).toBe(true)
    });

    it("should deactivate customer",() =>{
      const customer = new Customer("abc", "Jhon");

      customer.deactivate();

      expect(customer.isActive()).toBe(false)
    });

    it("should throw error when address is undefined",() =>{
      const customer = new Customer("abc", "Jhon");

      expect(() =>{
        customer.activate()
      }).toThrow("Address is mandatory to activate a customer")
    });

    it("should add reward points",() => {
      const customer = new Customer("1","Jhon");

      customer.addRewardPoints(10);

      expect(customer.rewardPoints).toBe(10);
    })

})