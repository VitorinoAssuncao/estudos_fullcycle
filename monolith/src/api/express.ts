import express, {Express} from 'express';
import { Sequelize } from 'sequelize-typescript';
import ClientModel from '../modules/client-adm/repository/client.model';
import {clientRoute} from './routes/client';
import { migrator } from "../migration/migrator";
import { productRoute } from './routes/product';
import ProductModel from '../modules/product-adm/repository/product.model';
import StoreProductModel from '../modules/store-catalog/repository/product.model';

export const app: Express = express();
app.use(express.json());

app.use("/client", clientRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

async  function setupDB() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    });

   sequelize.addModels([ClientModel, ProductModel, StoreProductModel]);

   migrator(sequelize).up();
   
   sequelize.sync(); 
}

setupDB();