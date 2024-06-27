import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model";
import Client from "../domain/client.entity";
import ID from "../../@shared/domain/vo/id.vo";
import ClientRepository from "./client.repository";

describe('ClientRepository', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ClientModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it('should add a client', async () => {
        const client = new Client({
            id: new ID('1'),
            name: 'Client 1',
            email: 'email@teste',
            address: 'endereço teste',
        })

        const clientRepository = new ClientRepository();

        await clientRepository.add(client);

        const result = await ClientModel.findByPk(client.id.value);

        expect(result.id).toEqual(client.id.value);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });

    it('should find a client', async () => {
        const client = new ClientModel({
            id: '1',
            name: 'Client 1',
            email: 'email@teste',
            address: 'endereço teste',
            createdAt: new Date(),
            updatedAt: new Date()
        })

        await client.save();

        const clientRepository = new ClientRepository();

        const result = await clientRepository.findByID(client.id);

        expect(result.id.value).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.address).toEqual(client.address);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });

});