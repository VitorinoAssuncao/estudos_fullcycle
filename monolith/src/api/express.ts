import express, {Express} from 'express';
import { Sequelize } from 'sequelize-typescript';
import ClientModel from '../modules/client-adm/repository/client.model';
import {clientRoute} from './routes/client';
import { productRoute } from './routes/product';
import ProductModel from '../modules/product-adm/repository/product.model';
import StoreProductModel from '../modules/store-catalog/repository/product.model';
import OrderModel from '../modules/checkout/repository/order.model';
import ClientOrderModel from '../modules/checkout/repository/client.order.model';
import ProductOrderModel from '../modules/checkout/repository/product.order.model';
import ProductDetailsModel from '../modules/checkout/repository/product.model';
import { checkoutRoute } from './routes/checkout';
import InvoiceItemModel from '../modules/invoice/repository/invoice-item.model';
import InvoiceModel from '../modules/invoice/repository/invoice.model';
import TransactionModel from '../modules/payment/repository/transaction.model';
import { invoiceRoute } from './routes/invoice';

export const app: Express = express();
app.use(express.json());

app.use("/client", clientRoute);
app.use("/product", productRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async  function setupDB() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    });

   sequelize.addModels([ClientModel, StoreProductModel, ProductModel, OrderModel, ClientOrderModel, ProductOrderModel,ProductDetailsModel,InvoiceModel,InvoiceItemModel,TransactionModel]);

   sequelize.sync(); 
}

setupDB();