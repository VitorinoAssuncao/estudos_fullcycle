import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/product";
import Product from "../../domain/product/entity/product";
import ProductRepository from "./product";
import Customer from "../../domain/customer/entity/customers"
import CustomerModel from "../db/sequelize/model/customer";
import CustomerRepository from "./customer";
import Address from "../../domain/customer/entity/address";
import OrderItemModel from "../db/sequelize/model/order-item";
import OrderModel from "../db/sequelize/model/order";
import OrderRepository from "./order";
import OrderItem from "../../domain/checkout/entity/order_item";
import Order from "../../domain/checkout/entity/order";

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
            where: { id: order.id },
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

    it("should update an order", async () => {
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

      const orderItem2 = new OrderItem("order-item-id-2",product.price, product.id, product.name, 2)

      order.updateOrderItems([orderItem, orderItem2])

      await orderRepository.update(order)

      const orderModel = await OrderModel.findOne(
        { 
            where: { id: order.id },
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
            },
            {
              id: orderItem2.id,
              name: orderItem2.name,
              price: orderItem2.price,
              quantity: orderItem2.quantity,
              order_id: order.id,
              product_id: product.id
          }
        ]
      });
    });

    it("should should find an order", async () => {
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

      const foundOrder = await orderRepository.find(order.id);
  
      expect(foundOrder).toStrictEqual(order);
    });

    it("should should find all orders", async () => {
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

      const foundOrder = await orderRepository.findAll();
  
      const orders = [order]

      expect(foundOrder).toStrictEqual(orders);
    });
});