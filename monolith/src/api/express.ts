import express, {Express} from 'express';
import { Sequelize } from 'sequelize-typescript';
import ClientModel from '../modules/client-adm/repository/client.model';


export const app: Express = express();
app.use(express.json());

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