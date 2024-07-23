import express, {Express} from 'express';
import { Sequelize } from 'sequelize-typescript';
import ClientModel from '../modules/client-adm/repository/client.model';
import {clientRoute} from './routes/client';

export const app: Express = express();
app.use(express.json());

app.use("/client", clientRoute);

export let sequelize: Sequelize;

async  function setupDB() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
    });

   await sequelize.addModels([ClientModel]);
    await sequelize.sync(); 
}

setupDB();