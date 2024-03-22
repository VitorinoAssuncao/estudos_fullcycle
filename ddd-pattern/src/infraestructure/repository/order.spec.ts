import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product";
import Product from "../../domain/entity/product";
import ProductRepository from "./product";
import Customer from "../../domain/entity/customers"
import CustomerModel from "../db/sequelize/model/customer";
import CustomerRepository from "./customer";
import Address from "../../domain/entity/address";
import OrderItemModel from "../db/sequelize/model/order-item";
import OrderModel from "../db/sequelize/model/order";
import OrderRepository from "./order";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";

describe("Order Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
      sequelize.addModels([
        CustomerModel,
        OrderModel,
        OrderItemModel,
        ProductModel,
    ]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it("should create a order", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("1","Joao");
      const address = new Address("Rua 1",1,"8900000","Sao Paulo")
  
      customer.Address = address

      await customerRepository.create(customer);

      const productRepository = new ProductRepository();
      const product = new Product("product-id-1","Product 1", 100)

      await productRepository.create(product)

      const orderRepository = new OrderRepository();
      const orderItem = new OrderItem("order-item-id-1",product.price, product.id, product.name, 2)
      const order = new Order("order-id-1",customer.id, [orderItem])

      await orderRepository.create(order)

      const orderModel = await OrderModel.findOne(
        { 
            where: { id: "1" },
            include: ["items"] 
        }
        );
  
      expect(orderModel.toJSON()).toStrictEqual({
        id: order.id,
        customer_id: order.customerID,
        total: order.total(),
        items:[
            {
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: order.id,
                product_id: product.id
            }
        ]
      });
    });

    it("should update a customer", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("1", "Joao");
      customer.Address = new Address("Rua 1", 1, "1","Sao Paulo")
  
      await customerRepository.create(customer);
  
      customer.activate();
      customer.addRewardPoints(100);

      await customerRepository.update(customer);

      const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

      expect(customerModel.toJSON()).toStrictEqual({
        id: "1",
        name: "Joao",
        street:"Rua 1",
        number: 1,
        zipcode:"1",
        city:"Sao Paulo",
        active: true,
        rewardPoints: 100,
      });
    });

    it("should find a customer", async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer("1", "Joao");
      customer.Address = new Address("Rua 1", 1, "1", "Sao Paulo")

  
      await customerRepository.create(customer);

      const found = await customerRepository.find("1");

      expect(found).toStrictEqual(customer);

    });

    it("should find all customers", async () => {
      const customerRepository = new CustomerRepository();
      
      const customer = new Customer("1", "Joao");
      const customer2 = new Customer("2", "Maria");

      const address = new Address("rua 1", 1, "1", "Sao Paulo")

      customer.Address = address
      customer2.Address = address

      await customerRepository.create(customer);
      await customerRepository.create(customer2);

      const found = await customerRepository.findAll();

      const customers = [customer, customer2]

      expect(customers).toStrictEqual(found);
    });
});